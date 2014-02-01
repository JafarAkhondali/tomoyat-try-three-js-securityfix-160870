(function() {
  var scene = new THREE.Scene();
  var geometry = new THREE.CubeGeometry(50, 50, 50);
  var material = new THREE.MeshLambertMaterial({ color: "red" });
  var cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.position.set(0, 100, 0);
  scene.add(cube);

  var pGeometry = new THREE.PlaneGeometry(300, 300);
  var pMaterial = new THREE.MeshLambertMaterial({ color: 0x0096d6, side: THREE.DoubleSide });
  pMaterial.side = THREE.DoubleSide;
  var plane = new THREE.Mesh(pGeometry, pMaterial);
  plane.receiveShadow = true;
  plane.position.set(0, 0, 0);
  plane.rotation.x = 90 * Math.PI / 180;
  scene.add(plane);


   // light
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0,200,30);
  light.castShadow = true;

  scene.add(light);
  var ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // camera
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(200, 300, 500);
  camera.lookAt(cube.position);

  //helper
  var axis = new THREE.AxisHelper(1000);
  axis.position.set(0,0,0);
  scene.add(axis);

  // rendering
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xeeeeee, 1);
  // shardow
  renderer.shadowMapEnabled = true;

  document.body.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, render.domElement);

  function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 1 * Math.PI / 180;
    cube.rotation.y += 1 * Math.PI / 180;
    cube.rotation.z += 1 * Math.PI / 180;
    cube.position.x = Math.sin(new Date().getTime() / 200) * 50;
    cube.position.z = Math.cos(new Date().getTime() / 200) * 50;
    renderer.render(scene, camera);
    controls.update();
  }

  render();
})();
