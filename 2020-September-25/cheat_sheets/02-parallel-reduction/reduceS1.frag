#version 300 es

precision highp float ;
precision highp int ;

in vec2 cc ;

uniform sampler2D inTexture ;

layout ( location = 0 ) out vec4 ocolor ;

#define u   color.r

void main(){
    ivec2 isize = textureSize( inTexture, 0) ;
    vec4 color ;

    float sum = 0. ;

    for(int j=0 ; j<isize.y; j++){
        int i = int( floor(float(isize.x)*cc.x) ) ;
        color = texelFetch( inTexture, ivec2(i,j),0 ) ;
        if ( u>0.5 ){
            sum +=1. ;
        }
    }

    ocolor = vec4(sum/float(isize.x*isize.y)) ;
}
