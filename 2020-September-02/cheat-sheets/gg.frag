#version 300 es
precision highp float ;
precision highp int ;

in vec2 cc, pixPos ;

layout (location = 0) out vec4 color1 ;
layout (location = 1) out vec4 color2 ;
layout (location = 2) out vec4 color3 ;
layout (location = 3) out vec4 color4 ;
// Main body of the shader
void main() {
    vec4 color = vec4(0.) ;

    if ( length(cc-vec2(0.5))<0.1){
        color.r = 1. ;
    }

    color1 = color ;
    color2 = color ;
    color3 = color ;
    color4 = color ;
    return ;
}
</script>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- march fragment shader                                               -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<script id='march' type='shader'>#version 300 es
precision highp float ;
precision highp int ;

uniform sampler2D   inTexture ;
uniform float       dt, diffCoef ;

in vec2 cc, pixPos ;

layout (location = 0) out vec4 ocolor ;
layout (location = 1) out vec4 out2color ;

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


    //if (u < 0.5 ){
    //    u = 1. ;
    //}else{
    //    u = 0. ;
    //}
    vec4 laplacian =
            texture( inTexture, cc-ii )
        +   texture( inTexture, cc+ii )
        +   texture( inTexture, cc-jj )
        +   texture( inTexture, cc+jj )
        -4.*texture( inTexture, cc    ) ;
    u += dt*diffCoef*laplacian.r/(dx*dx) ;

    // output the color of the pixel .....................................
    ocolor = color ;
    out2color = color ;
    return ;
}
