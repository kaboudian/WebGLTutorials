#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrc1FShader  :   First Pass of Volume Ray Casting
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Sat 12 Aug 2017 06:24:26 PM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * Interface Vars.
 *------------------------------------------------------------------------
 */
in vec3 worldSpaceCoords;

out vec4 back_face_Crds ;
/*========================================================================
 * Main
 *========================================================================
 */
void main()
{
    // Sets the fragment color as the fragment coordinates.
    back_face_Crds = vec4(   worldSpaceCoords, 1.0   ) ;
}
