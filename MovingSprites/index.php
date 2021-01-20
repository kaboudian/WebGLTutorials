<!doctype html>
<html>
<head>
    <title>Sprites</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <script src='https://abubujs.org/libs/Abubu.latest.js' 
	    type='text/javascript'></script>

</head>
<body>
<h1>Sprite Example</h1>
<canvas id=canvas_1 width=512 height=512>
    Your browser doesn't support HTML5.0
</canvas>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- All shaders included here (Codes written in glsl                   -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<?php
    include "shader.php" ;
    shader( "init_coord" ) ;
    shader( "coord" ) ;
    shader("spriteVertex" ) ;
    shader("spriteFragment" ) ;
?>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- main script - JavaScript code                                      -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<script>
<?php
    echo file_get_contents( __dir__ . "/app.js" ) ;
?>
</script>
</body>
</html>
