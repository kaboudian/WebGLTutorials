#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * init_coord   : Initialize the coordinates
 *
 * PROGRAMMER   : ABOUZAR KABOUDIAN
 * DATE         : Wed 20 Jan 2021 14:12:30 (EST)
 * PLACE        : Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float ;

in vec2 cc ;

layout (location=0) out vec4 fcrdt ;
layout (location=1) out vec4 scrdt ;

void main(){
    vec4 crd = vec4(0) ;

    float theta  = cc.x*2.*acos(-1.) ;
    float radius = 0.5*cc.y ;

    // create a ring at the center of the screen (using the polar
    // coordinate system.)
    crd.xy = radius*vec2(cos(theta),sin(theta)) ;

    // output the coorinates
    fcrdt = vec4(crd) ;
    scrdt = vec4(crd) ;

    return ;
}
