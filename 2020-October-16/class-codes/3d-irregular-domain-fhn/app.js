// get the shader source by its id .......................................
function source(id){
    return document.getElementById(id).text ;
}

// Get the canvas ........................................................
var canvas_1 = document.getElementById('canvas_1') ;
var canvas_2 = document.getElementById('canvas_2') ;

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
env.pacemakerActive     = false ;
env.pacemakerRadius     = 0.1 ;
env.pacemakerX          = 0. ;
env.pacemakerY          = 0. ;
env.pacemakerCircular   = true ;


env.nx = 64 ; 
env.ny = 64 ;
env.mx = 8 ;
env.my = 8 ;

env.width   = env.nx*env.mx ;
env.height  = env.ny*env.my ;

// defining the textures .................................................
var fcolor = new Abubu.Float32Texture(env.width,env.height, 
    { pairable : true } ) ;
var scolor = new Abubu.Float32Texture(env.width,env.height ) ;
scolor.pairable = true ;


var domain = new Abubu.Float32Texture(env.width, env.height) ;


var phaseInit = new Abubu.Solver({
    fragmentShader : source('phase') ,
    uniforms : { 
        nx : { type : 'i', value : env.nx } ,
        ny : { type : 'i', value : env.ny } ,
        mx : { type : 'i', value : env.mx } ,
        my : { type : 'i', value : env.my } ,
    } ,
    targets : {
        phase : { location : 0 , target : domain } ,
    }
} ) ;
phaseInit.run() ;

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
var plot = new Abubu.VolumeRayCaster({
    target : fcolor ,
    phaseField : domain ,
    channel : 1 ,
    mx : env.mx ,
    my : env.my ,
    noSteps : 100 ,
    alphaCorrection : 0.15 ,
    structural_alpha : 0.7 ,
    minValue  : 0.01 ,
    maxValue  : 1.1 ,
    threshold : 0.5 ,
    scale : 0.7 ,
    canvas : canvas_1,
    floodLights     : [1.,1.,1.,
                       0.,0.,1,
                       -1,0.,0,
                       0,1,0,
                       0,-1,0,],
    } ) ;
plot.initForeground() ;   /* initialize the plot */

plot.addMessage('FitzHugh-Nagumo model on an irregular domain', 0.05,0.05,{
    font : 'Bold 12pt Arial' ,
    align : 'start',
    style : '#000000', 
    } ) ;

plot.time = plot.addMessage('Time = 0.00 ms' , 0.05,0.13,{
    font : '11pt Arial' ,
    align : 'start',
    style : '#ffffff', 
} ) ;

plot.render() ;

var splot = new Abubu.SignalPlot({
    noPltPoints : 1024, // number of sample points
    grid : 'on', 
    nx   : 10 , // number of division in x 
    ny   : 15 , // ... in y 

    xticks : { mode : 'auto', unit : 'ms', font : '11pt Times' } ,
    yticks : { mode : 'auto', unit : '' , font : '12pt Times',precision : 1  } ,
    
    canvas : canvas_2 
} ) ;
splot.addMessage(
    'Signal at the probe', 0.5,0.05,{
        font : 'Bold 14pt Arial' ,
        align: 'center',
        style: "#660000" ,
    } ) ;

env.vsgn = splot.addSignal( fcolor, {
    channel : 'g',
    minValue : -.3,
    maxValue : 1.2 ,
    restValue : 0 ,
    color : [ 0.,.4,0.0 ],
    visible : true ,
    timewindow : 1000 , 
    probePosition : [0.5,0.5] 
} ) ;

env.usgn = splot.addSignal( fcolor, {
    channel : 'r',
    minValue : -.3,
    maxValue : 1.2 ,
    restValue : 0 ,
    color : [ .3,0.,0.0 ],
    visible : true ,
    timewindow : 1000 , 
    probePosition : [0.5,0.5] 
} ) ;

// initialize program ....................................................
env.initialize = function(){
    env.time = 0 ;
    init.render() ;
    splot.init() ;
    env.usgn.init(0) ;
    env.vsgn.init(0) ;
}

// marching steps ........................................................
function marchUniforms(_inTexture){
    this.inTexture          = { type : 't', value : _inTexture          } ; 
    this.domain             = { type : 't', value : domain              } ;
    this.dt                 = { type : 'f', value : env.dt              } ; 
    this.diffCoef           = { type : 'f', value : env.diffCoef        } ; 
    this.period             = { type : 'f', value : env.period          } ;
    this.a                  = { type : 'f', value : env.a               } ;
    this.b                  = { type : 'f', value : env.b               } ;
    this.nx                 = { type : 'i', value : env.nx              } ;
    this.ny                 = { type : 'i', value : env.ny              } ;
    this.mx                 = { type : 'i', value : env.mx              } ;
    this.my                 = { type : 'i', value : env.my              } ;

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

// solution and visualization sequence ...................................
function run(){
        if (env.running){
            for(var i = 0 ; i<env.skip ; i++){
                march() ;
                env.usgn.update(env.time) ;
                env.vsgn.update(env.time) ;
            }
        }
        splot.render() ;
        plot.time.text = "Time = " + env.time.toFixed(2) + " ms" ;
        plot.render() ;
        requestAnimationFrame(run) ;
}

// click solver ..........................................................
//var click = new Abubu.Solver({
//    fragmentShader : source( 'click' ) ,
//    uniforms : {
//        inTexture : { type : 't', value : fcolor } ,
//        clickRadius: { type : 'f', value : env.clickRadius } ,
//        clickPosition: { type : 'v2', value : env.clickPosition } ,
//    } ,
//    targets : {
//            ocolor : { location : 0 , target : scolor } ,
//    }
//} ) ;
//
//var clickCopy = new Abubu.Copy( scolor, fcolor ) ;
//
//var mouseDrag = new Abubu.MouseListener({
//    canvas : canvas_1 ,
//    event : 'drag' ,
//    callback : function(e){
//        click.uniforms.clickPosition.value = e.position ;
//        click.render() ;
//        clickCopy.render() ;
//    }
//} ) ; 

// set probe position ....................................................
var setProbe = new Abubu.MouseListener({
    canvas : canvas_1 ,
    event  : 'click' ,
    shift  : true ,
    callback : function(e){
        plot.setProbePosition(e.position) ;
        splot.setProbePosition(e.position) ;
        splot.init() ;
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
            console.log(this) ;
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
