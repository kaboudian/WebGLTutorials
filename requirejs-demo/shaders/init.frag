#version 300 es

precision highp float;
precision highp int;

in vec2 cc;

layout (location = 0) out vec4 color0;
layout (location = 1) out vec4 color1;

void main() {
    vec4 color = vec4(0.);
    color0 = color;
    color1 = color;
    return;
}
