#version 300 es

precision highp float;
precision highp int;

uniform sampler2D inTexture;
uniform vec2 clickPosition;
uniform float clickRadius;

in vec2 cc;

layout (location = 0) out vec4 outcolor;

// Color values as FHN variables
#define u color.r

void main() {
    // Get the texture info for this pixel
    vec4 color = texture(inTexture, cc);

    // Create an impulse around the clicked location
    if (length(clickPosition - cc) < clickRadius) {
        u = 1.;
    }

    outcolor = color;
    return;
}
