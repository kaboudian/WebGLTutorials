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
 * function to calculate RK, K coeficients
 *========================================================================
 */
void getKs(float U, float V, float diffusion, 
        out float KU, out float KV){
    KU = diffusion + U*(1.-U)*(U-a) - V ;
    KV = epsilon*(b*U-V) ;
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
    float diffusion = laplacian.r ;

    // RK updates ........................................................
    float ku1, ku2, ku3, ku4 ;
    float kv1, kv2, kv3, kv4 ;

    // k1
    getKs( u, v, diffusion, ku1, kv1 ) ;
    
    // k2
    getKs( u + 0.5*dt*ku1, v + 0.5*dt*kv1, diffusion, ku2, kv2 ) ;
    
    // k3
    getKs( u + 0.5*dt*ku2, v + 0.5*dt*kv2, diffusion, ku3, kv3 ) ;
    
    // k4
    getKs( u + dt*ku3, v + dt*kv3, diffusion, ku4, kv4 ) ;

    // final RK4 update
    u = u + dt*(ku1 + 2.*ku2 + 2.*ku3 + ku4)/6.0 ;
    v = v + dt*(kv1 + 2.*kv2 + 2.*kv3 + kv4)/6.0 ;

    //// gate time derivatives for FHN .....................................
    //float du2dt = diffusion + u*(1.-u)*(u-a) - v ;
    //float dv2dt = epsilon*(b*u-v) ;

    //// marching gates ....................................................
    //u += du2dt*dt ;
    //v += dv2dt*dt ;

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
