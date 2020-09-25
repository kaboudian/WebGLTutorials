<!doctype html>
<html>
<head>
    <script src='http://abubujs.org/libs/Abubu.latest.js' 
	    type='text/javascript'></script>        
</head>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- body of the html page                                             -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<body>
    <canvas id=canvas_1 width=512 height=512 style='border:2px solid'>
        Your browser doesn't support HTML5.0
    </canvas>
    <canvas id=canvas_2 width=512 height=512 style='border:2px solid'>
        Your browser doesn't support HTML5.0
    </canvas>
    </br>
    <canvas id=canvas_3 width=512 height=256 style='border:2px solid'>
        Your browser doesn't support HTML5.0
    </canvas>    

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- All shaders included here (codes written in GLSL)                 -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->

<?php
    include "shader.php" ;
    shader('init' ) ;
    shader('march') ;
    shader('click') ;
    shader('reduce') ;
?>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- main script - JavaScript code                                     -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<script>
<?php
    echo file_get_contents( __dir__ . "/app.js" ) ;
?>
</script>

</body>
</html>
