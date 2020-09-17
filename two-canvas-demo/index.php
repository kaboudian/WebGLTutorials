<!doctype html>
<html>
<head>
    <script src='https://abubujs.org/libs/Abubu.latest.js'></script>

</head>

<body>
    <canvas id='canvas_1' width=512 height=512>
        Your browser does not support HTML4.0 canvas elements.
    </canvas>
    <canvas id='canvas_2' width=512 height=512>
        Your browser does not support HTML4.0 canvas elements.
    </canvas>

    <br> 
    <button onclick='saveCsvFile()'>Save CSV data!</button>
   
    <p>Select a file : <input type='file' id="myFile"></p>
    <button onclick='processFile()'>Process</button>

</body>

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

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- shader codes: all written in GLSL and run on GPU                   -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->


<?php
    shader('init') ;
    shader('march') ;
    shader('uClick') ;
    shader('vClick') ;
?>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- main JavaScript section of the code                                -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<script>
<?php
    echo file_get_contents( __dir__ . "/app.js" ) ;    
?>
</script>

</html>
