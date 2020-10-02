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

var modelMatrix = Abubu.mat4.create() ;
Abubu.mat4.identity(  modelMatrix                   ) ;
Abubu.mat4.rotate(  modelMatrix, modelMatrix,
                    -Math.PI/2.,[1.,0.,0.]          ) ;

Abubu.mat4.translate(   modelMatrix, modelMatrix,
                        [-0.5,-0.5,-0.5]            ) ;

/* viewMatrix   */
var viewMatrix = mat4.create() ;

Abubu.mat4.rotate(    viewMatrix, viewMatrix,
                Math.PI/2.0,[1,1,1]         ) ;

Abubu.mat4.identity(  viewMatrix                  ) ;

Abubu.mat4.lookAt(    viewMatrix,
                [2,2,2],[0,0,0],[0,1,0]     ) ;

var controler = new Abubu.OrbitalCameraControl(
    viewMatrix,
    4.0 , canvas_1 ,
    {
        prevx: -.4,
        prevy: 0.4,
    }
) ;

/* projectionMatrix */
var projectionMatrix = Abubu.mat4.create() ;
mat4.identity(      projectionMatrix        ) ;
mat4.perspective (  projectionMatrix ,
                     Math.PI*0.1  , 1. ,
                    0.01 /*near field */, 100 /* far field */               ) ;

// screen size
var backfaceCrdTxt = new Abubu.Float32Texture( 512, 512 ) ;
var pass1 = new Abubu.Solver({
            vertexShader    : source( 'vrc1VShader' ),
            fragmentShader  : source( 'vrc1FShader' ) ,
            uniforms : {
                modelMatrix : {
                    type    : 'mat4',
                    value   : modelMatrix
                } ,
                viewMatrix  : {
                    type    : 'mat4',
                    value   : viewMatrix
                } ,
                projectionMatrix : {
                    type    : 'mat4',
                    value   : projectionMatrix
                } ,
            } ,
            geometry        : cubeGeometry ,
            cullFacing      : true ,
            cullFace        : 'front',
            depthTest       : 'true',
            renderTargets   : {
                back_face_Crds : {
                    location :0 ,
                    target  : backfaceCrdTxt
                } ,
            } ,
} ) ;

var pass2 = new Abubu.Solver({
            vertexShader    : source('vrc2VShader') ,
            fragmentShader  : source('vrc2FShader') ,
            uniforms    : {
                modelMatrix : {
                    type    : 'mat4',
                    value   : modelMatrix
                } ,
                viewMatrix  : {
                    type    : 'mat4',
                    value   : viewMatrix
                } ,
                projectionMatrix : {
                    type    : 'mat4',
                    value   : projectionMatrix
                } ,
                backfaceCrdTxt : {
                    type    : 's',
                    value   : backfaceCrdTxt ,
                    minFilter : 'nearest' ,
                    magFilter : 'nearest' ,
                    wrapS   : 'clamp_to_edge' ,
                    wrapT   : 'clamp_to_edge' ,
                } ,
                target      : {
                    type    : 's',
                    value   : fcolor ,
                    minFilter: 'nearest',
                    magFilter: 'nearest',
                } ,
                lightTxt    : {
                    type    : 't' ,
                    value   : lightTxt ,
                } ,
                minValue    : {
                    type    : 'f',
                    value   : 0.5
                } ,
                maxValue    : {
                    type    : 'f',
                    value   : 1.1
                } ,
                threshold   : {
                    type    : 'f',
                    value   : 0.5
                } ,
                channelMultiplier: {
                    type    : 'v4',
                    value   : [1.,0.,0.,0.] ,
                } ,
                alphaCorrection : {
                    type    : 'f',
                    value   : 0.15
                } ,
                noSteps       : {
                    type    : 'i',
                    value   : 120
                } ,
                mx          : {
                    type    : 'f' ,
                    value   : env.mx ,
                } ,
                my          : {
                    type    : 'f',
                    value   : env.my ,
                } ,
                lightShift  : {
                    type    : 'f',
                    value   : 0. ,
                } ,
            } ,
            geometry        : cubeGeometry ,
            cullFacing      : true ,
            cullFace        : 'back' ,
            depthTest       : true ,
            clear           : true ,
            canvas          : canvas_1, 
} ) ;
 

//var plot = new Abubu.VolumeRayCaster({
//    target : fcolor ,
//    channel : 'r' ,
//    mx : env.mx ,
//    my : env.my ,
//    noSteps : 100 ,
//    alphaCorrection : 0.15 ,
//    minValue  : 0.01 ,
//    maxValue  : 1.1 ,
//    threshold : 0.5 ,
//    scale : 0.7 ,
//    canvas : canvas_1,
//    floodLights     : [1.,1.,1.,
//                       0.,0.,1,
//                       -1,0.,0,
//                       0,1,0,
//                       0,-1,0,],
//
//    } ) ;
//plot.initForeground() ;   /* initialize the plot */
//plot.render() ;

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
        controler.update() ;
        Abubu.mat4.scale( viewMatrix, viewMatrix, [1,1,1,1] ) ;
        pass1.setUniform('viewMatrix', viewMatrix) ;
        pass2.setUniform('viewMatrix', viewMatrix) ;

        pass1.render() ;
        pass2.render() ;
        pass2.render() ;
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
