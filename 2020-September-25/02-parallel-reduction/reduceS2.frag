#version 300 es
// step 2
precision highp float ;
precision highp int ;

in vec2 cc ;

uniform sampler2D inTexture ;

layout ( location = 0 ) out vec4 ocolor ;

void main(){
    ivec2 isize = textureSize( inTexture, 0) ;
    vec4 color ;

    float sum = 0. ;
    
    for(int i=0; i<isize.x ;i++){
        color = texelFetch( inTexture, ivec2(i,0),0 ) ;
        sum += color.x ;
    }

    ocolor = vec4(sum) ;
}
