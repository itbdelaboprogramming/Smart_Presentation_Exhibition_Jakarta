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

            <div class="catalogue-container-2" id="catalogue-container-2">
                <div>
                    <p class="catalogue-description-title-2">VSI Gyropactor Series</p>
                </div>
                <div class="catalogue-description-2">
                    <div class="catalogue-product-list-2 active" id="model_name">
                        <div class="catalogue-product-list-text-2"> SR100C_v1 </div>
                        <img class="catalogue-image-preview-2" src="./files/SR100C_v1_preview.png" />
                    </div>
                    <div class="catalogue-product-list-2" id="model_name">
                        <div class="catalogue-product-list-text-2"> SRユニット_v1 </div>
                        <img class="catalogue-image-preview-2" src="./files/SRユニット_v1_preview.png" />
                    </div>
                </div>
            </div>


            <div class="container-bottom-right">
                <div class="menu-container-blue-album">
                    <img src="./assets/Album-Button.png">
                </div>
                <div class="menu-container-blue-lightning">
                    <img src="./assets/Lightning-Button.png">
                </div>
                <div class="toggle"></div>
            </div>

            <div class="item-name-container" id="item-category">
                <p class="text-file-name">Nakayama's Product</p>
                <div class="type-container">
                    <div class="text-file-type">VSI Gyropactor</div>
                </div>
            </div>
            <script type="module" src="script.js"> </script>
            <script type="module" src="./js/home.js"></script>
        </div>
    </body>
</html>