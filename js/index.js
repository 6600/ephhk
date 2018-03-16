$(document).ready(function(){
  var scene, camera, renderer, threejs;
  var gui = null;
  // 渲染器大小配置
  const WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

  var mesh, color;

  var de2ra = function(degree) { return degree*(Math.PI/180);};

  init();
  animate();

  function init() {
    // 获取DOM容器
    threejs = document.getElementById('threejs')
    // 创建场景
    scene = new THREE.Scene();
    // 配置渲染器
    renderer = new THREE.WebGLRenderer({ antialias:true })
    // 设置渲染器大小
    renderer.setSize(WIDTH, HEIGHT)
    // 设置canvas背景色(clearColor)和背景色透明度（clearAlpha）
    renderer.setClearColor(0x333F47, 1)
    // 添加阴影
    renderer.shadowMapEnabled = true
    // 添加软阴影
    renderer.shadowMapSoft = true;
    // 将渲染DOM追加到页面上
    threejs.appendChild(renderer.domElement);
    // 配置 透视 相机
    // PerspectiveCamera(fov, aspect, near, far)
    // Fov – 相机的视锥体的垂直视野角
    // Aspect – 相机视锥体的长宽比
    // Near – 相机视锥体的近平面
    // Far – 相机视锥体的远平面
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1 , 1000)
    // 设置相机位置
    camera.position.set(0, 6, 6)
    // 指定它看着原点方向
    camera.lookAt(scene.position)
    // 给场景追加相机
    scene.add(camera);

    // 立方体区域
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    // 随机生成颜色
    color = Math.random() * 0xffffff;
    var material = new THREE.MeshLambertMaterial({
      ambient: color,
      color: color,
      transparent: true
    })
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.rotation.y = de2ra(-90);
    mesh.scale.set(1, 1, 1);
    mesh.doubleSided = true;
    mesh.castShadow = true
    // 给场景中添加立方体
    scene.add(mesh);

    // --------------------- 方向光源 --------------------- //
    var object3d  = new THREE.DirectionalLight('white', 0.15);
    object3d.position.set(6,3,9);
    object3d.name = 'Back light';
    scene.add(object3d);
    
    object3d = new THREE.DirectionalLight('white', 0.35);
    object3d.position.set(-6, -3, 0);
    object3d.name   = 'Key light';
    scene.add(object3d);

    object3d = new THREE.DirectionalLight('white', 0.55);
    object3d.position.set(9, 9, 6);
    object3d.name = 'Fill light';
    scene.add(object3d);
    // --------------------- 聚光灯 --------------------- //
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 3, 30, 3 );
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapHeight = 2048;
    spotLight.shadowCameraNear = 1;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 45;
    scene.add( spotLight );

    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    window.addEventListener( 'resize', onWindowResize, false );

    var controller = new function() {
      this.scaleX = 1;
      this.scaleY = 1;
      this.scaleZ = 1;
      this.positionX = 0;
      this.positionY = 0;
      this.positionZ = 0;
      this.rotationX = 0;
      this.rotationY = 90;
      this.rotationZ = 0;
      this.boxColor = color;
      this.castShadow = true;
      this.boxOpacity = 1;
    }();

    var gui = new dat.GUI();
    var f1 = gui.addFolder('Scale');
    f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
       mesh.scale.x = (controller.scaleX);
    });
    f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
       mesh.scale.y = (controller.scaleY);
    });
    f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
       mesh.scale.z = (controller.scaleZ);
    });

    var f2 = gui.addFolder('Position');
    f2.add(controller, 'positionX', -5, 5).onChange( function() {
       mesh.position.x = (controller.positionX);
    });
    f2.add(controller, 'positionY', -3, 5).onChange( function() {
       mesh.position.y = (controller.positionY);
    });
    f2.add(controller, 'positionZ', -5, 5).onChange( function() {
       mesh.position.z = (controller.positionZ);
    });

    var f3 = gui.addFolder('Rotation');
    f3.add(controller, 'rotationX', -180, 180).onChange( function() {
       mesh.rotation.x = de2ra(controller.rotationX);
    });
    f3.add(controller, 'rotationY', -180, 180).onChange( function() {
       mesh.rotation.y = de2ra(controller.rotationY);
    });
    f3.add(controller, 'rotationZ', -180, 180).onChange( function() {
       mesh.rotation.z = de2ra(controller.rotationZ);
    });
    gui.addColor( controller, 'boxColor', color ).onChange( function() {
      mesh.material.color.setHex( dec2hex(controller.boxColor) );
    });
    gui.add( controller, 'castShadow', false ).onChange( function() {
      mesh.castShadow = controller.castShadow;
    });
    gui.add( controller, 'boxOpacity', 0.1, 1 ).onChange( function() {
      material.opacity = (controller.boxOpacity);
  } );
  }

  function dec2hex(i) {
    var result = "0x000000";
    if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
    else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
    else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
    else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
    else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
    else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8){return result;}
   
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderScene();
  }

  function renderScene(){
    renderer.render(scene, camera);
  }
});