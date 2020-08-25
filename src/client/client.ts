import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 10)
camera.position.z = 2

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('c1')

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(200, 200)

const controls = new OrbitControls(camera, canvas)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01)
cubeFolder.open()
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10, 0.01)
cubePositionFolder.add(cube.position, 'y', -10, 10, 0.01)
cubePositionFolder.add(cube.position, 'z', -10, 10, 0.01)
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', 0.01, 5, 0.01)
cubeScaleFolder.add(cube.scale, 'y', 0.01, 5, 0.01)
cubeScaleFolder.add(cube.scale, 'z', 0.01, 5, 0.01)
const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, 'z', 0, 10, 0.01)
cubeFolder.open()

var animate = function () {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update()
    renderer.render(scene, camera)
    stats.update()
};

animate();