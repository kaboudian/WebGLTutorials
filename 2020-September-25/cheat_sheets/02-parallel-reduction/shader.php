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
        echo "<script id='" . $name . "' type='x-shader-fragment'>" ;
        echo file_get_contents(__dir__ . "/" . $name . ".frag" ) ;
        echo "\n</script><!-- end of " . 
            $name . 
            " shader's source code -->\n\n" ;
    }
?>
