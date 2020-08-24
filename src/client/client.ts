import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const canvas1: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('c1')
const canvas2: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('c2')
const renderer1: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas1})
renderer1.setSize(200, 200)
const renderer2: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas2})
renderer2.setSize(200, 200)

const controls1 = new OrbitControls(camera, canvas1)
const controls2 = new OrbitControls(camera, canvas2)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 2

var animate = function () {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls1.update()
    controls2.update()

    renderer1.render(scene, camera)
    renderer2.render(scene, camera)
};

animate();