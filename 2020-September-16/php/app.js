/*========================================================================
 * get the source code for fragment shaders
 *========================================================================
 */
function source( id ){
    return document.getElementById( id ).innerHTML ;
}
var env = {} ; // Global variable

/*========================================================================
 * loadWebGL code
 *========================================================================
 */ 
function loadWebGL(){
    env.width  = 512 ;
    env.height = 512 ;
    env.time   = 0. ;
    
/*------------------------------------------------------------------------
 * Creating tables to speed up calculations on the GPU
 *------------------------------------------------------------------------
 */
    env.noSamples = 1024 ;
    env.minVlt    = -100. ;
    env.maxVlt    = 50. ;

    var Vlt     = new Float64Array(env.noSamples) ;
    var table   = new Float32Array(env.noSamples*4) ;

    // initializing an array of voltages .................................
    for (var i=0 ; i<Vlt.length ; i++){
        Vlt[i] = (i+0.5)*(env.maxVlt - env.minVlt)/env.noSamples +
            env.minVlt ;
    }

    // coeficients of alpha and beta .....................................
    var ca_x1= [0.0005,     0.083,  50.,    0.0,
                0.0,        0.057,          1.0     ] ;

    var cb_x1= [0.0013,     -0.06,  20.,    0.0,
                0.0,        -0.04,          1.0     ] ;

    var ca_m = [0.0000,     0.0,    47.,   -1.0,
                47.,        -0.1,           -1.0    ] ;

    var cb_m = [40.,        -0.056, 72.,    0.0,
                0.0,        0.0,            0.0     ] ;

    var ca_h = [.126,       -.25,   77.,    0.0,
                0.0,        0.0,            0.0     ] ;

    var cb_h = [1.7,        0.0,    22.5,   0.0,
                0.0,        -0.082,         1.0     ] ;

    var ca_j = [.055,       -.25,   78.0,   0.0,
                0.0,        -0.2,           1.0     ] ;

    var cb_j = [.3,         0.0,    32.,    0.0,
                0.0,        -0.1,           1.0     ] ;

    var ca_d = [0.095,      -0.01,  -5.,    0.0,
                0.0,        -0.072,         1.0     ] ;

    var cb_d = [0.07,       -0.017, 44.,    0.0,
                0.0,        0.05,           1.0     ] ;

    var ca_f = [0.012,      -0.008, 28.,    0.0,
                0.0,        0.15,           1.0     ] ;

    var cb_f = [.0065,      -0.02,  30.,    0.0,
                0.0,        -0.2,           1.0     ] ;


    // function to calculate the coeficients .............................
    function abCoef(Vm,C){
        return (
            (C[0]*Math.exp(C[1]*(Vm+C[2])) + C[3]*(Vm+C[4]))/
            (Math.exp(C[5]*(Vm+C[2])) + C[6]) ) ;
    }

    /* m_inf, tau_m, h_inf, tau_h */
    var p = 0 ;
    for(var i = 0; i<env.noSamples; i++){
        var V = Vlt[i] ;

        var a_m  = abCoef(V, ca_m) ;
        var b_m  = abCoef(V, cb_m) ;
        var a_h  = abCoef(V, ca_h ) ;
        var b_h  = abCoef(V, cb_h ) ;

        /* m_inf        */
        table[ p++ ] = a_m/(a_m+b_m) ;

        /* tau_m        */
        table[ p++ ] = 1.0/(a_m+b_m) ;

        /* h_inf        */
        table[ p++ ] = a_h/(a_h + b_h) ;

        /* tau_h        */
        table[ p++ ] = 1.0/(a_h + b_h) ;
    }
    env.table1 = new Abubu.TableTexture( table, env.noSamples, 1 ) ;

    
    /* j_inf, tau_j, d_inf, tau_d */
    p = 0 ;
    for(var i = 0; i<env.noSamples; i++){
        var V = Vlt[i] ;
        var a_j = abCoef(V, ca_j ) ;
        var b_j = abCoef(V, cb_j ) ;
        var a_d = abCoef(V, ca_d ) ;
        var b_d = abCoef(V, cb_d ) ;

        /* j_inf        */
        table[ p++ ] = a_j/(a_j+b_j) ;

        /* tau_j        */
        table[ p++ ] = 1.0/(a_j+b_j) ;

        /* d_inf        */
        table[ p++ ] = a_d/(a_d+b_d) ;

        /* tau_d        */
        table[ p++ ] = 1.0/(a_d+b_d) ;
    }
    env.table2 = new Abubu.TableTexture( table, env.noSamples ) ;

    /* x1_inf, tau_x1, f_inf, tau_f */ 
    p = 0 ;
    for(var i = 0; i<env.noSamples; i++){
        var V = Vlt[i] ;
        var a_x1 = abCoef( V, ca_x1 ) ;
        var b_x1 = abCoef( V, cb_x1 ) ;
        var a_f  = abCoef( V, ca_f  ) ;
        var b_f  = abCoef( V, cb_f  ) ;

        /* x1_inf */
        table[ p++ ] = a_x1/(a_x1 + b_x1) ;
        
        /* tau_x1 */
        table[ p++ ] = 1.0/(a_x1 + b_x1 ) ;

        /* f_inf */
        table[ p++ ] = a_f/(a_f + b_f)  ;

        /* tau_f */
        table[ p++ ] = 1.0/(a_f + b_f)  ;
    }
    env.table3 = new Abubu.TableTexture( table, env.noSamples ) ;

    /* ikix */
    for(var i = 0; i<env.noSamples; i++){
        var indx = i*4 ;
        var Vm = Vlt[i] ;

        /* ik1 */
        table[ indx   ] = 0.35 *(4*(Math.exp(0.04 * (Vm + 85)) - 1) /
                (Math.exp(0.08 * (Vm + 53))
                    + Math.exp(0.04 * (Vm + 53)))
                + 0.2 * ((Vm + 23) / (1 - Math.exp(-0.04 * (Vm + 23)))));
        
        /* ix1bar */
        table[ indx+1 ] = 0.8 * ( Math.exp(0.04 * (Vm + 77)) - 1)/
                                Math.exp(0.04 * (Vm + 35));
        table[ indx+2 ] = 0.0 ;
        table[ indx+3 ] = 0.0 ;
    }

  //  env.table4 = new Abubu.TableTexture( table, env.noSamples ) ;
    env.table4 = new Abubu.Float32Texture( env.noSamples, 1, {
            data : table ,
            magFilter : 'linear', 
            minFilter : 'linear' 
    } ) ;
/*------------------------------------------------------------------------
 * creating textures for time stepping 
 *------------------------------------------------------------------------
 */
    env.fcolor1 = new Abubu.Float32Texture( env.width , env.height ) ;
    env.fcolor2 = new Abubu.Float32Texture( env.width , env.height ) ;
    env.scolor1 = new Abubu.Float32Texture( env.width , env.height ) ;
    env.scolor2 = new Abubu.Float32Texture( env.width , env.height ) ;

/*------------------------------------------------------------------------
 * Solvers  
 *------------------------------------------------------------------------
 */
    // Applying initial conditions .......................................
    env.init = new Abubu.Solver({
        fragmentShader : source('init') ,
        targets : {
            fcolor1 : { location : 0 , target : env.fcolor1 } ,
            fcolor2 : { location : 1 , target : env.fcolor2 } ,
            scolor1 : { location : 2 , target : env.scolor1 } ,
            scolor2 : { location : 3 , target : env.scolor2 } ,
        } 
    } ) ;


    // function to initialize solution ...................................
    env.initialize = function(){
        env.init.run() ;
        env.time = 0. ;
    }
    env.initialize() ;

    // compute solvers ...................................................
    env.dt = 0.05 ;
    env.Ct_d = 1. ;
    env.Ct_f = 1. ;
    var compUniforms = function(_c1,_c2){
        this.inColor1 = { type : 't', value : _c1 } ;
        this.inColor2 = { type : 't', value : _c2 } ;
        this.inTable1 = { type : 't', value : env.table1 } ;
        this.inTable2 = { type : 't', value : env.table2 } ;
        this.inTable3 = { type : 't', value : env.table3 } ;
        this.inTable4 = { type : 't', value : env.table4 } ;
        this.dt       = { type : 'f', value : env.dt } ;
        this.diffCoef = { type : 'f', value : 0.001 } ;
        this.minVlt   = { type : 'f', value : env.minVlt } ;
        this.maxVlt   = { type : 'f', value : env.maxVlt } ;
        this.Ct_f   = { type : 'f', value : env.Ct_f } ;
        this.Ct_d   = { type : 'f', value : env.Ct_d } ;
    } ;
    var compTargets = function(_c1, _c2 ){
        this.outColor1 = {location : 0 , target : _c1 } ;
        this.outColor2 = {location : 1 , target : _c2 } ;
    } ;

    env.fcomp = new Abubu.Solver({
        fragmentShader : source('comp') ,
        uniforms : new compUniforms( env.fcolor1, env.fcolor2 ) ,
        targets : new compTargets( env.scolor1, env.scolor2 ) ,
    } ) ;
    env.scomp = new Abubu.Solver({
        fragmentShader : source('comp') ,
        uniforms : new compUniforms( env.scolor1, env.scolor2 ) ,
        targets : new compTargets( env.fcolor1, env.fcolor2 ) ,
    } ) ;

    
    env.march = function(){
        env.fcomp.render() ;
        env.scomp.render() ;
        env.time += 2.*env.dt ;
    } ;

    // display ...........................................................
    env.disp = new Abubu.Plot2D({
        target : env.fcolor1 ,
        channel: 'r' ,
        minValue : -90 ,
        maxValue : 30 ,
        colorbar : true ,
        canvas : document.getElementById('canvas_1') ,
    } ) ;
    env.disp.init() ;

    env.disp.render() ;

    // click 
    // click solver ..........................................................
    var click = new Abubu.Solver({
        fragmentShader : source( 'click' ) ,
        uniforms : {
            inTexture       : { type : 't', value  : env.fcolor1    } ,
            clickRadius     : { type : 'f', value  : 0.1            } ,
            clickPosition   : { type : 'v2', value : [0.5,0.5]      } ,
        } ,
        targets : {
            ocolor : { location : 0 , target : env.scolor1 } ,
        }
    } ) ;
    
    var clickCopy = new Abubu.Copy( env.scolor1, env.fcolor1 ) ;
    
    var mouseDrag = new Abubu.MouseListener({
        canvas : document.getElementById('canvas_1') ,
        event : 'drag' ,
        callback : function(e){
            click.uniforms.clickPosition.value = e.position ;
            click.render() ;
            clickCopy.render() ;
        }
    } ) ; 

    // run sequence ......................................................
    env.skip = 30 ;
    env.running = false ;
    env.run = function(){
        if (env.running){
            for(var i = 0 ; i<env.skip ; i++){
                env.march() ;
            }
        }
        env.disp.render() ;
        requestAnimationFrame(env.run) ;
    }

    createGui() ;
    env.run() ;

}

function createGui(){
    var gui = new Abubu.Gui() ;     /*  create a graphical user 
                                        interface               */
    var panel = gui.addPanel() ;    /*  add a panel to the GUI  */
    panel.add(env,'time').listen() ;
    panel.add(env,'skip') ;
    panel.add(env,'running') ;

    panel.add(env, 'Ct_f').onChange(function(){
        env.fcomp.uniforms['Ct_f'].value = env.Ct_f ;
        env.scomp.uniforms.Ct_f.value = env.Ct_f ;
    } ) ;    
    panel.add(env, 'Ct_d').onChange(function(){
        Abubu.setUniformsInSolvers( ['Ct_d','Ct_f'], [env.Ct_d,env.Ct_f], 
                [env.fcomp, env.scomp]) ;
    } ) ;   

    panel.add(env, 'initialize') ;
}

