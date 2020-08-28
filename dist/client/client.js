import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader';
import Stats from '/jsm/libs/stats.module';
import { GUI } from '/jsm/libs/dat.gui.module';
import { TWEEN } from '/jsm/libs/tween.module.min';
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
var light1 = new THREE.PointLight(); //new THREE.SpotLight();
light1.position.set(2.5, 5, 2.5);
// light1.angle = Math.PI / 8
// light1.penumbra = 0.5
// light1.castShadow = true;
// light1.shadow.mapSize.width = 1024;
// light1.shadow.mapSize.height = 1024;
// light1.shadow.camera.near = 0.5;
// light1.shadow.camera.far = 20
scene.add(light1);
var light2 = new THREE.PointLight(); //new THREE.SpotLight();
light2.position.set(-2.5, 5, 2.5);
// light2.angle = Math.PI / 8
// light2.penumbra = 0.5
// light2.castShadow = true;
// light2.shadow.mapSize.width = 1024;
// light2.shadow.mapSize.height = 1024;
// light2.shadow.camera.near = 0.5;
// light2.shadow.camera.far = 20
scene.add(light2);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(0.8, 1.4, 1.0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = true;
controls.target.set(0, 1, 0);
// let sceneMeshes = []
// const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(25, 25)
// const texture = new THREE.TextureLoader().load("img/grid.png")
// const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ map: texture }))
// plane.rotateX(-Math.PI / 2)
// plane.receiveShadow = true
// scene.add(plane)
// sceneMeshes.push(plane)
let mixer;
let modelReady = false;
//let modelMesh: THREE.Object3D
let animationActions = [];
let activeAction;
let lastAction;
const gltfLoader = new GLTFLoader();
gltfLoader.load('models/vanguard.glb', (gltf) => {
    // gltf.scene.traverse(function (child) {
    //     if ((<THREE.Mesh>child).isMesh) {
    //         let m = <THREE.Mesh>child
    //         m.castShadow = true
    //         //m.frustumCulled = false;
    //         //m.geometry.computeVertexNormals()
    //     }
    // })
    mixer = new THREE.AnimationMixer(gltf.scene);
    let animationAction = mixer.clipAction(gltf.animations[0]);
    animationActions.push(animationAction);
    animationsFolder.add(animations, "default");
    activeAction = animationActions[0];
    scene.add(gltf.scene);
    //modelMesh = gltf.scene
    //add an animation from another file
    gltfLoader.load('models/vanguard@samba.glb', (gltf) => {
        console.log("loaded samba");
        let animationAction = mixer.clipAction(gltf.animations[0]);
        animationActions.push(animationAction);
        animationsFolder.add(animations, "samba");
        //add an animation from another file
        gltfLoader.load('models/vanguard@bellydance.glb', (gltf) => {
            console.log("loaded bellydance");
            let animationAction = mixer.clipAction(gltf.animations[0]);
            animationActions.push(animationAction);
            animationsFolder.add(animations, "bellydance");
            //add an animation from another file
            gltfLoader.load('models/vanguard@goofyrunning.glb', (gltf) => {
                console.log("loaded goofyrunning");
                gltf.animations[0].tracks.shift(); //delete the specific track that moves the object forward while running
                let animationAction = mixer.clipAction(gltf.animations[0]);
                animationActions.push(animationAction);
                animationsFolder.add(animations, "goofyrunning");
                modelReady = true;
            }, (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            }, (error) => {
                console.log(error);
            });
        }, (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }, (error) => {
            console.log(error);
        });
    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
        console.log(error);
    });
}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, (error) => {
    console.log(error);
});
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
// const raycaster = new THREE.Raycaster();
// //const targetQuaternion = new THREE.Quaternion()
// renderer.domElement.addEventListener('dblclick', onDoubleClick, false);
// function onDoubleClick(event) {
//     const mouse = {
//         x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
//         y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
//     }
//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(sceneMeshes, false);
//     if (intersects.length > 0) {
//         const p = intersects[0].point
//         //const distance = modelMesh.position.distanceTo(p);
//         // const rotationMatrix = new THREE.Matrix4();
//         // rotationMatrix.lookAt(p, modelMesh.position, modelMesh.up);
//         // targetQuaternion.setFromRotationMatrix(rotationMatrix);
//         // setAction(animationActions[3])
//         //TWEEN.removeAll()
//         new TWEEN.Tween(modelMesh.position)
//             .to({
//                 x: p.x,
//                 y: p.y,
//                 z: p.z
//             }, 1000 ) /// 2 * distance) //walks 2 meters a second * the distance
//             // .onUpdate(() => {
//             //     controls.target.set(
//             //         modelMesh.position.x,
//             //         modelMesh.position.y + 1,
//             //         modelMesh.position.z)
//             //     light1.target = modelMesh;
//             //     light2.target = modelMesh;
//             // })
//             .start()
//             //.onComplete(() => setAction(animationActions[2]))
//     }
// }
const stats = Stats();
document.body.appendChild(stats.dom);
var animations = {
    default: function () {
        setAction(animationActions[0]);
    },
    samba: function () {
        setAction(animationActions[1]);
    },
    bellydance: function () {
        setAction(animationActions[2]);
    },
    goofyrunning: function () {
        setAction(animationActions[3]);
    },
};
const setAction = (toAction) => {
    if (toAction != activeAction) {
        lastAction = activeAction;
        activeAction = toAction;
        //lastAction.stop()
        lastAction.fadeOut(.2);
        activeAction.reset();
        activeAction.fadeIn(.2);
        activeAction.play();
    }
};
const gui = new GUI();
const animationsFolder = gui.addFolder("Animations");
animationsFolder.open();
const clock = new THREE.Clock();
var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    if (modelReady) {
        mixer.update(clock.getDelta());
        // if (!modelMesh.quaternion.equals(targetQuaternion)) {
        //     modelMesh.quaternion.rotateTowards(targetQuaternion, clock.getDelta() * 1000);
        // }
    }
    TWEEN.update();
    render();
    stats.update();
};
function render() {
    renderer.render(scene, camera);
}
animate();
