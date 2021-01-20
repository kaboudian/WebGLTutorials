#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * spriteFragment:  Fragment shader to color the sprites
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Wed 20 Jan 2021 14:39:15 (EST)
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float ;
in vec2 pointIndex ; /* index of the sprite point used for coloring
                        purposes. */
out vec4 color ;
void main(){
    // try coloring all points black for your flocking application 
    color = vec4(pointIndex,0,1.) ;
    return ;
}
