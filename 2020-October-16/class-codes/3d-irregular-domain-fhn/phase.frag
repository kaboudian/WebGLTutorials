#version 300 es 
precision highp float ;
precision highp int ;

uniform int mx, my ;
uniform int nx, ny ;


in vec2 cc ;

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

layout ( location = 0 ) out vec4 phase ;

void main(){
    if(length(getVC(cc) - vec3(0.5)) <0.4){
        phase = vec4(1.) ;
    }else{
        phase = vec4(0.) ;
    }
}
