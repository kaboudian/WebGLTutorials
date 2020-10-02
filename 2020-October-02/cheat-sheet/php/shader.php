<?php
    /* a function that creates a script section with the id of the file
     * and also reads the content file into the script section 
     */
    function commentLine($n, $char ){
        echo "<!-- " ;
        for($i=0 ; $i< $n ; $i++){
            echo $char ;
        }
        echo " -->\n" ;
    }

    function shader($name){
        commentLine(65, "*") ;
        $F = __dir__ . "/" . $name ;

        if ( file_exists( $F . ".frag" ) ){
            echo "<script id='" . $name . "' type='x-shader-fragment'>" ;
            echo file_get_contents($F . ".frag" ) ;
        }else if ( file_exists( $F . ".vert" ) ){
            echo "<script id='" . $name . "' type='x-shader-vertex'>" ;
            echo file_get_contents($F . ".vert" ) ;
        }else if ( file_exists( $F . ".glsl" ) ) {
            echo "<script id='" . $name . "' type='x-shader'>" ;
            echo file_get_contents($F . ".glsl" ) ;
        }
        echo "\n</script><!-- end of " . 
            $name . 
            " shader's source code -->\n\n" ;
    }
?>
