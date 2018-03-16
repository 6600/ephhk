$(document).ready(function(){
  var scene, camera, renderer, threejs
  let geometry1, surface2
  let surface1, surface4, surface5, surface6
  let axis1, axis2, axis3, axis4, axis5, axis6
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
    camera.position.set(-2, 2, 6)
    // 指定它看着原点方向
    camera.lookAt(scene.position)
    // 给场景追加相机
    scene.add(camera);

    // 平面区域
    var geometry = new THREE.PlaneGeometry( 1, 1);
    // 随机生成颜色
    color = Math.random() * 0xffffff;
    var material = new THREE.MeshLambertMaterial({
      ambient: color,
      color: color,
      transparent: true
    })
    mesh = new THREE.Mesh(geometry, material);
    // 设置平面位置
    mesh.position.set(0, 0, 0)
    // 设置平面角度
    mesh.rotation.set(0, 0, 0);
    mesh.rotation.y = de2ra(0);
    // 设置平面缩放
    mesh.scale.set(1, 1, 1);
    mesh.doubleSided = true;
    mesh.castShadow = true
    // 给场景中添加立方体
    scene.add(mesh)
    //--------------------------------------------
    axis1 = new THREE.Object3D()
    axis1.position.set(-1, 0, 0)
    scene.add(axis1)
    // 平面区域
    var geometry = new THREE.PlaneGeometry( 1, 1);
    // 随机生成颜色
    color = Math.random() * 0xffffff;
    var material = new THREE.MeshLambertMaterial({
      ambient: color,
      color: color,
      transparent: true
    })
    surface1 = new THREE.Mesh(geometry, material);
    // 设置平面位置
    surface1.position.set(-1.5, 0, 0)
    // 设置平面角度
    surface1.rotation.set(0, 0, 0);
    surface1.rotation.y = de2ra(0);
    // 设置平面缩放
    surface1.scale.set(1, 1, 1);
    surface1.doubleSided = true;
    surface1.castShadow = true
    // 给场景中添加立方体
    scene.add(surface1)
    axis1.add(surface1)
    // axis1.add(new THREE.AxisHelper(50))
    // ------------------- 立方体区域 ------------------- //
    axis2 = new THREE.Object3D()
    axis2.position.set(-0.5, 0, 0)
    scene.add(axis2)
    // 平面区域
    var geometry = new THREE.PlaneGeometry( 1, 1)
    // 随机生成颜色
    color = Math.random() * 0xffffff;
    var material = new THREE.MeshLambertMaterial({
      ambient: color,
      color: color,
      transparent: true
    })
    surface2 = new THREE.Mesh(geometry, material);
    // 设置平面位置
    surface2.position.set(-0.5, 0, 0)
    // 设置平面角度
    surface2.rotation.set(0, 0, 0);
    surface2.rotation.y = de2ra(0);
    // 设置平面缩放
    surface2.scale.set(1, 1, 1);
    surface2.doubleSided = true;
    surface2.castShadow = true
    // 给场景中添加立方体
    scene.add(surface2)
    axis2.add(surface2)
    axis2.add(surface1)
    // axis2.add(new THREE.AxisHelper(50))
    //--------------------------------------------
    // 平面区域
    axis4 = new THREE.Object3D()
    axis4.position.set(0.5, 0, 0)
    scene.add(axis4)
    var geometry = new THREE.PlaneGeometry( 1, 1);
    // 随机生成颜色
    color = Math.random() * 0xffffff;
    var material = new THREE.MeshLambertMaterial({
      ambient: color,
      color: color,
      transparent: true
    })
    surface4 = new THREE.Mesh(geometry, material);
    // 设置平面位置
    surface4.position.set(0.5, 0, 0)
    // 设置平面角度
    surface4.rotation.set(0, 0, 0);
    surface4.rotation.y = de2ra(0);
    // 设置平面缩放
    surface4.scale.set(1, 1, 1);
    surface4.doubleSided = true;
    surface4.castShadow = true
    // 给场景中添加立方体
    scene.add(surface4)
    axis4.add(surface4)
    // axis4.add(new THREE.AxisHelper(50))

    //--------------------------------------------
    // 平面区域 盒子上部
    axis5 = new THREE.Object3D()
    axis5.position.set(0, 0.5, 0)
    scene.add(axis5)
    var geometry = new THREE.PlaneGeometry( 1, 1);
    // 随机生成颜色
    color = Math.random() * 0xffffff;
    var material = new THREE.MeshLambertMaterial({
      ambient: color,
      color: color,
      transparent: true
    })
    surface5 = new THREE.Mesh(geometry, material);
    // 设置平面位置
    surface5.position.set(0, 0.5, 0)
    // 设置平面角度
    surface5.rotation.set(0, 0, 0);
    surface5.rotation.y = de2ra(0);
    // 设置平面缩放
    surface5.scale.set(1, 1, 1);
    surface5.doubleSided = true;
    surface5.castShadow = true
    // 给场景中添加立方体
    scene.add(surface5)
    axis5.add(surface5)
    //--------------------------------------------
    axis6 = new THREE.Object3D()
    axis6.position.set(0, -0.5, 0)
    scene.add(axis6);
    // 平面区域 盒子右面
    var geometry = new THREE.PlaneGeometry( 1, 1)
    // 随机生成颜色
    color = Math.random() * 0xffffff
    var material = new THREE.MeshLambertMaterial({
      ambient: color,
      color: color,
      transparent: true
    })
    surface6 = new THREE.Mesh(geometry, material);
    // 设置平面位置
    surface6.position.set(0, -0.5, 0)
    // 设置平面角度
    surface6.rotation.set(0, 0, 0);
    surface6.rotation.y = de2ra(0);
    // 设置平面缩放
    surface6.scale.set(1, 1, 1);
    surface6.doubleSided = true;
    surface6.castShadow = true
    // 给场景中添加立方体
    scene.add(surface6)
    axis6.add(surface6)
    // axis6.add(new THREE.AxisHelper(50))

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

  }

  function animate() {
    if (lalal()) {
      requestAnimationFrame(animate)
      renderScene();
    }
  }

  function test () {
    axis2.rotation.y -= (Math.PI / 180)
    return true
  }

  function lalal () {
    if (axis4.rotation.y < 90 * (Math.PI / 180)) {
      
      // // 盒子左面
      // surface1.rotation.y -= (Math.PI / 180)
      // surface1.position.x += 1.5 / 90
      // surface1.position.z -= 1.5 / 90
      // 盒子左1
      axis2.rotation.y -= (Math.PI / 180)
      // // 盒子下部
      axis6.rotation.x += (Math.PI / 180)
      // 盒子右部
      axis4.rotation.y += (Math.PI / 180)
      // 盒子上部
      axis5.rotation.x -= (Math.PI / 180)
      return true
    } else if(surface1.rotation.y > -180 * (Math.PI / 180)) {
      // 盒子左面
      surface1.rotation.y -= (Math.PI / 180)
      surface1.position.x += 1.5 / 90
      surface1.position.z -= 1.5 / 90
      return true
    } else {
      return false
    }
  }
  function renderScene(){
    renderer.render(scene, camera);
  }
})