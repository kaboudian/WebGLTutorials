<?php
/*========================================================================
 * a function that creates a script section with the id of the file
 * and also reads the content file into the script section 
 *========================================================================
 */
function commentLine($n, $char ){
    echo "<!-- " ;
    for($i=0 ; $i< $n ; $i++){
        echo $char ;
    }
    echo " -->\n" ;
}

/*========================================================================
 * This function loads the content of a file line by line and if there is
 * any include statements it loads those files recursively
 *========================================================================
 */
function getShader( $file ){
    $output = "" ;
    
    // get the text content of the file ..................................
    $content = file_get_contents($file ) ;
    
    // array of lines ....................................................
    $arr = explode("\n", $content); 
    
    // number of lines in the file .......................................
    $noLines = count($arr) ;

    // process each line of the file .....................................
    for($i=0 ; $i<$noLines ; $i++){
        $lineArray = preg_split('/\s+/', $arr[$i]);

        /* if the first word of the line is #include load the included
           file, otherwise, append the line as is */
        $noWords=count($lineArray) ;
        $noInclude=true ;
        for($j=0 ; $j<$noWords; $j++){
            if ( $lineArray[$j] == "#include" ){
                $noInclude=false ;
                $output = $output . getShader( $lineArray[$j+1] ) ;
                break ;
            }
        }
        if ($noInclude){
            $output = $output . $arr[$i] . "\n" ;
        }

    }
    return $output ;
}

/*========================================================================
 * creates a shader block by providing the name of the shader without the 
 * extension of the file. The supported extensions are .frag, .vert, .glsl
 *========================================================================
 */
function shader($name){
    commentLine(65, "*") ;
    $F = __dir__ . "/" . $name ;

    //
    if ( file_exists( $F . ".frag" ) ){
        echo "<script id='" . $name . "' type='x-shader-fragment'>" ;
        $FEXT=".frag" ;
    }else if ( file_exists( $F . ".vert" ) ){
        echo "<script id='" . $name . "' type='x-shader-vertex'>" ;
        $FEXT=".vert" ;
    }else if ( file_exists( $F . ".glsl" ) ) {
        echo "<script id='" . $name . "' type='x-shader'>" ;
        $FEXT=".glsl" ;
    }


    $content = getShader($F . $FEXT ) ;

    echo $content ;
    echo "\n</script><!-- end of " . 
        $name . 
        " shader's source code -->\n\n" ;
}
?>
