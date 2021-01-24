#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * domInitShader: initialize the domain of the solution
 *
 * PROGRAMMER   : ABOUZAR KABOUDIAN
 * DATE         : Sun 24 Jan 2021 13:34:56 (EST)
 * PLACE        : Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

precision highp float ;
precision highp int ;
in vec2 cc ;

layout (location = 0 ) out vec4 dom1 ;
layout (location = 1 ) out vec4 dom2 ;

void main(){
    dom1 = vec4(1.) ;
    dom2 = vec4(1.) ;
    return ;
}
