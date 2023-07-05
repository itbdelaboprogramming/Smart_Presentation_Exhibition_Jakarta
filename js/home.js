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
