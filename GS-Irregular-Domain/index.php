<html>
<head>

<style>
h1{
	counter-reset: h2;
	text-align:left;
	color: white;
       	background-color: #00254c;
       	padding-left: 10px ;
       	padding-top: 5px ;
       	padding-bottom: 5px ;
       	border-radius: 10px;
        max-width: 1048 ;
        width : 100% ;
}
</style>
<!-- Including Abubu.js Library ....................................... -->
<script src='https://abubujs.org/libs/Abubu.latest.js'></script>

<!--    MathJax is used to show equations
        The following section sets up the MathJax environment. ........ -->
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  CommonHTML:{
        scale :125,
  } ,

  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]},
  displayAlign: "left",
  TeX :{
    style: {
        "padding": "10px 20px",
    }

  }
});

</script>
<!--    The following line imports the MathJax library ................ -->
<script 
    type="text/javascript" async 
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-AMS_CHTML">
</script>

</head>
<h1>The Gray-Scott Model</h1>
<!-- Main body of html page ............................................-->
<body>
    <!-- Drawing Canvas to Visualize Results -->
    <canvas id="canvas_1" width=512 height=512
            style="border:1px solid #000000;" >
    </canvas>
    <canvas id="canvas_2" width=512 height=512
            style="border:1px solid #000000;" >
    </canvas>

<p>
    \[
        \frac{\partial u}{\partial t} =D_u \nabla^2 u + f(1-u) - uv^2 
    \]

    \[
        \frac{\partial v}{\partial t} =D_v \nabla^2 v +  u v^2 - (f+k)v 
    \]
</p>

<p>where $f$ is the feeding rate, $k$ is the killing rate, and $D_u$ and $D_v$ are the diffusion coeficients for $u$ and $v$, respectively.</p>
</body>


<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- all shaders                                                        -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<?php
    include 'shader.php' ; // used for importing shaders:

    shader( 'domInitShader' ) ;
    shader( 'icShader'      ) ;
    shader( 'tsShader'      ) ;
    shader( 'clickShader'   ) ;
    shader( 'pclickShader'  ) ;
?>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- main script -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<script>
<?php
echo file_get_contents(__dir__ . "/main.js") ;
?>
</script>
</html>
