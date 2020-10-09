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
#define U uv.x
#define V uv.y
vec2 getK(vec2 uv, float diffusion ){
    return vec2(
       diffusion + U*(1.-U)*(U-a) - V ,
       epsilon*(b*U-V)  
    ) ;
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
    vec2 k1, k2, k3, k4 ;
    vec2 uv = vec2(u,v) ;

    k1 = getK(uv, diffusion );
    k2 = getK(uv+0.5*dt*k1, diffusion) ;
    k3 = getK(uv+0.5*dt*k2, diffusion) ;
    k4 = getK(uv+dt*k3,     diffusion) ;

    vec2 duv = dt*(k1+2.*k2+2.*k3+k4)/6. ;

    u = u + duv.x ;
    v = v + duv.y ;

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
