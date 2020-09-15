#version 300 es

precision highp float;
precision highp int;

uniform sampler2D inTexture;
uniform float dt, diffCoef, period;

in vec2 cc;

layout (location = 0) out vec4 outcolor;

// Color values as FHN variables
#define u color.r
#define v color.g
#define time color.b

void main() {
    vec2 size = vec2(textureSize(inTexture, 0));
    float dx = 10./size.x;

    // Used to get adjacent values for Laplacian
    vec2 ii = vec2(1., 0.)/size;
    vec2 jj = vec2(0., 1.)/size;

    // Get the texture info for this pixel
    vec4 color = texture(inTexture, cc);

    vec4 laplacian =
        texture(inTexture, cc-ii) +
        texture(inTexture, cc+ii) +
        texture(inTexture, cc-jj) +
        texture(inTexture, cc+jj) -
        4. * texture(inTexture, cc);

    // Use the laplacian to update the current pixel value
    u += dt * diffCoef * laplacian.r / (dx*dx);

    // FHN parameters
    float a = 0.1;
    float b = 0.3;
    float epsilon = 0.01;

    // FHN gate time DEs
    float du2dt = u * (1. - u) * (u - a) - v;
    float dv2dv = epsilon * (b*u - v);

    // Update gate values
    u += du2dt * dt;
    v += dv2dv * dt;

    time += dt;

    // Periodically create an impulse in the lower corner
    if (time > period) {
        time = 0.;

        if (length(cc) < 0.1) {
            u = 1.;
        }
    }

    // Set the output pixel
    outcolor = color;
    return;
}
