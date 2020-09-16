#version 300 es

precision highp float ;
precision highp int ;

in vec2 cc ;

uniform float dt , diffCoef ;
uniform float minVlt, maxVlt ;


uniform sampler2D   inColor1, inColor2 ;
uniform sampler2D   inTable1, inTable2 , inTable3, inTable4 ;

layout (location = 0) out vec4 outColor1 ;
layout (location = 1) out vec4 outColor2 ;

// macros to assign color channels to physical variable ..................
#define V       color1.r
#define Cai     color1.g
#define x1      color1.b
#define f       color1.a

#define m       color2.r
#define h       color2.g
#define j       color2.b
#define d       color2.a

// macros to expand table values .........................................
#define m_inf   table1.r
#define tau_m   table1.g
#define h_inf   table1.b
#define tau_h   table1.a

#define j_inf   table2.r
#define tau_j   table2.g
#define d_inf   table2.b
#define tau_d   table2.a

#define x1_inf  table3.r
#define tau_x1  table3.g
#define f_inf   table3.b
#define tau_f   table3.a

#define ik1     table4.r
#define ix1bar  table4.g

/*------------------------------------------------------------------------
 * Rush-Larsen method
 *------------------------------------------------------------------------
 */
#define RushLarsen(a, a_inf, tau_a) (a_inf+((a)-(a_inf))*exp(-dt/(tau_a)))

/*========================================================================
 * main body of the shader
 *========================================================================
 */ 
void main(){
    // reading color .....................................................
    vec4 color1 = texture(inColor1, cc) ;
    vec4 color2 = texture(inColor2, cc) ;
    
    // reading tables ....................................................
    vec2 v = vec2((V-minVlt)/(maxVlt-minVlt), 0.5 ) ;
    vec4 table1 = texture( inTable1, v ) ;
    vec4 table2 = texture( inTable2, v ) ;
    vec4 table3 = texture( inTable3, v ) ;
    vec4 table4 = texture( inTable4, v ) ;

    // updating HH-type gates ............................................
    m = RushLarsen(m, m_inf, tau_m ) ;
    h = RushLarsen(h, h_inf, tau_h ) ;
    j = RushLarsen(j, j_inf, tau_j ) ;
    d = RushLarsen(d, d_inf, tau_d ) ;
    f = RushLarsen(f, f_inf, tau_f ) ;
    x1= RushLarsen(x1, x1_inf, tau_x1 ) ;

    // Calculating current ...............................................

    /* iNa */
    float ENa = 50.0 ;
    float gNa = 4.0 ;
    float gNaC = 0.005 ;

    float iNa = (gNa*m*m*m*h*j+gNaC)*(V-ENa) ;
    
    /* iCa */
    float ECa = -82.3 - 13.0278*log(Cai) ;
    float gs  = 0.09 ;
    float iCa = gs*d*f*(V-ECa) ;

    /* ix1 */
    float ix1 = ix1bar*x1 ;

    // updating calcium ..................................................
    float   dCai2dt = -1.0e-7*iCa + 0.07*(1.0e-7-Cai) ;
    Cai += dCai2dt*dt ;

    // sum of currents ...................................................
    float isum = ik1 + ix1 + iNa + iCa ;

    // laplacian of voltage ..............................................
    vec2 size = vec2(textureSize( inColor1, 0).xy) ;
    vec2 ii = vec2(1.,0.)/size ;
    vec2 jj = vec2(0.,1.)/size ;

    float oodx = size.x/8. ;

    float laplacian = (
            texture( inColor1, cc+ii) 
        +   texture( inColor1, cc-ii) 
        +   texture( inColor1, cc+jj) 
        +   texture( inColor1, cc-jj) 
        -4.*texture( inColor1, cc   )).r*oodx*oodx ; 

    // updatinng membrane potentia .......................................
    float dv2dt = laplacian*diffCoef - isum ;

    V += dv2dt*dt ;

    // outputting colors .................................................
    outColor1 = vec4(color1) ;
    outColor2 = vec4(color2) ;
}
