#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * tsShader     : march the solution for one time step
 *
 * PROGRAMMER   : ABOUZAR KABOUDIAN
 * DATE         : Sun 24 Jan 2021 13:35:40 (EST)
 * PLACE        : Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

precision highp float ;     /* high precision float     */
precision highp int ;       /* high precision integers  */

uniform sampler2D   inTrgt ;/* input texture            */
uniform float       dt ;    /* delta t: time increment  */
uniform float       lx ;    /* domain size              */

uniform sampler2D   domain ;

/* .......................................................................
   Using uniforms instead of macros for the FHN Parameters
   .......................................................................
*/
uniform float f      ;      /* feeding rate             */
uniform float k      ;      /* killing rate             */
uniform float Du, Dv ;      /* diffusion coefficients   */

layout (location = 0 ) out vec4 outTrgt ; // output color of the shader

in vec2 cc ;    // Center coordinate of the pixel : between 0-1.

#define isin(pos)   (texture(domain, pos).r>0.5)
#define vect(d)     ( isin(cc+(d)) ? (d) : (isin(cc-(d)) ? \
            (-(d)) : (0.*(d)) ) )

/*------------------------------------------------------------------------
 * main body of the shader
 *------------------------------------------------------------------------
 */
void main() {

    // reading the texture size and calculating delta_x (dx) .............
    vec2    size = vec2(textureSize( inTrgt,0 )) ;

    vec2 ii = vec2(1.,0.)/size ; // unit vector in x
    vec2 jj = vec2(0.,1.)/size ; // unit vector in y

    float dx = lx*ii.x ;

    if (!isin(cc)) return ;

    // calculating laplacian using the  central difference scheme ........
    vec4 laplacian = 
            texture( inTrgt, cc+vect(ii)    ) 
        +   texture( inTrgt, cc+vect(-ii)   )
        +   texture( inTrgt, cc+vect(jj)    ) 
        +   texture( inTrgt, cc+vect(-jj)   ) 
        -4.*texture( inTrgt, cc     ) ;

    // Adding diagonal terms to the laplacian ............................
    float gamma = 1./3. ;
    laplacian = (1.-gamma)*laplacian 
        + gamma*0.5*(
            texture(inTrgt , cc+vect(ii+jj  )   ) 
        +   texture(inTrgt , cc+vect(ii-jj  )   ) 
        +   texture(inTrgt , cc+vect(-ii-jj )   ) 
        +   texture(inTrgt , cc+vect(-ii+jj )   ) 
        -4.*texture(inTrgt , cc                 ) 
    ) ;


    laplacian  /= (dx*dx) ;

    // extracting values at the center of pixel ..........................
    vec4  C = texture( inTrgt, cc ) ;
    float u = C.r ;
    float v = C.g ;
    float time = C.b ;

    // calculating time derivatives ......................................
    float du2dt = laplacian.r*Du + f*(1.-u) - u*v*v ;
    float dv2dt = laplacian.g*Dv - (f + k)*v + u*v*v  ;


    // Euler time integration ............................................
    u += du2dt*dt ;
    v += dv2dt*dt ;
    time += dt ;

    // Updating the output color .........................................
    outTrgt = vec4(u,v,time,1.) ;
    return ;
}
