// get the shader source by its id ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function source(id){
    return document.getElementById(id).text ;
}

// Get the canvas ........................................................
var canvas_1 = document.getElementById('canvas_1') ;
var canvas_2 = document.getElementById('canvas_2') ;

// Object to be used for interactions ....................................
var env = {
        dt : 0.05 ,
        diffCoef :0.001,
        time : 0 ,
        running : false ,
        skip    : 40 ,
        period  : 200 ,
        clickRadius : 0.1 ,
        clickPosition : [0.,0.] ,

        uClickVal : 1. ,
        vClickVal : 0.2 ,
    } ;

// defining the textures .................................................
var fcolor = new Abubu.Float32Texture(512,512, 
    { pairable : true } ) ;
var scolor = new Abubu.Float32Texture(512,512 ) ;
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
var uPlot = new Abubu.Plot2D({ // plots the u field on canvas_1
    target : fcolor,   /* the texture to visualize             */
    channel : 'r',              /* the channel of interest:
                                        can be : 'r', 'g', 'b', or 'a' 
                                        defualt value is 'r'            */
    minValue : 0 ,              /* minimum value on the colormap        */
    maxValue : 1 ,              /* maximum value on the colormap        */
    colorbar : true ,           /* if you need to show the colorbar     */
    canvas : canvas_1 ,         /* the canvas to draw on                */
}) ;
uPlot.addMessage( 'u-field', 0.05,0.075 , 
        { 
            font : "16pt Times" ,
            style: "#ffffe0", 
            align: "left"
        }
    ) ;

uPlot.init() ;   /* initialize the plot */
uPlot.render() ;

var vPlot = new Abubu.Plot2D({ // plots the v field on canvas_2
    target : fcolor,   /* the texture to visualize             */
    channel : 'g',              /* the channel of interest:
                                        can be : 'r', 'g', 'b', or 'a' 
                                        defualt value is 'r'            */
    minValue : 0 ,              /* minimum value on the colormap        */
    maxValue : .2 ,              /* maximum value on the colormap       */
    colorbar : true ,           /* if you need to show the colorbar     */
    canvas : canvas_2 ,         /* the canvas to draw on                */
}) ;
vPlot.addMessage( 'v-field', 0.05,0.075 ,
        { 
            font : "16pt Times" ,
            style: "#ffffe0", 
            align: "left"
        }
    ) ;
vPlot.init() ;   /* initialize the plot */
vPlot.render() ;

// display ...............................................................
function display(){ // render both plotting algorithms
    uPlot.render() ;
    vPlot.render() ;
}

// marching steps ........................................................
function marchUniforms(_inTexture){
    this.inTexture  = { type : 't', value : _inTexture      } ; 
    this.dt         = { type : 'f', value : env.dt          } ; 
    this.diffCoef   = { type : 'f', value : env.diffCoef    } ; 
    this.period     = { type : 'f', value : env.period      } ;
    return this ;
}

var fmarch = new Abubu.Solver({
        fragmentShader : source( 'march' ) ,
        uniforms : new marchUniforms( fcolor ) ,
        targets : {
                ocolor : { location : 0, target : scolor } 
        }
    } ) ;

var smarch = new Abubu.Solver({
        fragmentShader : source( 'march' ) ,
        uniforms : new marchUniforms( scolor ) ,
        targets : {
                ocolor : { location : 0, target : fcolor } 
        }
    } ) ;

// march the solution for two time steps
function march(){
    fmarch.render() ;
    smarch.render() ;
    env.time += env.dt*2. ;
}

function run(){
        if (env.running){
            for(var i = 0 ; i<env.skip ; i++){
                march() ;
            }
        }
        display() ;
        requestAnimationFrame(run) ;
}

/*------------------------------------------------------------------------
 * click solvers 
 *------------------------------------------------------------------------
 */
// click on the u canvas changes u .......................................
var uClick = new Abubu.Solver({
    fragmentShader : source( 'uClick' ) ,
    uniforms : {
        inTexture    : { type : 't',  value : fcolor            } ,
        clickRadius  : { type : 'f',  value : env.clickRadius   } ,
        clickPosition: { type : 'v2', value : env.clickPosition } ,
        uClickVal    : { type : 'f',  value : env.uClickVal     } ,
    } ,
    targets : {
            ocolor : { location : 0 , target : scolor } ,
    }
} ) ;

// click on the v canvas changes v .......................................
var vClick = new Abubu.Solver({
    fragmentShader : source( 'vClick' ) ,
    uniforms : {
        inTexture    : { type : 't',  value : fcolor            } ,
        clickRadius  : { type : 'f',  value : env.clickRadius   } ,
        clickPosition: { type : 'v2', value : env.clickPosition } ,
        vClickVal    : { type : 'f',  value : env.vClickVal     } ,
    } ,
    targets : {
            ocolor : { location : 0 , target : scolor } ,
    }
} ) ;

var clickCopy = new Abubu.Copy( scolor, fcolor ) ;

// mouse drag on u canvas ................................................
var uMouseDrag = new Abubu.MouseListener({
    canvas : canvas_1 ,
    event : 'drag' ,
    callback : function(e){
        uClick.uniforms.clickPosition.value = e.position ;
        uClick.render() ;
        clickCopy.render() ;
    }
} ) ; 

// mouse drag on v canvas ................................................
var vMouseDrag = new Abubu.MouseListener({
    canvas : canvas_2 ,
    event : 'drag' ,
    callback : function(e){
        vClick.uniforms.clickPosition.value = e.position ;
        vClick.render() ;
        clickCopy.render() ;
    }
} ) ; 

/*=========================================================================
 * saveCsvFile : save an array to disk as comma separated values
 *=========================================================================
 */
function saveCsvFile(){
    var link = document.createElement('a') ;
    var data = "data:text;charset=utf-8," +
        fcolor.width + ',' + 
        fcolor.height + ',' + 
        fcolor.value.join() 
        ;

    var csv = encodeURI( data ) ;
    link.setAttribute( 'href', csv ) ;
    link.setAttribute( 'download', 'fcolor.csv' ) ;
    link.click() ;
}
/*=========================================================================
 * processFile  : read a CSV file into the html page
 *=========================================================================
 */
function processFile(){
    var file = document.querySelector("#myFile").files[0] ;
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

// create the graphical user interface ...................................
function createGui(){
    var gui = new Abubu.Gui() ;     /*  create a graphical user 
                                        interface               */
    var panel = gui.addPanel() ;    /*  add a panel to the GUI  */
    panel.add(env,'time').listen() ;
    panel.add(env,'skip') ;
    panel.add(env,'period').onChange(function(){
        // make sure that both respective solvers are updated
        // with the new values of for the uniform
        fmarch.uniforms.period.value = env.period ;
        smarch.uniforms.period.value = env.period ;
    } ) ;
    panel.add(env,'running') ;

    var mouse = panel.addFolder('Mouse') ;
    mouse.add( env, 'uClickVal').onChange(function(){
        uClick.uniforms.uClickVal.value = env.uClickVal ;
    } ) ;
    mouse.add( env, 'vClickVal').onChange(function(){
        vClick.uniforms.vClickVal.value = env.vClickVal ;
    } ) ;
}

/* run createGui to create the graphical user interface     */
createGui() ;

run() ;
