const myCanvas = document.querySelector("#myCanvas");
// var myText = document.getElementById("myText").textContent;

import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js";

// Creating a scene with background color
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1d2538);
// 0xdbe9e9 = light blue
// 0xe0e4e7 = light gray

// Plane geometry as a ground
const geometry = new THREE.PlaneGeometry(20, 20, 8, 8);
const material = new THREE.MeshBasicMaterial({
	color: 0x4f5354,
	side: THREE.DoubleSide,
	transparent: true,
	opacity: 0,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotateX(-Math.PI / 2);
scene.add(plane);

export const camera = new THREE.PerspectiveCamera(
	50,
	myCanvas.offsetWidth / myCanvas.offsetHeight
);

// create grid helper
const size = 20;
const divisions = 20;
const colorCenterLine = 0x475b74;
const colorGrid = 0x475b74;

const grid = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
grid.name = "grid";
scene.add(grid);

/*
	Light in 3D scene
	set(x,y,z)
		+x front
		+y up
		+z left
*/

const ambientLight = new THREE.HemisphereLight(
	"white", // bright sky color
	"grey", // dim ground color
	1 // intensity
);
ambientLight.name = "ambientLight";
scene.add(ambientLight);

var dirLight = new THREE.DirectionalLight(0x404040, 2);
dirLight.name = "dirLight";
dirLight.position.set(100, 100, 100);

dirLight.castShadow = true;

scene.add(dirLight);

// Camera position
camera.position.set(6, 4, -4);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

export const orbitControls = new OrbitControls(camera, renderer.domElement);

export const loader = new GLTFLoader();
loader.name = "loader";

let path = "files/" + "SR100C_v1.glb";

loader.load(
	path,
	function (gltf) {
		let file3D = gltf.scene;
		file3D.name = "file3D";
		scene.add(file3D);
		file3D.position.set(0, -1, 0);
	},
	undefined,
	function (error) {
		console.error(error);
	}
);

renderer.setAnimationLoop(() => {
	orbitControls.update();

	renderer.render(scene, camera);
});

// Resize canvas
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
