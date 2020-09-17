#version 300 es
precision highp float ;
precision highp int ;

uniform sampler2D   inTexture ;
uniform vec2        clickPosition ;
uniform float       clickRadius ;
uniform float       vClickVal ;

in vec2 cc, pixPos ;

layout (location = 0) out vec4 ocolor ;

#define u       color.r
#define v       color.g

// Main body of the shader
void main() {
    vec2  size  = vec2(textureSize(inTexture, 0)) ;

    // read the color of the pixel .......................................
    vec4 color = texture( inTexture , cc ) ;
 
    if ( length(clickPosition - cc )< clickRadius ){
        v = vClickVal ;
    }

    // output the color of the pixel .....................................
    ocolor = color ;
    return ;
}

