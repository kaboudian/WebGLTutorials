// get the shader source by its id .......................................
function source(id){
    return document.getElementById(id).text ;
}
var env = {} ;

// Get the canvas ........................................................
var canvas_1 = document.getElementById('canvas_1') ;
var canvas_2 = document.getElementById('canvas_2') ;

// Object to be used for interactions ....................................

env.width               = 512 ;
env.height              = 512 ;

// states for the random generator .......................................
env.istate  = new Uint32Array(env.width*env.height*4) ;
env.imat    = new Uint32Array(env.width*env.height*4) ;
//
// preparing the initial states for each pixel ...........................
var p=0 ;
var seed = 0 ;
var tm = new Abubu.TinyMT({vmat: 0}) ;

for(var j=0 ; j<env.height ; j++){
    for(var i=0 ; i<env.width ; i++){
        //  mat1            mat2            seed 
        tm.mat[0] = i ;     tm.mat[1] = j ; tm.mat[3] = seed ;
        tm.init() ;

        for(var k=0 ; k<4 ; k++){
            env.istate[p] = tm.state[k] ;  
            env.imat[p] = tm.mat[k] ;  
            p++ ;
        }
    }
}

// first time-step random textures .......................................
env.ftinymtState = new Abubu.Uint32Texture( env.width, env.height ,
        {data : env.istate ,pair : true } ) ;
env.stinymtState = new Abubu.Uint32Texture( env.width, env.height ,
        {data : env.istate ,pair : true } ) ;

// mat state for each point of the generator .............................
env.tinymtMat = new Abubu.Uint32Texture( env.width, env.height ,
        {data : env.imat } ) ;


// other texture generated using random numbers ..........................
env.ocolor = new Abubu.Float32Texture( env.width, env.height ) ;


// f-set of psuedo random number generaton
env.fprng = new Abubu.Solver({
    fragmentShader: source('prng') ,
    uniforms : { 
        itinymtState    :   { type : 't', value : env.ftinymtState  } ,
        itinymtMat      :   { type : 't', value : env.tinymtMat     } ,
    } ,
    targets :{
        ocolor :        { location : 0, target : env.ocolor } ,
        otinymtState : { location :1 , target : env.stinymtState } ,
    }
} ) ;

// s-set of psuedo random number generaton
env.sprng = new Abubu.Solver({
    fragmentShader: source('prng') ,
    uniforms : { 
        itinymtState    :   { type : 't', value : env.stinymtState } ,
        itinymtMat      :   { type : 't', value : env.tinymtMat     } ,
    } ,
    targets :{
        ocolor :        { location : 0, target : env.ocolor } ,
        otinymtState : { location :1 , target : env.ftinymtState } ,
    }
} ) ;


env.plot = new Abubu.Solver({
    fragmentShader : source('disp') ,
    uniforms : { 
        icolor : { type : 't', value : env.ocolor } ,
    } ,
    canvas : canvas_1 
} ) ;

env.plot.render() ;

env.frun = function(){
    env.fprng.render() ;
    env.plot.render() ;
}   
env.srun = function(){
    env.sprng.render() ;
    env.plot.render() ;
}   

// create graphical user interface .......................................
var gui = new Abubu.Gui() ;     /*  create a graphical user 
                                    interface               */
var panel = gui.addPanel({width:300}) ; // add a panel to the GUI

panel.add( env, 'frun' ) ;
panel.add( env, 'srun' ) ;
