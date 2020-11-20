/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * tinymt.glsl  :   a glsl file to be included the in the shaders
 *
 * PROGRAMMER   :   ABOUZAR KABOUDIAN
 * DATE         :   Tue 31 Mar 2020 14:25:32 (EDT)
 * PLACE        :   Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

// global variables and the macros for the tinymt algorithm --------------
uvec4 tinymtState, tinymtMat ; 

#define TINYMT32_SH0    1
#define TINYMT32_SH1    10
#define TINYMT32_SH8    8
#define TINYMT32_MASK   uint(0x7fffffff)
#define MIN_LOOP        8
#define PRE_LOOP        8

#define MAX_INT         4294967295
#define MAX_INT_F       4294967295.

/*========================================================================
 * initTinyMt : initialize the Tiny Marsenne Twister for the shader
 *========================================================================
 */
void tinymtInit(){
    // Initialize the random number states 
    tinymtState = texture( itinymtState, cc ) ;
    tinymtMat   = texture( itinymtMat,   cc ) ;
    return ;
}

/*========================================================================
 * finish the tiny marsenne twister algorithm: should be called before the
 * shader return call ;
 *========================================================================
 */
void tinymtFinish(){
    otinymtState = uvec4(tinymtState) ;
}
#define tinymtReturn  tinymtFinish

/*========================================================================
 * Iterate to the next state
 *========================================================================
 */
void tinymtNextState(){
    uint x,y ;
    y = tinymtState.a ;
    x = (tinymtState.r & TINYMT32_MASK)
        ^ tinymtState.g
        ^ tinymtState.b;
    x ^= (x << TINYMT32_SH0);
    y ^= (y >> TINYMT32_SH0) ^ x;
    tinymtState.r = tinymtState.g;
    tinymtState.g = tinymtState.b;
    tinymtState.b = x ^ (y << TINYMT32_SH1);
    tinymtState.a = y;
    tinymtState.g ^= uint(-int(y & uint(1)) & int(tinymtMat.r));
    tinymtState.b ^= uint(-int(y & uint(1)) & int(tinymtMat.g));

    return ;
}

/*========================================================================
 * temper the results
 *========================================================================
 */
uint  tinymtTemper() {
    uint t0, t1;
    t0 = tinymtState.a;
#if defined(LINEARITY_CHECK)
  t1 = tinymtState.r
      ^ (tinymtState.b >> TINYMT32_SH8);
#else
    t1 = tinymtState.r
        + (tinymtState.b >> TINYMT32_SH8);
#endif
    t0 ^= t1;
    t0 ^= uint(-int(t1 & uint(1)) & int(tinymtMat[2]));
    return t0;
}

/*========================================================================
 * Get a random number using the tiny marsenne twister 
 *========================================================================
 */
uint tinymtUrand(){
    tinymtNextState() ;
    return tinymtTemper() ;
}

/*========================================================================
 * tinymtFrand : returns a float number between 0-1 using the tiny mt
 * algorithm.
 *========================================================================
 */
float tinymtFrand(){
    return float(tinymtUrand())/MAX_INT_F ;
}
#define tinymtRand tinymtFrand

/*========================================================================
 * returns an integer with the binomial distribution with a Bernouli trail
 * of "npar" attempts with each attempt a chance of success of "p"
 *========================================================================
 */
uint tinymtBinran(float p, uint npar){
    uint isum = 0u ;
    if ( p > 0.1 ){
        for(uint i=0u ; i<npar ; i++){
            if ( tinymtRand() < p ){
                isum++ ;
            }
        }
    }else{ /* for small probablities of p use a geometric distribution */
        isum = uint( floor ( log( 1. - tinymtRand() ) /
                             log( 1. - p            )   ) ) ; 
    }
    return isum ;
}
