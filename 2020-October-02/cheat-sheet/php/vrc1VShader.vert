#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrc1VShader  :   1st Pass Vertex Shader of Volume-Ray-Casting
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Sat 12 Aug 2017 06:24:44 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;


/*------------------------------------------------------------------------
 * Interface vars.
 *------------------------------------------------------------------------
 */
in  vec3        position ;
out vec3        worldSpaceCoords;


uniform mat4 viewMatrix ;
uniform mat4 modelMatrix ;
uniform mat4 projectionMatrix ;

/*========================================================================
 * Main
 *========================================================================
 */
void main()
{
    //Set the world space coordinates of the back faces vertices as output.
    worldSpaceCoords = position ; 
    gl_Position = 
        projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );

}
