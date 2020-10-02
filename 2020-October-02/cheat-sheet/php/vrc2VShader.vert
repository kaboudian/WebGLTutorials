#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrc2VShader  :   2nd Pass Vertex Shader for Volume-Ray-Casting
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Sat 12 Aug 2017 06:25:12 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * Interface vars.
 *------------------------------------------------------------------------
 */
in      vec3        position ;

out     vec3        worldSpaceCoords ;
out     vec4        projectedCoords ;

uniform mat4        viewMatrix ;
uniform mat4        modelMatrix ;
uniform mat4        projectionMatrix ;

/*========================================================================
 * Main
 *========================================================================
 */
void main()
{
    worldSpaceCoords    =   position ; 
    
    projectedCoords     =   projectionMatrix 
                        *   viewMatrix
                        *   modelMatrix 
                        *   vec4( position, 1.0 ) ;

    gl_Position = projectedCoords ;
}
