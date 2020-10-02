#version 300 es
precision highp float ;
precision highp int ;

uniform sampler2D   inTexture ;
uniform float       dt, diffCoef ;
uniform float       period ;

uniform int         mx, my, nx, ny ;

in vec2 cc, pixPos ;

layout (location = 0) out vec4 ocolor ;

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
    int m_y     = (wd - sliceNo)/mx ; // how many slices in the positive vertical direction of the picture 
    int m_x     = sliceNo%mx ; // how many slices in the horizontal direction

    c.x = (float(m_x)+crd.x)/float(mx) ; // pixel coordinate x
    c.y = (float(m_y)+crd.y)/float(my) ; // pixel coordinate y
    return c ; 
}

/*-------------------------------------------------------------------------
 * Get the texture value based on the voxel coordinate
 *-------------------------------------------------------------------------
 */
vec4 Texture3D(sampler2D inText, vec3 crd){
    vec3 c = crd ;

    c.x = (c.x > 0.) ? c.x : -c.x ;
    c.y = (c.y > 0.) ? c.y : -c.y ;
    c.z = (c.z > 0.) ? c.z : -c.z ;

    c.x = (c.x < 1.) ? c.x : 2.-c.x ;
    c.y = (c.y < 1.) ? c.y : 2.-c.y ;
    c.z = (c.z < 1.) ? c.z : 2.-c.z ;

    return texture(inText, getPC(c)) ;

}
// Main body of the shader
void main() {
    vec2  size  = vec2(textureSize(inTexture, 0)) ;
    float dx    = 4./float(nx) ;

    vec3 CC = getVC(cc) ;
    vec3 ii = vec3(1.,0.,0.)/float(nx) ;
    vec3 jj = vec3(0.,1.,0.)/float(ny) ;
    vec3 kk = vec3(0.,0.,1.)/(float(mx*my)) ;

    // read the color of the pixel .......................................
    vec4 color = texture( inTexture , cc ) ;

    // if ( length(CC)<0.5 ) u = 1. ;
    
    vec4 laplacian = 
        Texture3D( inTexture, CC + ii )
     +  Texture3D( inTexture, CC - ii )
     +  Texture3D( inTexture, CC + jj )
     +  Texture3D( inTexture, CC - jj )
     +  Texture3D( inTexture, CC + kk )
     +  Texture3D( inTexture, CC - kk )
     -6.*color ;
    ;
    u += dt*diffCoef*laplacian.r/(dx*dx) ;

    // gate time derivatives for FHN .......................................
    float a = 0.1 ;
    float b = 0.3 ;
    float epsilon = 0.01 ;

    float du2dt = u*(1.-u)*(u-a) - v ;
    float dv2dt = epsilon*(b*u-v) ;

    // marching gates
    u += du2dt*dt ;
    v += dv2dt*dt ;

    // pacing algorithm
    time += dt ;
    if ( time > period ){
        if(length(CC) <0.1){
            u = 1. ;
        }
        time = 0. ;
    }

    // output the color of the pixel .....................................
    ocolor = color ;
    return ;
}
