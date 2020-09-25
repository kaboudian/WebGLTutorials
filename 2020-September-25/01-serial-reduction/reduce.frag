#version 300 es

precision highp float ;
precision highp int ;

in vec2 cc ;

uniform sampler2D inTexture ;

layout ( location = 0 ) out vec4 ocolor ;

#define u   color.r

void main(){
    ivec2 isize = textureSize( inTexture, 0) ;
    float sum = 0. ;
    vec4 color ;

    ocolor = vec4(sum/float(isize.x*isize.y)) ;
}
