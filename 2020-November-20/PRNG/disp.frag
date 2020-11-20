#version 300 es
#include precision.glsl

in vec2 cc ;

// input texture
uniform sampler2D icolor ;

// output color
out vec4 ocolor ;

void main(){
    ocolor = texture(icolor,cc) ;
    return ;
}
