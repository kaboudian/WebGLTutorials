#version 300 es

#include precision.glsl

in vec2 cc ;


// tinymt state and tempering texture
uniform usampler2D  itinymtState , itinymtMat ;

// output colors
layout (location =0) out vec4  ocolor ;       // other color output
layout (location =1) out uvec4 otinymtState ; // updated tinymt state

#include tinymt.glsl

void main(){
    // initialize tinymt states ..........................................
    tinymtInit() ; 
 
    ocolor = vec4(tinymtRand(), tinymtRand(), tinymtRand(),1.0) ;

    // return tinymt states ..............................................
    tinymtReturn() ;
    return ;
}
