#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * vrcLgtShader :   shading the light on the structure
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Mon 14 Aug 2017 11:01:43 AM EDT
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float; precision highp int;

/*------------------------------------------------------------------------
 * interface vars.
 *------------------------------------------------------------------------
 */
const   int         MAX_NO = 100 ;
in      vec2        pixPos ;

uniform sampler2D   crdtTxt ;
uniform sampler2D   target  ;

uniform float       mx, my ;

uniform vec3        dfls[ MAX_NO ] ;        /* directional flood lights */
uniform int         noDfls ;                /* number of D.F.L's        */
uniform vec3        ptls[ MAX_NO ] ;        /* point lights             */
uniform int         noPtls ;                /* number of P.L's          */

uniform float       threshold , minValue, maxValue;
uniform vec4        channelMultiplier ;
uniform float       alphaCorrection ;

uniform float       lightShift ;
/*------------------------------------------------------------------------
 * output
 *------------------------------------------------------------------------
 */
layout (location = 0) out vec4 light ;

/*=========================================================================
 * Acts like a texture3D using Z slices and trilinear filtering
 *=========================================================================
 */
vec4 Texture3D( sampler2D S, vec3 texCoord )
{
    vec4    vColor ;
    float x, y ;
    float wd = mx*my - 1.0 ;

    float zSliceNo  = floor( texCoord.z*mx*my) ;

    x = texCoord.x / mx ;
    y = texCoord.y / my ;

    x += (mod(zSliceNo,mx)/mx) ;
    y += floor((wd-zSliceNo)/ mx )/my ;

    vColor = texture( S,  vec2(x,y) ) ;
    return vColor ;
}

/*========================================================================
 * floodLightCast
 *========================================================================
 */
vec4 floodLightIntensity( vec3 DFL, vec3 pp, sampler2D S ){
    vec4    tc ;
    float   tv ;
    float   aa ;
    float   a ;
    float   tr ;
    vec3 ld = DFL ;
    ld = ld/length(ld) ;

    vec3 dl = ld/200. ;
    vec3 lcp = pp + ld  ;
    aa = 0. ;
    for( int i=0; i < 100 ; i++){
        tc = Texture3D( S, lcp ) ;
        tv = dot( tc , channelMultiplier ) ;
        if (tv >threshold ){
            a = (tv-minValue)/
                (maxValue-minValue) ;
            aa += a * alphaCorrection  ;
        }
        lcp -= dl ;
        if ( aa >= 1.0 ){
            aa = 1.0 ;
            break ;
        }
    }
    return vec4(1.-aa) ;
}

/*========================================================================
 * pointLightIntensity
 *========================================================================
 */ 
vec4 pointLightIntensity( vec3 PTL, vec3 pp, sampler2D S){
    vec4    tc ;
    float   tv ;
    float   aa ;
    float   a ;
    float   tr ;
    vec3 ld = PTL-pp ;
    ld = ld/length(ld) ;

    vec3 dl = ld/120. ;
    vec3 lcp = pp ;
    aa = 0. ;
    tr = alphaCorrection ;
    for( int i=0; i < 120 ; i++){
        tc = Texture3D( S, lcp ) ;
        tv = dot( tc , channelMultiplier ) ;
        if ( tv > threshold ){
            a = (tv-minValue)/
                (maxValue-minValue) ;
        
            aa += a * tr ;
        }
        lcp += dl ;
        if ( aa >= 1.0 ){
            aa = 1.0 ;
            break ;
        }
    }
    return vec4(1.-aa) ;
}


/*========================================================================
 * main body
 *========================================================================
 */
void main(){
    light = vec4(0.) ;
    vec3 crd = texture( crdtTxt, pixPos ).rgb ;

    for (int i=0 ; i < noDfls; i++){
        light += floodLightIntensity( dfls[i], crd, target ) ;
    }
    for (int i=0 ; i < noPtls; i++){
        light += pointLightIntensity( ptls[i], crd, target ) ;
    }

    light = light/float(noDfls + noPtls);

    light = (light+lightShift)/(1.+lightShift) ;
}

