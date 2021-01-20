#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * spriteVertex : The vertex shader that uses a texture to determine the 
 * position of sprites.
 *
 * PROGRAMMER   : ABOUZAR KABOUDIAN
 * DATE         : Wed 20 Jan 2021 15:15:58 (EST)
 * PLACE        : Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

precision highp float ;
precision highp int ;

uniform sampler2D crdt ;
in vec4  position ;     /* The position of the point (sprite) can be used
                           to access the texture that contains the
                           coordinate of the vertex. Here, we only use the
                           x, and y values so that we can access the the
                           texture.

                           If needed, notice how position is a vec4 and
                           can pack extra info if needed */

out vec2 pointIndex ;  /*   index of each of the sprite points is sent to
                            fragment shader for coloring. I used this to
                            demonstrate the movement of each sprite.    */

void main(){
    pointIndex = position.xy ;
    
    // remember gl_Positions coordinates are within (-1. and 1.) 
    gl_Position = vec4( texture(crdt,position.xy).xy , /* x and y
                                                          coordinates are
                                                          extracted fron
                                                          the shader */
            0., /* z-coordinate is set 0        */ 

            1.  /* default: no-magnification    */ ) ;
}
