// get the shader source by its id .......................................
function source(id){
    return document.getElementById(id).text ;
}

// Get the canvas ........................................................
var canvas_1 = document.getElementById('canvas_1') ;
var canvas_2 = document.getElementById('canvas_2') ;
var canvas_3 = document.getElementById('canvas_3') ;

// Object to be used for interactions ....................................
var env = {} ;

env.a                   = 0.1 ;
env.b                   = 0.3 ;
env.epsilon             = 0.01 ;

env.dt                  = 0.05 ;
env.diffCoef            = 0.001 ;
env.time                = 0 ;

env.running             = false ;
env.skip                = 40 ;
env.clickRadius         = 0.1 ;
env.clickPosition       = [0.,0.] ;
    
env.period              = 200 ;
env.pacemakerActive     = true ;
env.pacemakerRadius     = 0.1 ;
env.pacemakerX          = 0. ;
env.pacemakerY          = 0. ;
env.pacemakerCircular   = true ;

env.width = 512 ;
env.height = 512 ;

// defining the textures .................................................
var fcolor = new Abubu.Float32Texture(env.width,env.height, 
    { pairable : true } ) ;
var scolor = new Abubu.Float32Texture(env.width,env.height ) ;
scolor.pairable = true ;

// Setup a solver ........................................................
var init = new Abubu.Solver( {
    fragmentShader  : source('init'),
    targets : {
        color1 : { location :0, target : fcolor  } ,
        color2 : { location :1, target : scolor  } ,

    }
} ) ;
init.render() ;

// post processing .......................................................
var plot = new Abubu.Plot2D({
    target : fcolor,            /* the texture to visualize             */
    channel : 'r',              /* the channel of interest:
                                        can be : 'r', 'g', 'b', or 'a' 
                                        defualt value is 'r'            */
    minValue : 0 ,              /* minimum value on the colormap        */
    maxValue : 1 ,              /* maximum value on the colormap        */
    colorbar : true ,           /* if you need to show the colorbar     */
    probeVisible : true ,
    canvas : canvas_1 ,         /* the canvas to draw on                */
}) ;

plot.addMessage('FitzHugh-Nagumo Model', 0.05,0.05,{
    font : 'Bold 12pt Arial' ,
    align : 'start',
    style : '#ffffff', 
    } ) ;

plot.time = plot.addMessage('Time = 0.00 ms' , 0.05,0.13,{
    font : '11pt Arial' ,
    align : 'start',
    style : '#ffffff', 
} ) ;

plot.init() ;   /* initialize the plot */
plot.render() ;

var splot = new Abubu.SignalPlot({
    noPltPoints : 1024,
    grid : 'on', 
    nx   : 10 ,
    ny   : 15 ,
    xticks : { mode : 'auto', unit : 'ms', font : '11pt Times' } ,
    yticks : { mode : 'auto', unit : '' , font : '12pt Times',precision : 1  } ,
    canvas : canvas_2 
} ) ;
splot.addMessage(
    'Signal at the probe', 0.5,0.05,{
        font : 'Bold 14pt Arial' ,
        align: 'center',
        style: "#ff0000" ,
    } ) ;
env.usgn = splot.addSignal( fcolor, {
    channel : 'r',
    minValue : -.3,
    maxValue : 1.2 ,
    restValue : 0 ,
    color : [ 0.,0.,0.5 ],
    visible : true ,
    timewindow : 1000 , 
    probePosition : [0.5,0.5] 
} ) ;

// initialize program ....................................................
env.initialize = function(){
    env.time = 0 ;
    init.render() ;
    splot.init() ;
    rplot.init() ;

    env.usgn.init(0) ;
    env.rsgn.init(0) ;
    plot.init() ;
}

// marching steps ........................................................
function marchUniforms(_inTexture){
    this.inTexture          = { type : 't', value : _inTexture          } ; 
    this.dt                 = { type : 'f', value : env.dt              } ; 
    this.diffCoef           = { type : 'f', value : env.diffCoef        } ; 
    this.period             = { type : 'f', value : env.period          } ;
    this.a                  = { type : 'f', value : env.a               } ;
    this.b                  = { type : 'f', value : env.b               } ;
    this.epsilon            = { type : 'f', value : env.epsilon         } ;
    this.pacemakerActive    = { type : 'b', value : env.pacemakerActive } ;
    this.pacemakerCircular  = { type : 'b', value : env.pacemakerCircular} ;
    this.pacemakerRadius    = { type : 'f', value : env.pacemakerRadius } ;
    this.pacemakerX         = { type : 'f', value : env.pacemakerX      } ;
    this.pacemakerY         = { type : 'f', value : env.pacemakerY      } ;
    return this ;
}

