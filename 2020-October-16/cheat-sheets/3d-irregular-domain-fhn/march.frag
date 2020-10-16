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


uniform int mx, my ;
uniform int nx, ny ;


in vec2 cc, pixPos ;

layout (location = 0) out vec4 ocolor ;

// macros assigning color channels to values .............................
#define u       color.r
#define v       color.g
#define time    color.b


/*-------------------------------------------------------------------------
 * Get the voxel coordinate
 *-------------------------------------------------------------------------
 */
vec3 getVC(vec2 c){
    vec3 crd = vec3(0.) ;

    crd.x = (c.x - floor(c.x * float(mx))/float(mx) ) * float(mx) ;
    crd.y = (c.y - floor(c.y * float(my))/float(my) ) * float(my) ;

    float sliceNo = floor(c.x *float(mx)) 
                +   ( ( float(my) -1.0) - floor(c.y * float(my)) )*float(mx);

    crd.z = sliceNo/(float(mx*my)-1.) ;
    return crd ;
}

/*-------------------------------------------------------------------------
 * Get Pixel Coordinate of a Voxel
 *-------------------------------------------------------------------------
 */
vec2 getPC(vec3 crd){
    vec2 c ; 
    
    int wd      = mx*my-1 ;
    int sliceNo = int( floor(crd.z*float(mx*my))) ;
    int m_y     = (wd - sliceNo)/mx ; 
    int m_x     = sliceNo%mx ;

    c.x = (float(m_x)+crd.x)/float(mx) ;
    c.y = (float(m_y)+crd.y)/float(my) ;
    return c ; 
}

/*-------------------------------------------------------------------------
 * Get the texture value based on the voxel coordinate
 *-------------------------------------------------------------------------
 */
vec4 Texture3D(sampler2D inText, vec3 crd){
    return texture(inText, getPC(crd)) ;
}
// macros to deal with the irregular boundaries ..........................
#define isin(pos)   (texture(domain, pos).r>0.5)
#define vect(d)     ( isin(CC+(d)) ? (d) : (isin(CC-(d)) ? \
            (-(d)) : (0.*(d)) ) )

/*========================================================================
 * main body of the shader
 *========================================================================
 */
void main() {
    vec2  size  = vec2(textureSize(inTexture, 0)) ;
    float dx    = 4./float(nx) ;

    vec3 CC = getVC(cc) ;
    vec3 ii = vec3(1.,0.,0.)/float(nx) ;
    vec3 jj = vec3(0.,1.,0.)/float(ny) ;
    vec3 kk = vec3(0.,0.,1.)/(float(mx*my)-1.) ;

    // read the color of the pixel .......................................
    vec4 color = texture( inTexture , cc ) ;
    
    vec4 laplacian = 
            Texture3D( inTexture, CC-ii )
        +   Texture3D( inTexture, CC+ii )
        +   Texture3D( inTexture, CC-jj )
        +   Texture3D( inTexture, CC+jj )
        +   Texture3D( inTexture, CC+kk )
        +   Texture3D( inTexture, CC-kk )
        -6.*color ;
    float diffusion = diffCoef*laplacian.r/(dx*dx) ;

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
            if(length(CC-vec3(0.1,0.1,.2))<0.1){
                u = 1. ;
            }
        }
    }

    // output the color of the pixel .....................................
    ocolor = color ;
    return ;
}
