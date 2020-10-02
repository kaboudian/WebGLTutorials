// get the shader source by its id ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function source(id){
    return document.getElementById(id).text ;
}

// Get the canvas ........................................................
var canvas_1 = document.getElementById('canvas_1') ;

// Object to be used for interactions ....................................
var env = {
        dt          : 0.05 ,
        diffCoef    : 0.001 ,
        time        : 0 ,
        running     : false ,
        skip        : 20 ,
        period      : 200 ,
        nx : 64 ,   // resolution in x-direction
        ny : 64 ,   // resolution in y-direction
        mx : 8 ,    // the number of z-slices in horizontal direction
        my : 8 ,    // the number of z-slices in the vertical direction
    } ;

env.width   = env.nx*env.mx ;
env.height  = env.ny*env.my ;

// defining the textures .................................................
var fcolor = new Abubu.Float32Texture(env.width,env.height) ;
var scolor = new Abubu.Float32Texture(env.width,env.height) ;

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
/*========================================================================
 * volume ray casting 
 *========================================================================
 */ 

// coordinates ...........................................................
var crdtTxt = new Abubu.Float32Texture( env.width, env.height ) ;
var crdt = new Abubu.Solver({
    fragmentShader : source( 'vrcLgtShader' ) ,
    uniforms : { 
        mx : { type : 'f', value : env.mx } ,
        my : { type : 'f', value : env.my } ,
    } ,
    targets: { 
        crd : { location : 0, target : crdtTxt } ,
    }
} ) ;
crdt.render() ;

var lightTxt = new Abubu.Float32Texture( env.width, env.height ) ;
var light = new Abubu.Solver({
    fragmentShader : source( 'vrcLgtShader' ) ,
    uniforms : { 
        crdtTxt : { type : 't', value : crdtTxt } ,
        target  : { type : 't', value : fcolor  } ,
        mx : { type : 'f', value :env.mx } ,
        my : { type : 'f', value :env.my } ,
        minValue : { type : 'f', value : 0.01  } ,
        maxValue : { type : 'f', value : 1.1   } ,
        threshold : { type :'f', value : 0.5 } ,
        dfls : { type : 'f3v' , value : [
                        1.,1.,1.,
                        0.,0.,1,
                        -1,0.,0,
                        0,1,0,
                        0,-1,0,] } ,
        noDfls : { type : 'i', value : 5 } ,
        noPtls : { type : 'i', value : 0 } ,
        alphaCorrection : { type : 'f', value : 0.15 } ,
        channelMultiplier : {type : 'v4', value : [1.,0.,0.,0.] } ,
        lightShif : { type : 'f', value : 0. } ,
    } ,
    targets : {
        light : { location : 0 , target : lightTxt } ,
    }
} ) ;
light.render() ;
var cubeGeometry    = new Abubu.UnitCubeGeometry() ;
var frameGeometry   = {
    vertices : [
            0,0,0,
            0,0,1,

            0,0,0,
            1,0,0,

            1,0,0,
            1,0,1,

            1,0,0,
            1,1,0,

            1,1,0,
            1,1,1,

            1,1,0,
            0,1,0,

            0,1,0,
            0,0,0,

            0,1,0,
            0,1,1,

            0,0,1,
            1,0,1,

            1,0,1,
            1,1,1,

            1,1,1,
            0,1,1,

            0,1,1,
            0,0,1,

            ] ,
        noCoords : 3 ,
        premitive : 'lines' ,
} ;


var plot = new Abubu.VolumeRayCaster({
    target : fcolor ,
    channel : 'r' ,
    mx : env.mx ,
    my : env.my ,
    noSteps : 100 ,
    alphaCorrection : 0.15 ,
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
plot.render() ;

// marching steps ........................................................
function marchUniforms(_inTexture ){
    this.inTexture   = { type : 't', value : _inTexture     } ;
    this.dt          = { type : 'f', value : env.dt         } ;
    this.diffCoef    = { type : 'f', value : env.diffCoef   } ;
    this.period      = { type : 'f', value : env.period     } ;
    this.nx          = { type : 'i', value : env.nx         } ;
    this.ny          = { type : 'i', value : env.ny         } ;
    this.mx          = { type : 'i', value : env.mx         } ;
    this.my          = { type : 'i', value : env.my         } ;
    
    return this ;
}

var fmarch = new Abubu.Solver({
        fragmentShader : source( 'march' ) ,
        uniforms : new marchUniforms( fcolor ),
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

// running sequence ......................................................
function run(){
        if (env.running){
            for(var i = 0 ; i< env.skip ; i++){
                march() ;
            }
        }
        plot.render() ;
        requestAnimationFrame(run) ;
}

// create the graphical user interface ...................................
function createGui(){
    var gui = new Abubu.Gui() ;     /*  create a graphical user 
                                        interface               */
    var panel = gui.addPanel() ;    /*  add a panel to the GUI  */
    panel.add(env,'time').listen() ;
    panel.add(env,'skip') ;
    panel.add(env,'running') ;
    
    panel.add(env,'dt').step(0.001).onChange(function(){
        // send the information to GPU
        fmarch.uniforms.dt.value = env.dt ;
        smarch.uniforms.dt.value = env.dt ;
    } ) ;

    panel.add(env,'period').step(5).onChange(function(){
        // send the information to GPU
        fmarch.uniforms.period.value = env.period ;
        smarch.uniforms.period.value = env.period ;
    } ) ;

}

/* run createGui to create the graphical user interface     */
createGui() ;

run() ;
