import { scene, camera, orbitControls } from "../script.js";
import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js";

// explode 3D file
let explode_button = document.querySelector(".explode-button");

explode_button.addEventListener("click", () => {
	explode_button.classList.toggle("active");

	let obj = scene.getObjectByName("file3D").children;
	if (explode_button.classList.contains("active")) {
		obj.forEach((child) => {
			let target = new THREE.Vector3();
			child.getWorldPosition(target);
			target.normalize();
			target.setX(target.x + child.position.x);
			target.setY(target.y + child.position.y);
			target.setZ(target.z + child.position.z);
			gsap.to(child.position, {
				duration: 1,
				x: target.x,
			});
			gsap.to(child.position, {
				duration: 1,
				y: target.y,
			});
			gsap.to(child.position, {
				duration: 1,
				z: target.z,
			});
		});
	} else {
		obj.forEach((child) => {
			let target = new THREE.Vector3();
			child.getWorldPosition(target);
			target.normalize();
			target.setX(child.position.x - target.x);
			target.setY(child.position.y - target.y);
			target.setZ(child.position.z - target.z);
			gsap.to(child.position, {
				duration: 1,
				x: target.x,
			});
			gsap.to(child.position, {
				duration: 1,
				y: target.y,
			});
			gsap.to(child.position, {
				duration: 1,
				z: target.z,
			});
		});
	}
});

// ----------------------------------- dark/light mode -----------------------------------
const toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");

// ----------------------------------- dark/light mode -----------------------------------
if (getMode && getMode === "dark-theme") {
	document.body.classList.add("dark-theme");
	toggle.classList.add("active");

	scene.background = new THREE.Color(0x1d2538);

	scene.remove(scene.getObjectByName("grid"));

	const grid = new THREE.GridHelper(20, 20, 0x475b74, 0x475b74);
	grid.name = "grid";
	scene.add(grid);

	localStorage.setItem("mode", "dark-theme");
}

toggle.addEventListener("click", () => toggle.classList.toggle("active"));

toggle.addEventListener("click", () => {
	document.body.classList.toggle("dark-theme");

	if (document.body.classList.contains("dark-theme")) {
		scene.background = new THREE.Color(0x1d2538);

		scene.remove(scene.getObjectByName("grid"));

		const grid = new THREE.GridHelper(20, 20, 0x475b74, 0x475b74);
		grid.name = "grid";
		scene.add(grid);

		localStorage.setItem("mode", "dark-theme");
	} else {
		scene.background = new THREE.Color(0xdbe9e9);

		scene.remove(scene.getObjectByName("grid"));
		const grid = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
		grid.name = "grid";
		scene.add(grid);

		localStorage.setItem("mode", "light");
	}
});

// -------------------------------------- lightning --------------------------------------
const menuLightning = document.querySelector(".menu-container-blue-lightning");
const lightning_expand = document.querySelector(
	".menu-container-blue-lightning-expand"
);
const lightning_title = document.querySelector(".lightning-title");
const opsi = lightning_title.querySelectorAll(".opsi");

const custom_lightning = document.querySelector(".custom-lightning");

menuLightning.addEventListener("click", () => {
	menuLightning.classList.toggle("active");

	if (menuLightning.classList.contains("active")) {
		lightning_expand.style.display = "block";
	} else {
		lightning_expand.style.display = "none";
	}
});

opsi.forEach(function (opsi) {
	opsi.addEventListener("click", () => {
		resetOpsi();
		opsi.classList.toggle("active");

		if (opsi.classList.contains("active")) {
			let opsi_text = opsi.innerText;
			updateLightning(opsi_text);
		}
	});
});

function resetOpsi() {
	opsi.forEach(function (opsi) {
		opsi.classList.remove("active");
	});
}

const ambientLight = scene.getObjectByName("ambientLight");
const dirLight = scene.getObjectByName("dirLight");
const light1 = scene.getObjectByName("light1");
const light2 = scene.getObjectByName("light2");
const light3 = scene.getObjectByName("light3");
const light4 = scene.getObjectByName("light4");

function updateLightning(opsi_text) {
	if (opsi_text === "custom") {
		custom_lightning.style.display = "flex";

		ambientLight.intensity = 0.3;
		dirLight.intensity = 25;

		light1.intensity = 0;
		light2.intensity = 0;
		light3.intensity = 0;
		light4.intensity = 0;
	} else {
		custom_lightning.style.display = "none";

		ambientLight.intensity = 0;
		dirLight.intensity = 0;

		light1.intensity = 1;
		light2.intensity = 1;
		light3.intensity = 1;
		light4.intensity = 1;
	}
}

// -------------------------------------- catalogue --------------------------------------
const menuAlbum = document.querySelector(".menu-container-blue-album");
const catalogueContainer = document.getElementById("catalogue-container-2");
const catalogue_product_list = document.querySelectorAll(
	".catalogue-product-list-2"
);

// ---------------------------- resize canvas width responsive ---------------------------
let loader = new GLTFLoader();
loader.name = "loader";

menuAlbum.addEventListener("click", () => {
	menuAlbum.classList.toggle("active");

	if (menuAlbum.classList.contains("active")) {
		catalogueContainer.style.display = "flex";
	} else {
		catalogueContainer.style.display = "none";
	}
});

loadCatalogue(catalogue_product_list);

function loadCatalogue(catalogue_product_list) {
	catalogue_product_list.forEach(function (product_list) {
		product_list.addEventListener("click", () => {
			resetCatalogueSelect();
			product_list.classList.toggle("active");

			let product_list_text = product_list.querySelector(
				".catalogue-product-list-text-2"
			).innerText;
			explode_button.classList.remove("active");
			updateFile3D(product_list_text);
		});

		if (product_list.classList.contains("active")) {
			let product_list_text = product_list.querySelector(
				".catalogue-product-list-text-2"
			).innerText;
			explode_button.classList.remove("active");
			updateFile3D(product_list_text);
		}
	});
}

function resetCatalogueSelect() {
	catalogue_product_list.forEach(function (product_list) {
		product_list.classList.remove("active");
	});
}

function updateFile3D(file_name) {
	try {
		let file3D = scene.getObjectByName("file3D");
		file3D.name = "file3D";

		scene.remove(file3D);
		let newFile3D = `files/${file_name}.glb`;

		loader.load(
			newFile3D,
			function (gltf) {
				file3D = gltf.scene;
				file3D.name = "file3D";
				scene.add(file3D);
				file3D.position.set(0, -1, 0);
			},
			undefined,
			function (error) {
				console.error(error);
			}
		);
	} catch (e) {
		// do nothing
	}
}

// ------------------------------------- slider zoom -------------------------------------
const slider = document.getElementById("slider-zoom");
const maxValue = slider.getAttribute("max");
let value;
const sliderFill = document.getElementById("fill-zoom");

updateSlider();
updateZoomCamera();
slider.addEventListener("input", () => {
	updateSlider();
	updateZoomCamera();
});

function updateZoomCamera() {
	camera.zoom = slider.value;
	camera.updateProjectionMatrix();
}

function updateSlider() {
	value = (slider.value / maxValue) * 100 + "%";
	sliderFill.style.width = value;
}
