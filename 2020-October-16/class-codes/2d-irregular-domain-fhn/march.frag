#version 300 es
// precision of variables ................................................
precision highp float ;
precision highp int ;

// interfacial variables .................................................
uniform sampler2D   inTexture ;
uniform sampler2D   domain ;
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

// macros to deal with the irregular boundaries ..........................
#define isin(pos)   (texture(domain, pos).r>0.5)
#define vect(d)     ( isin(cc+(d)) ? (d) : (isin(cc-(d)) ? \
            (-(d)) : (0.*(d)) ) )

/*========================================================================
 * main body of the shader
 *========================================================================
 */
void main() {
    vec2  size  = vec2(textureSize(inTexture, 0)) ;
    float dx    = 10./size.x ;

    vec2 ii = vec2(1.,0.)/size ;
    vec2 jj = vec2(0.,1.)/size ;

    vec2 ip = ii+jj ;
    vec2 jp = ii-jj ;
    
    // read the color of the pixel .......................................
    vec4 color = texture( inTexture , cc ) ;
    
    float omega = 1./3. ;
    vec4 laplacian = 
            texture( inTexture, cc+vect(-ii) )
        +   texture( inTexture, cc+vect( ii) )
        +   texture( inTexture, cc+vect(-jj) )
        +   texture( inTexture, cc+vect( jj) )
        -4.*texture( inTexture, cc    )  ;
    laplacian = (1.-omega)*laplacian + omega*(
            texture( inTexture, cc+vect(-ip) )
        +   texture( inTexture, cc+vect( ip) )
        +   texture( inTexture, cc+vect(-jp) )
        +   texture( inTexture, cc+vect( jp) )
        -4.*texture( inTexture, cc    ) 
            )*0.5 ;
    laplacian = diffCoef*laplacian/(dx*dx) ;
    float diffusion = laplacian.r ;

    // gate time derivatives for FHN .....................................
    float du2dt = diffusion + u*(1.-u)*(u-a) - v ;
    float dv2dt = epsilon*(b*u-v) ;

    // marching gates ....................................................
    u += du2dt*dt ;
    v += dv2dt*dt ;

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
