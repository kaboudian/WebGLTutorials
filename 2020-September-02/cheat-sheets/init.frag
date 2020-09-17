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
