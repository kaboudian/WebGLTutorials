#version 300 es 
precision highp float ;
precision highp int ;

in vec2 cc ;

layout ( location = 0 ) out vec4 phase ;

void main(){
    if ( length(cc-vec2(0.5)) < .4 ){
        phase = vec4(1.) ;
    } else{
        phase = vec4(0.) ;
    }
    return ;
}
