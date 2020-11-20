<!DOCTYPE html>
<html>
<head>
    <title>OVVR</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <script src='http://abubujs.org/libs/Abubu.latest.js' 
	    type='text/javascript'></script>
</head>


<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- All shaders included here (codes written in GLSL)                 -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->

<?php
    include "shader.php" ;
    shader("prng") ;
    shader("disp") ;
?>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- body of the html page                                             -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<body>
    <h1>PRNG</h1>
    <table>
        <tr>
            <td>
                <canvas id=canvas_1 width=512 height=512>
                    Your browser doesn't support HTML5.0
                </canvas>
            </td>
            <td>
                <canvas id=canvas_2 width=512 height=512>
                    Your browser doesn't support HTML5.0
                </canvas>
            </td>
        </tr>
    </table>
</body>


<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- main script - JavaScript code                                     -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<script>
<?php
    echo file_get_contents( __dir__ . "/app.js" ) ;    
?></script>

</html>
