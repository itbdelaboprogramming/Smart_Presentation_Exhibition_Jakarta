const myCanvas = document.querySelector("#myCanvas");
// var myText = document.getElementById("myText").textContent;

import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js";

// ----------------------------------- SCENE BACKGROUND COLOR -----------------------------------
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdbe9e9);

// ------------------------------------------- CAMERA -------------------------------------------
export const camera = new THREE.PerspectiveCamera(
	50,
	myCanvas.offsetWidth / myCanvas.offsetHeight
);
camera.position.set(6, 4, -4);
camera.lookAt(scene.position);

// ----------------------------------------- GRID HELPER ----------------------------------------
const size = 20;
const divisions = 20;
const colorCenterLine = 0xffffff;
const colorGrid = 0xffffff;

const grid = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
grid.name = "grid";
scene.add(grid);

// ------------------------------------------ LIGHTNING -----------------------------------------
/*
	Light in 3D scene
	set(x,y,z)
		+x front
		+y up
		+z left
*/

// ---------------------------------- LIGHTNING CUSTOM: AMBIENT ---------------------------------
const ambientLight = new THREE.HemisphereLight(
	"white", // bright sky color
	"grey", // dim ground color
	0 // intensity
);
ambientLight.name = "ambientLight";
scene.add(ambientLight);

// -------------------------------- LIGHTNING CUSTOM: DIRECTIONAL -------------------------------
var dirLight = new THREE.DirectionalLight(0x404040, 0);
dirLight.name = "dirLight";
dirLight.position.set(100, 100, -10);
dirLight.castShadow = true;
scene.add(dirLight);

// --------------------------- LIGHTNING DEFAULT: FRONT ABOVE CENTER ----------------------------
const r = 20;
const light1 = new THREE.PointLight(0xffffff, 1, 0);
light1.name = "light1";
light1.position.set(r, r, 0);
light1.shadowMapVisible = true;
scene.add(light1);

// ----------------------------- LIGHTNING DEFAULT: BACK ABOVE LEFT -----------------------------
const light2 = new THREE.PointLight(0xffffff, 1, 0);
light2.name = "light2";
light2.position.set(-0.5 * r, r, 0.866 * r);
scene.add(light2);

// ---------------------------- LIGHTNING DEFAULT: BACK ABOVE RIGHT -----------------------------
const light3 = new THREE.PointLight(0xffffff, 1, 0);
light3.name = "light3";
light3.position.set(-0.5 * r, r, -0.866 * r);
scene.add(light3);

// --------------------------- LIGHTNING DEFAULT: CENTER BELOW CENTER ---------------------------
const light4 = new THREE.PointLight(0xffffff, 1, 0);
light4.name = "light4";
light4.position.set(0, -r, 0);
scene.add(light4);

// --------------------------- LIGHTNING DEFAULT: CENTER BELOW CENTER ---------------------------
const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setClearColor(0xff0000, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

// --------------------------------------- ORBIT CONTROLS ---------------------------------------
export const orbitControls = new OrbitControls(camera, renderer.domElement);

// --------------------------------------- 3D FILE LOADER ---------------------------------------
export const loader = new GLTFLoader();
loader.name = "loader";

let path = "files/" + "SR100C_v1.glb";

loader.load(
	path,
	function (gltf) {
		let file3D = gltf.scene;
		file3D.name = "file3D";
		scene.add(file3D);
		file3D.position.set(0, 0, 0);
	},
	undefined,
	function (error) {
		console.error(error);
	}
);

// ----------------------------------------- RENDER LOOP ----------------------------------------
renderer.setAnimationLoop(() => {
	orbitControls.update();

	renderer.render(scene, camera);
});

// ---------------------------------------- RESIZE CANVAS ---------------------------------------
myCanvas.style.width = window.innerWidth + "px";
myCanvas.style.height = window.innerHeight + "px";
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

window.addEventListener("resize", () => {
	myCanvas.style.width = window.innerWidth + "px";
	myCanvas.style.height = window.innerHeight + "px";
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});