// even (f) time steps ---------------------------------------------------
var fmarch = new Abubu.Solver({
        fragmentShader : source( 'march' ) ,
        uniforms : new marchUniforms( fcolor ) ,
        targets : {
                ocolor : { location : 0, target : scolor } 
        }
    } ) ;

// odd (s) time steps ----------------------------------------------------
var smarch = new Abubu.Solver({
        fragmentShader : source( 'march' ) ,
        uniforms : new marchUniforms( scolor ) ,
        targets : {
                ocolor : { location : 0, target : fcolor } 
        }
    } ) ;

// march the solution for two time steps ---------------------------------
function march(){
    fmarch.render() ;
    smarch.render() ;
    env.time += env.dt*2. ;
}
// .......................................................................
// reduction 
// .......................................................................
var reductionResultS1 = new Abubu.Float32Texture(env.width,1) ;
var reductionResultS2 = new Abubu.Float32Texture(1,1) ;

// first step of reduction -----------------------------------------------
var reduceS1 = new Abubu.Solver({
    fragmentShader : source( 'reduceS1' ) ,
    uniforms : { 
        inTexture : { type : 't', value : fcolor } ,
    } ,
    targets : { 
        ocolor : { location : 0, target : reductionResultS1 } ,
    }
} ) ;

// second step of reduction ----------------------------------------------
var reduceS2 = new Abubu.Solver({
    fragmentShader : source( 'reduceS2' ) ,
    uniforms : { 
        inTexture : { type : 't', value : reductionResultS1 } ,
    } ,
    targets : { 
        ocolor : { location : 0, target : reductionResultS2 } ,
    }
} ) ;

// reduction plot --------------------------------------------------------
var rplot = new Abubu.SignalPlot({
    noPltPoints : 1024,
    grid : 'on', 
    nx   : 10 ,
    ny   : 5 ,
    xticks : { mode : 'auto', unit : 'ms', font : '11pt Times' } ,
    yticks : { mode : 'auto', unit : '' , font : '12pt Times',precision : 1  } ,
    canvas : canvas_3 
} ) ;

rplot.addMessage(
    'Overal activation', 0.5,0.1,{
        font : 'Bold 14pt Times' ,
        align: 'center',
        style: "#00006f" ,
    } ) ;

env.rsgn = rplot.addSignal( reductionResultS2, {
    channel : 'r',
    minValue : -0.,
    maxValue : 1. ,
    restValue : 0 ,
    color : [ 0.,0.,0.1 ],
    linewidth : 3,
    visible : true ,
    timewindow : 1000 , 
    probePosition : [0.5,0.5] 
} ) ;
rplot.init() ;

// solution and visualization sequence ...................................
function run(){
        if (env.running){
            for(var i = 0 ; i<env.skip ; i++){
                march() ;
                env.usgn.update(env.time) ;
                reduceS1.run() ;
                reduceS2.run() ;
                env.rsgn.update(env.time) ;
            }
        }
        
        splot.render() ;
        rplot.render() ;
        plot.time.text = "Time = " + env.time.toFixed(2) + " ms" ;
        plot.init() ;
        plot.render() ;
        requestAnimationFrame(run) ;
}

// click solver ..........................................................
var click = new Abubu.Solver({
    fragmentShader : source( 'click' ) ,
    uniforms : {
        inTexture : { type : 't', value : fcolor } ,
        clickRadius: { type : 'f', value : env.clickRadius } ,
        clickPosition: { type : 'v2', value : env.clickPosition } ,
    } ,
    targets : {
            ocolor : { location : 0 , target : scolor } ,
    }
} ) ;

var clickCopy = new Abubu.Copy( scolor, fcolor ) ;

var mouseDrag = new Abubu.MouseListener({
    canvas : canvas_1 ,
    event : 'drag' ,
    callback : function(e){
        click.uniforms.clickPosition.value = e.position ;
        click.render() ;
        clickCopy.render() ;
    }
} ) ; 

