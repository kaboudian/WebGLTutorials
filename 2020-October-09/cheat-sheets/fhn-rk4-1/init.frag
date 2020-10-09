#version 300 es
precision highp float ;
precision highp int ;

in vec2 cc, pixPos ;

layout (location = 0) out vec4 color1 ;
layout (location = 1) out vec4 color2 ;
// Main body of the shader
void main() {
    vec4 color = vec4(0.) ;
    
    color1 = color ;
    color2 = color ;
    return ;
}
