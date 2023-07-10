<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Smart Presentation</title>
        <link rel="icon" type="image/x-icon" href="assets/SR_logo_03_red.png">
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

            <div class="container-bottom-right-mr2x" >
                <div class="menu-container-blue-lightning-expand" style="display: none">
                    <div class="menu-container-blue-lightning-expand-wrapper">
                        <div class="lightning-component">
                            <div class="lightning-title">
                                Lightning:
                                <div class="opsi active">
                                    default
                                </div>
                                <div class="opsi">
                                    custom
                                </div>
                            </div>
                            <div class="lightning-component-container custom-lightning" style="display:none;">
                                <div class="slider-group">
                                    Environment Brightness
                                    <div class="slider-container">
                                        <span class="bar">
                                            <span class="fill" id="fill-env"></span>
                                        </span>
                                        <input type="range" min="0" max="2" value="0.2" step="0.1" class="slider" id="slider-env"/>
                                    </div>
                                </div>
                                <div class="slider-group">
                                    Direct Lamp Brightness
                                    <div class="slider-container">
                                        <span class="bar">
                                            <span class="fill" id="fill-lamp"></span>
                                        </span>
                                        <input type="range" min="0" max="40" value="20" step="0.1" class="slider" id="slider-lamp"/>
                                    </div>
                                </div>
                                <div class="slider-group">
                                    Direct Lamp Position
                                    <div class="slider-container">
                                        <span class="bar">
                                            <span class="fill" id="fill-lamp-pos"></span>
                                        </span>
                                        <input type="range" min="0" max="400" value="200" step="1" class="slider" id="slider-lamp-pos"/>
                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div class="lightning-component-center"> 
                            <div class="lightning-title">
                                Enlargement
                            </div>
                            <div class="lightning-component-container">
                                <div class="slider-group">
                                    Zoom
                                    <div class="slider-container">
                                        <span class="bar">
                                            <span class="fill" id="fill-zoom"></span>
                                        </span>
                                        <input type="range" min="0.2" max="20" value="1" step="0.1" class="slider" id="slider-zoom"/>
                                    </div>
                                </div>
                            </div>
                        </div>
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
