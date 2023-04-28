import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import img from './assets/dp-txt.png';
import { Clock } from 'three';


let camera, scene, renderer;
let controls;
let material;
let geometry;
let geometry2;
let boxes;
let clock;
let mesh;
let elements;


init();


function init() {
  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor('#7C52FF', 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;
  camera.position.x = 30;
  camera.position.y = 10;
  

  // Scene
  scene = new THREE.Scene();

    // Texture
    const texture = new THREE.TextureLoader().load(img, (texture)=>{
      texture.minFilter = THREE.NearestFilter;
    });

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

  // Geometry
 // geometry = new THREE.CylinderGeometry( 5, 5, 2, 32, 32, true ); 
 geometry = new THREE.SphereGeometry(10,50,50 ); 



 
  // Material
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: texture },
    },
    transparent: true,

    
  })
  
  mesh = new THREE.Mesh( geometry, material )
  scene.add(mesh)

 /*
  elements = [];
  for ( let i = 0; i < 6; i ++ ){

    elements[i] = new THREE.Mesh( geometry, material );
    elements[i].position.y = i/0.5
   
    scene.add( elements[i] );
    
    }
*/
  // Mesh

  elements = [];
  boxes = [];
  for ( let i = 0; i < 1000; i ++ ){


    boxes[i] = new THREE.Mesh( geometry, material );
    boxes[i].position.x = Math.random() * 500
    boxes[i].position.y = Math.random() * 500
    boxes[i].position.z = Math.random() * 500
    
   
    scene.add( elements[i], boxes[i] );
    
    }


  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Events
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

clock = new THREE.Clock()

function animate() {

  const elapsedTime = clock.getElapsedTime()
  controls.update();
  //elements[0].rotation.y += elapsedTime * 0.0005

  boxes.forEach((box) => box.rotation.y += 0.005 )


  //material.uniforms.uTime.value = elapsedTime
  renderer.render(scene, camera);
  
  requestAnimationFrame(animate);



 
  
}


animate();