// set probe position ....................................................
var setProbe = new Abubu.MouseListener({
    canvas : canvas_1 ,
    event  : 'click' ,
    shift  : true ,
    callback : function(e){
        console.log(e) ;
        plot.setProbePosition(e.position) ;
        splot.setProbePosition(e.position) ;
        splot.init() ;
        plot.init() ;
    }
} ) ;

// saveCsvFile : save an array to disk as comma separated values .........
env.csvFileName = 'fcolor.csv' ;
env.saveCsvFile = function(){
    var link = document.createElement('a') ;
    var data = "data:text;charset=utf-8," +
        fcolor.width + ',' + 
        fcolor.height + ',' + 
        fcolor.value.join() ;

    var csv = encodeURI( data ) ;
    link.setAttribute( 'href', csv ) ;
    link.setAttribute( 'download', env.csvFileName ) ;
    link.click() ;
}

// loadCsvFile  : read a CSV file into the html page .....................
env.loadCsvFile = document.createElement('input') ;
env.loadCsvFile.setAttribute('type', 'file') ;
env.loadCsvFile.onchange = function(){
    /* check if a no file was selected */
    if ( !env.loadCsvFile.files[0] ){        
        return ;
    } ;

    var file = env.loadCsvFile.files[0] ;
    var reader = new FileReader() ;
    reader.readAsText(file) ;

    // only the when the file is loaded it can be analyzed
    reader.onload = function(event){
        var result  = event.target.result ;
        var data = result.split(',') ;

        var width = parseInt(data[0]) ;
        var height = parseInt(data[1]) ;

        var table = new Float32Array(width*height*4) ;
        var p = 0 ;
        for (var i=2 ; i< data.length; i++){ // modify accordingly
            table[p++] = parseFloat( data[i]) ;
        }

        fcolor.data = table ;
        scolor.data = table ;
    }
}

// add multiple parameters to gui ........................................
function addToGui( 
        guiElemenent ,  // gui element to add options into
        obj,            // object that holds parameters
        paramList,      // array of strings that contains list 
                        // of parmeters to be added
        solverList      // array of solvers that need to be update upon 
                        // change of a parameter through gui interactions
    ){
    var elements = {} ;
    for(i in paramList){
        var param = paramList[i] ;
        elements[param] = guiElemenent.add(obj, param )  ;
        elements[param].onChange(function(){
            Abubu.setUniformInSolvers( 
                    this.property , // this refers to the GUI element 
                    this.object[this.property] , 
                    solverList ) ;
        } ) ;
    }
    return elements ;
}

// .......................................................................
// create the graphical user interface 
// .......................................................................
function createGui(){
    var gui = new Abubu.Gui() ;     /*  create a graphical user 
                                        interface               */
    var panel = gui.addPanel({width:300}) ; // add a panel to the GUI


    // model parameters added to GUI -------------------------------------
    var mdl = panel.addFolder('Model Parameters') ;
    mdl.elements = addToGui( mdl, env, 
            ['a','b','epsilon','dt','diffCoef'], 
            [fmarch, smarch] ) ;

    // pace maker --------------------------------------------------------
    var pcm = panel.addFolder('Pace Maker') ;
    pcm.elements = addToGui( pcm, env, 
            [   'pacemakerActive' ,
                'pacemakerCircular' ,
                'pacemakerX' ,
                'pacemakerY' ,
                'pacemakerRadius' ,
                'period'            ], 
            [fmarch , smarch] ) ;

    pcm.elements.period.step(1) ;
   
    // csv files ---------------------------------------------------------
    var csv = panel.addFolder('Save and Load CSV') ;
    csv.add(env,'csvFileName' ) ;
    csv.add(env,'saveCsvFile' ) ;
    csv.add(env.loadCsvFile , 'click').name('loadCsvFile') ;

    // execution ---------------------------------------------------------
    var exe = panel.addFolder('Execution') ;
    exe.add(env,'time').listen() ;
    exe.add(env,'skip') ;
    exe.add(env,'initialize') ;
    exe.add(env,'running').listen() ; 
    exe.open() ;
}

// execute createGui to create the graphical user interface ..............
createGui() ;

// execute run function to initiate simulation ...........................
run() ;
