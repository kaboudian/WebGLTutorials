#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrc2FShader  :   2nd Pass Fragment Shader for Volume-Ray-Casting
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Wed 28 Nov 2018 12:16:39 (EST) 
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * Interface vars.
 *------------------------------------------------------------------------
 */
in      vec3        worldSpaceCoords;
in      vec4        projectedCoords;

uniform sampler2D   backfaceCrdTxt;
uniform sampler2D   target ;
uniform sampler2D   lightTxt ;
uniform sampler2D   clrm ;
uniform float       minValue, maxValue, threshold ;
uniform vec4        channelMultiplier ;

uniform int         noSteps ;
uniform float       alphaCorrection ;

uniform float       mx, my ;
uniform float       lightShift ;

out     vec4        FragColor ;

/*========================================================================
 * Acts like a texture3D using Z slices and trilinear filtering
 *========================================================================
 */
/*------------------------------------------------------------------------
 * Texture3D
 *------------------------------------------------------------------------
 */
vec4 Texture3D( sampler2D S, vec3 texCoord )
{
    vec4    vColor1, vColor2 ;
    float x, y ;
    float wd = mx*my - 1.0 ;

    float zSliceNo  = floor( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;

    vColor1 = texture( S,  vec2(x,y) ) ;

    zSliceNo = ceil( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;
    vColor2 = texture( S,  vec2(x,y) ) ;

    return mix(
        vColor2,
        vColor1,
        zSliceNo/(mx*my)-texCoord.z
    ) ;
}

const float SQRT3 = sqrt(1.) ;

/*========================================================================
 * noPhaseField
 *========================================================================
 */
vec4 noPhaseField(){
    // getting the projected coordiante of the texture on the screen
    vec2 texc = ((projectedCoords.xy/projectedCoords.w) + vec2(1.))*0.5 ;

    // getting position on the back face of the cube
    vec3    backCrd = texture( backfaceCrdTxt, texc).xyz ;

    // coordinate of the front face
    vec3    frontCrd = worldSpaceCoords ;

    // direction vector from front to back
    vec3    ray     = backCrd - frontCrd ;
    float   rayLength   = length(ray) ;

    // marching vectors for ray casting
    float   marchLength = rayLength / float(noSteps) ;
    vec3    marchRay    = normalize(ray)*marchLength ;

    vec3    currentCrd  = frontCrd ;

    // Accumulated values during ray casting march
    vec4    accumulatedColor    = vec4(0.);
    float   accumulatedAlpha    = 0. ;
    float   accumulatedLength   = 0. ;

    // Sampled Values
    vec4    sampledTarget ;
    float   sampledValue ;
    float   scaledValue ;
    vec4    sampledColor ;
    float   sampledAlpha ;
    float   sampledLight ;

    // Ray marching loop
    for(int i=0 ; i < noSteps; i++){
        sampledTarget   = Texture3D( target ,   currentCrd ) ;
        sampledValue    = dot(sampledTarget, channelMultiplier ) ;
        scaledValue     = (sampledValue-minValue)
                        / (maxValue - minValue) ;
        sampledLight = Texture3D( lightTxt , currentCrd ).r ;
        if (sampledValue > threshold){
            sampledColor = vec4(scaledValue,0.,0., 0.5) ;
            sampledAlpha = alphaCorrection;
            sampledColor = sampledColor ; //*sampledLight;
        }else{
            sampledAlpha = 0. ;
        }
        sampledAlpha = scaledValue*alphaCorrection ;

        accumulatedColor    += (1.-accumulatedAlpha)
                            *   sampledColor
                            *   sampledAlpha ;
        accumulatedAlpha += sampledAlpha ;
        accumulatedColor.a = accumulatedAlpha ;

        currentCrd += marchRay ;
        accumulatedLength += marchLength ;

        if ( accumulatedAlpha >= 1.0 || accumulatedLength> rayLength){
            accumulatedAlpha = 1.0 ;
            break ;
        }
    }
    return accumulatedColor ;
}

/*========================================================================
 * Main body of pass2Shader
 *========================================================================
 */
void main( void ) {
    FragColor = noPhaseField() ;
}
