/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * app.js       : Main JavaScript code
 *
 * PROGRAMMER   : ABOUZAR KABOUDIAN
 * DATE         : Wed 20 Jan 2021 14:03:11 (EST)
 * PLACE        : Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

// get the shader source by its id .......................................
function source(id){
    return document.getElementById(id).text ;
}


var canvas_1 = document.getElementById( 'canvas_1' ) ;

// Object to be used for interactions ....................................
var env = {} ;

env.width   = 128 ;
env.height  = 128 ;

// coordinate textures ...................................................
env.fcrdt = new Abubu.Float32Texture( env.width , env.height) ;
env.scrdt = new Abubu.Float32Texture( env.width , env.height) ;


// solver to initialize coordinate textures ..............................
env.init = new Abubu.Solver({
    fragmentShader : source('init_coord') ,
    targets : {
        fcrdt : { location : 0, target: env.fcrdt } ,
        scrdt : { location : 1, target: env.scrdt } ,
    }
} ) ;
env.init.render() ;

// geometry update solvers ...............................................
env.fcoord = new Abubu.Solver({
    fragmentShader : source( 'coord' ) ,
    uniforms : { 
        icrdt : { type : 't' , value : env.fcrdt } 
    } ,
    targets: {
        ocrdt : { location : 0, target : env.scrdt } ,
    }
} ) ;
env.scoord = new Abubu.Solver({
    fragmentShader : source( 'coord' ) ,
    uniforms : { 
        icrdt : { type : 't' , value : env.scrdt } 
    } ,
    targets: {
        ocrdt : { location : 0, target : env.fcrdt } ,
    }
} ) ;
env.coord = function(){
    env.fcoord.render() ;
    env.scoord.render() ;
}

// creating the sprite geometry ..........................................
env.sprites ={} ;
env.sprites.vertices    = [] ;
env.sprites.noCoords    = 3 ;
env.sprites.noVertices  = env.width*env.height ; // number of sprites
env.sprites.type        = 'FLOAT' ;
env.sprites.premitive   = 'POINTS' ;

/* nested loops create the sprite vertice coordinates that are used to 
 * access the displayed coordinate from the textures */ 
for(var i=0 ; i< env.width ; i++){
    for(var j=0; j< env.height ; j++){
        /* x and y act like cc.x and cc.y to read coordinates from the
         * uniform textures */
        let x = (i+0.5)/env.width ;   
        let y = (j+0.5)/env.height ; 

        // push the x, y, and z indices of the vertex
        env.sprites.vertices.push(x) ; 
        env.sprites.vertices.push(y) ;
        env.sprites.vertices.push(0) ;
    }
}

// creating the display solver ...........................................
// this display solver uses the sprite geometry and the custom vertex and
// fragment shaders for updating the position of the vertices based on the
// env.fcrdt texture as the coordinates of the points
env.display = new Abubu.Solver({
    vertexShader : source('spriteVertex') ,
    fragmentShader: source( 'spriteFragment') ,
    uniforms: {
        crdt : { type : 't', value : env.fcrdt } , // coordinate texture
    } ,
    geometry : env.sprites , // we use the custom geometry
    canvas : canvas_1 
} ) ;


// run sequence ..........................................................
env.run = function(){
    env.coord() ;               /* update the coordinate textures which can
                                   be replaced by your flocking code    */
    env.display.render() ;      /* custom display solver that uses our
                                   custom sprite geometry and shaders   */
    requestAnimationFrame( env.run ) ;
}

env.run() ;
