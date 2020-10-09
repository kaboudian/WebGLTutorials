#version 300 es
// precision of variables ................................................
precision highp float ;
precision highp int ;

// interfacial variables .................................................
uniform sampler2D   inTexture ;
uniform float       dt, diffCoef ;
uniform float       period ;
uniform bool        pacemakerActive , pacemakerCircular ;
uniform float       pacemakerRadius , pacemakerX , pacemakerY ;
uniform float       a, b, epsilon ;

in vec2 cc, pixPos ;

layout (location = 0) out vec4 ocolor ;

// macros assigning color channels to values .............................
#define u       color.r
#define v       color.g
#define time    color.b

/*========================================================================
 * get k constants for the RK method
 *========================================================================
 */
void getKs(float U, float V, vec4 lap, out float KU, out float KV){
    KU = lap.r + U*(1.-U)*(U-a) - V ; 
    KV = epsilon*(b*U-V)  ;
    return ;
}
/*========================================================================
 * main body of the shader
 *========================================================================
 */
void main() {
    vec2  size  = vec2(textureSize(inTexture, 0)) ;
    float dx    = 10./size.x ;

    vec2 ii = vec2(1.,0.)/size ;
    vec2 jj = vec2(0.,1.)/size ;

    // read the color of the pixel .......................................
    vec4 color = texture( inTexture , cc ) ;
    
    vec4 laplacian = 
            texture( inTexture, cc-ii )
        +   texture( inTexture, cc+ii )
        +   texture( inTexture, cc-jj )
        +   texture( inTexture, cc+jj )
        -4.*texture( inTexture, cc    ) ;
    laplacian = diffCoef*laplacian/(dx*dx) ;

    // RK4 implementation ------------------------------------------------
    float ku1, ku2, ku3, ku4 ;
    float kv1, kv2, kv3, kv4 ;

    // k1s ...............................................................
    getKs( u, v, laplacian, ku1, kv1  ) ;

    // k2s ...............................................................
    getKs( u + 0.5*ku1*dt , v+0.5*kv1*dt,laplacian, ku2, kv2 ) ;

    // k3s ...............................................................
    getKs( u + 0.5*ku2*dt , v+0.5*kv2*dt,laplacian, ku3, kv3 ) ;

    // k4s ...............................................................
    getKs( u + ku3*dt , v+kv3*dt,laplacian, ku4, kv4 ) ;

    // final integration .................................................
    u = u + dt*(ku1+ 2.*ku2 + 2.*ku3 + ku4)/6.0 ;
    v = v + dt*(kv1+ 2.*kv2 + 2.*kv3 + kv4)/6.0 ;

    // pacemaker logic ...................................................
    time += dt ;

    if (time > period ){
        time = 0. ;
        if (pacemakerActive){
            if (pacemakerCircular){
                if ( length(cc - vec2(pacemakerX, pacemakerY)) <
                        pacemakerRadius ){
                    u = 1. ;
                }
            }else{
                if ( (abs( cc.x - pacemakerX )*2.) < pacemakerRadius ){
                    u = 1. ;
                }
            }
        }
    }

    // output the color of the pixel .....................................
    ocolor = color ;
    return ;
}
