import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'

const scene: THREE.Scene = new THREE.Scene()

const camera1: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 10)
const camera2: THREE.OrthographicCamera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 10)

const canvas1: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('c1')
const canvas2: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('c2')
const renderer1: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas1})
renderer1.setSize(200, 200)
const renderer2: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas2})
renderer2.setSize(200, 200)

const controls1 = new OrbitControls(camera1, canvas1)
const controls2 = new OrbitControls(camera2, canvas2)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

camera1.position.z = 2
camera2.position.z = 2

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
gui.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01)

var animate = function () {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls1.update()
    controls2.update()

    renderer1.render(scene, camera1)
    renderer2.render(scene, camera2)
    stats.update()
};

animate();