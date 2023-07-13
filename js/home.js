import { scene, camera, orbitControls } from "../script.js";
import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.139.2/examples/jsm/loaders/GLTFLoader.js";

// ---------------------------------------------------------------------------------------
// ----------------------------------- Const, Var, Let -----------------------------------
// ---------------------------------------------------------------------------------------

// ----------------------------------- Explode 3D File -----------------------------------
let explode_button = document.querySelector(".explode-button");

// ----------------------------------- dark/light mode -----------------------------------
const toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");

// -------------------------------------- lightning --------------------------------------
const menuLightning = document.querySelector(".menu-container-blue-lightning");
const lightning_expand = document.querySelector(
	".menu-container-blue-lightning-expand"
);
const lightning_title = document.querySelector(".lightning-title-2");
const opsi = lightning_title.querySelectorAll(".opsi");

const custom_lightning = document.querySelector(".custom-lightning");

const ambientLight = scene.getObjectByName("ambientLight");
const dirLight = scene.getObjectByName("dirLight");
const light1 = scene.getObjectByName("light1");
const light2 = scene.getObjectByName("light2");
const light3 = scene.getObjectByName("light3");
const light4 = scene.getObjectByName("light4");

// -------------------------------- slider env brightness --------------------------------
const slider_env = document.getElementById("slider-env");
const maxValue_env = slider_env.getAttribute("max");
let value_env;
const sliderFill_env = document.getElementById("fill-env");

// --------------------------------- slider lamp position --------------------------------
const slider_lamp_pos = document.getElementById("slider-lamp-pos");
const maxValue_lamp_pos = slider_lamp_pos.getAttribute("max");
let value_lamp_pos;
const sliderFill_lamp_pos = document.getElementById("fill-lamp-pos");

// ------------------------------- slider lamp brightness --------------------------------
const slider_lamp = document.getElementById("slider-lamp");
const maxValue_lamp = slider_lamp.getAttribute("max");
let value_lamp;
const sliderFill_lamp = document.getElementById("fill-lamp");

// -------------------------------------- catalogue --------------------------------------
const menuAlbum = document.querySelector(".menu-container-blue-album");
const catalogueContainer = document.getElementById("catalogue-container-2");
const catalogue_product_list = document.querySelectorAll(
	".catalogue-product-list-2"
);

let loader = new GLTFLoader();
loader.name = "loader";

// ------------------------------------- slider zoom -------------------------------------
const slider = document.getElementById("slider-zoom");
const maxValue = slider.getAttribute("max");
let value;
const sliderFill = document.getElementById("fill-zoom");

// ---------------------------------------- sound ----------------------------------------
const menuSound = document.querySelector(".menu-container-blue-sound");
const iconSoundOff = document.getElementById("sound-off");
const iconSoundOn = document.getElementById("sound-on");

// -------------------------------------- animation --------------------------------------
const menuAnimation = document.querySelector(".menu-container-blue-animation");
const iconAnimationOff = document.getElementById("animation-off");
const iconAnimationOn = document.getElementById("animation-on");

// ------------------------------------- information -------------------------------------
const menuInformation = document.querySelector(
	".menu-container-blue-information"
);
const informationContainer = document.getElementById("information-container");

// ---------------------------------------------------------------------------------------
// ------------------------------------- PROGRAM CODE ------------------------------------
// ---------------------------------------------------------------------------------------

// ----------------------------------- Explode 3D File -----------------------------------
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
if (getMode && getMode === "dark-theme") {
	document.body.classList.add("dark-theme");
	toggle.classList.add("active");

	scene.background = new THREE.Color(0x1d2538);

	scene.remove(scene.getObjectByName("grid"));

	const grid = new THREE.GridHelper(20, 20, 0x475b74, 0x475b74);
	grid.position.y = -1;
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
		grid.position.y = -1;
		grid.name = "grid";
		scene.add(grid);

		localStorage.setItem("mode", "dark-theme");
	} else {
		scene.background = new THREE.Color(0xdbe9e9);

		scene.remove(scene.getObjectByName("grid"));
		const grid = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
		grid.position.y = -1;
		grid.name = "grid";
		scene.add(grid);

		localStorage.setItem("mode", "light");
	}
});

// -------------------------------------- lightning --------------------------------------
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

window.addEventListener("resize", () => {
	if (custom_lightning.style.display == "flex") {
		if (window.innerWidth < 900) {
			lightning_expand.style.height = "230px";
		} else {
			lightning_expand.style.height = "190px";
		}
	}
});

// -------------------------------- slider env brightness --------------------------------
updateSliderEnv();
slider_env.addEventListener("input", () => {
	updateSliderEnv();
	updateEnvBrightness();
});

// --------------------------------- slider lamp position --------------------------------
updateSliderLampPos();
slider_lamp_pos.addEventListener("input", () => {
	updateSliderLampPos();
	updateLampPos();
});

// ------------------------------- slider lamp brightness --------------------------------
updateSliderLamp();
slider_lamp.addEventListener("input", () => {
	updateSliderLamp();
	updateLamp();
});

// -------------------------------------- catalogue --------------------------------------
menuAlbum.addEventListener("click", () => {
	menuAlbum.classList.toggle("active");

	if (menuAlbum.classList.contains("active")) {
		catalogueContainer.style.display = "flex";
	} else {
		catalogueContainer.style.display = "none";
	}
});

