import { scene, camera, orbitControls } from "../script.js";
import * as THREE from "three";

let explode_button = document.querySelector(".explode-button");

explode_button.addEventListener("click", () => {
	explode_button.classList.toggle("active");
	if (explode_button.classList.contains("active")) {
		let obj = scene.getObjectByName("file3D").children;
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
		let obj = scene.getObjectByName("file3D").children;
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
