(function() {
  var scene = new THREE.Scene();

  // create the particle variables
  var particleCount = 1000;
  var particles = new THREE.Geometry();
  // create the particle variables
  var pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture(
      "img/particle.png"
    ),
    blending: THREE.AdditiveBlending,
    transparent: true
  });

  // now create the individual particles
  for (var p = 0; p < particleCount; p++) {

    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 300 - 150;
    var pY = Math.random() * 300 - 150;
    var pZ = Math.random() * 300 - 150;
    var particle = new THREE.Vector3(pX, pY, pZ);

    // add it to the geometry
    particles.vertices.push(particle);
  }

  // create the particle system
  var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial
  );

  particleSystem.sortParticles = true; // the default is false

  // add it to the scene
  scene.add(particleSystem);


  // plane
  var pGeometry = new THREE.PlaneGeometry(300, 300);
  var pMaterial = new THREE.MeshLambertMaterial({ color: 0x0096d6, side: THREE.DoubleSide });
  pMaterial.side = THREE.DoubleSide;
  var plane = new THREE.Mesh(pGeometry, pMaterial);
  plane.receiveShadow = true;
  plane.position.set(0, 0, 0);
  plane.rotation.x = 90 * Math.PI / 180;
//  scene.add(plane);


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
  camera.lookAt(0, 0, 0);

  //helper
  var axis = new THREE.AxisHelper(1000);
  axis.position.set(0,0,0);
  scene.add(axis);

  // rendering
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x222222, 1);
  // shardow
  renderer.shadowMapEnabled = true;

  document.body.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, render.domElement);
  renderer.render(scene, camera);
  function render() {
    for (var i=0; i<particleCount; i++) {
      var tparticle = particles.vertices[i];
      tparticle.x += Math.sin(new Date().getTime() / 200) * (Math.random() * 6 - 3);
      tparticle.z += Math.cos(new Date().getTime() / 200) * (Math.random() * 6 - 3);
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
  }

  render();
})();