loadCatalogue(catalogue_product_list);

// ------------------------------------- slider zoom -------------------------------------
updateSlider();
updateZoomCamera();
slider.addEventListener("input", () => {
	updateSlider();
	updateZoomCamera();
});

// ---------------------------------------- sound ----------------------------------------
menuSound.addEventListener("click", () => {
	menuSound.classList.toggle("active");

	if (menuSound.classList.contains("active")) {
		iconSoundOff.style.display = "none";
		iconSoundOn.style.display = "block";
	} else {
		iconSoundOff.style.display = "block";
		iconSoundOn.style.display = "none";
	}
});

// -------------------------------------- animation --------------------------------------
menuAnimation.addEventListener("click", () => {
	menuAnimation.classList.toggle("active");

	if (menuAnimation.classList.contains("active")) {
		iconAnimationOff.style.display = "none";
		iconAnimationOn.style.display = "block";
		orbitControls.autoRotate = true;
	} else {
		iconAnimationOff.style.display = "block";
		iconAnimationOn.style.display = "none";
		orbitControls.autoRotate = false;
	}
});

// ------------------------------------- information -------------------------------------
menuInformation.addEventListener("click", () => {
	menuInformation.classList.toggle("active");

	if (menuInformation.classList.contains("active")) {
		informationContainer.style.display = "flex";
	} else {
		informationContainer.style.display = "none";
	}
});

// ---------------------------------------------------------------------------------------
// ---------------------------------- FUNCTION HELPER ------------------------------------
// ---------------------------------------------------------------------------------------
// -------------------------------------- lightning --------------------------------------
function resetOpsi() {
	opsi.forEach(function (opsi) {
		opsi.classList.remove("active");
	});
}

function updateLightning(opsi_text) {
	if (opsi_text === "custom") {
		custom_lightning.style.display = "flex";

		if (window.innerWidth < 900) {
			lightning_expand.style.height = "230px";
		}

		ambientLight.intensity = 0.5;
		dirLight.intensity = 20;

		light1.intensity = 0;
		light2.intensity = 0;
		light3.intensity = 0;
		light4.intensity = 0;

		slider_env.value = 0.5;
		updateSliderEnv();
		updateEnvBrightness();
		slider_lamp.value = 20;
		updateSliderLamp();
		updateLamp();
		slider_lamp_pos.value = 210;
		updateSliderLampPos();
		updateLampPos();
	} else {
		custom_lightning.style.display = "none";
		lightning_expand.style.height = "190px";

		ambientLight.intensity = 0;
		dirLight.intensity = 0;

		light1.intensity = 1;
		light2.intensity = 1;
		light3.intensity = 1;
		light4.intensity = 1;
	}
}

// -------------------------------- slider env brightness --------------------------------
function updateSliderEnv() {
	value_env = (slider_env.value / maxValue_env) * 100 + "%";
	sliderFill_env.style.width = value_env;
}

function updateEnvBrightness() {
	let ambient = scene.getObjectByName("ambientLight");
	ambient.intensity = slider_env.value;
}

// --------------------------------- slider lamp position --------------------------------
function updateSliderLampPos() {
	value_lamp_pos = (slider_lamp_pos.value / maxValue_lamp_pos) * 100 + "%";
	sliderFill_lamp_pos.style.width = value_lamp_pos;
}

function updateLampPos() {
	let lamp = scene.getObjectByName("dirLight");
	lamp.position.set(100, 100, -(slider_lamp_pos.value - 200));
}

// ------------------------------- slider lamp brightness --------------------------------
function updateSliderLamp() {
	value_lamp = (slider_lamp.value / maxValue_lamp) * 100 + "%";
	sliderFill_lamp.style.width = value_lamp;
}

function updateLamp() {
	let lamp = scene.getObjectByName("dirLight");
	lamp.intensity = slider_lamp.value;
}

// -------------------------------------- catalogue --------------------------------------
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
				file3D.position.set(0, -0.95, 0);
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
function updateZoomCamera() {
	camera.zoom = slider.value;
	camera.updateProjectionMatrix();
}

function updateSlider() {
	value = (slider.value / maxValue) * 100 + "%";
	sliderFill.style.width = value;
}

// pdf button
const pdf_button = document.querySelector(".menu-pdf");
const pdf_pop_up = document.querySelector(".container-full-screen-pdf");

pdf_button.addEventListener("click", () => {
	pdf_pop_up.classList.toggle("active");
});

pdf_pop_up.addEventListener("click", function (e) {
	if (!document.getElementById("pdf-pop-up-container").contains(e.target)) {
		if (pdf_pop_up.classList.contains("active")) {
			pdf_pop_up.classList.remove("active");
		}
	}
});

// video button
const video_button = document.querySelector(".menu-video");
const video_pop_up = document.querySelector(".container-full-screen-video");
const video = document.getElementById("video");

video_button.addEventListener("click", () => {
	video_pop_up.classList.toggle("active");
});

video_pop_up.addEventListener("click", function (e) {
	if (
		!document.getElementById("pdf-pop-up-container-video").contains(e.target)
	) {
		if (video_pop_up.classList.contains("active")) {
			video_pop_up.classList.remove("active");
			video.pause();
			video.currentTime = 0;
		}
	}
});
