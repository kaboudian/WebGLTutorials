#version 300 es
precision highp float ;
precision highp int ;

uniform sampler2D   inTexture ;
uniform float       dt, diffCoef ;
uniform float       period ;

in vec2 cc, pixPos ;

layout (location = 0) out vec4 ocolor ;

#define u       color.r
#define v       color.g
#define time    color.b
// Main body of the shader
void main() {
    vec2  size  = vec2(textureSize(inTexture, 0)) ;
    float dx    = 10./size.x ;

    vec2 ii = vec2(1.,0.)/size ;
    vec2 jj = vec2(0.,1.)/size ;

    // read the color of the pixel .......................................
    vec4 color = texture( inTexture , cc ) ;
    
    vec4 laplacian = 
            texture( inTexture, cc-ii )
        +   texture( inTexture, cc+ii )
        +   texture( inTexture, cc-jj )
        +   texture( inTexture, cc+jj )
        -4.*texture( inTexture, cc    ) ;
    u += dt*diffCoef*laplacian.r/(dx*dx) ;

    // gate time derivatives for FHN .......................................
    float a = 0.1 ;
    float b = 0.3 ;
    float epsilon = 0.01 ;

    float du2dt = u*(1.-u)*(u-a) - v ;
    float dv2dt = epsilon*(b*u-v) ;

    // marching gates
    u += du2dt*dt ;
    v += dv2dt*dt ;

    time += dt ;

    if (time > period ){
        time = 0. ;
        if (length(cc)<0.1)
            u = 1. ;
    }


    // output the color of the pixel .....................................
    ocolor = color ;
    return ;
}
