#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * coord        : A fragment shader to update the coordinate textures
 *
 * PROGRAMMER   : ABOUZAR KABOUDIAN
 * DATE         : Wed 20 Jan 2021 14:50:33 (EST)
 * PLACE        : Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float ;
in vec2 cc ;
uniform sampler2D   icrdt ;

layout (location = 0) out vec4 ocrdt ;

#define time crd.a
void main(){
    vec4 crd = texture(icrdt, cc) ;

    // a time variable which modifies the coordinates texture 
    time += 0.05 ;
    float PI = acos(-1.) ;
    if (time > (2.*PI)){
        time = 0. ;
    }

    // alter coordinates in the polar system based on time
    float theta  = cc.x*2.*acos(-1.) + time ;
    float radius = 0.5*cc.y + 0.25*(sin(time)+1.) ;
    
    crd.xy = radius*vec2(cos(theta),sin(theta)) ;

    // output the new coordinate
    ocrdt = vec4(crd) ;
}
