<?php
    $global_variable = "MSD700_bucket_MCLA007A_00_2.glb";
    // if (isset($_GET['value'])) {
    //     $value = urldecode($_GET['value']);
    //     $global_variable = $value;
    // }

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Smart Presentation</title>
        <link rel="icon" type="image/x-icon" href="assets/logo.png">
        <meta charset="UTF-8">
        <script type="importmap">
            {
                "imports": {
                "three": "https://unpkg.com/three@0.153.0/build/three.module.js"
                }
            }
        </script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.2.4/dist/gsap.js"></script>
        <link rel="stylesheet" href="./style/style.css" >
    </head>
    <body>
        <div class="home-page">
            <canvas id="myCanvas">    </canvas>
            <div class="container-bottom-left">
                <button class="explode-button"> Explode </button>
            </div>
            <script type="module" src="script.js"> </script>
            <script type="module" src="./js/home.js"></script>
        </div>
    </body>
</html>