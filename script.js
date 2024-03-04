window.addEventListener("DOMContentLoaded", init);

function init() {
  const width = 960;
  const height = 540;
  
  // レンダラーを作成
  const canvasElement = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvasElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  // シーンを作成
  const scene = new THREE.Scene();
  
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  
  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.enableZoom = true;
  
  // 環境光源を作成
  const ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.intensity = 0.5;
  scene.add(ambientLight);
  
  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.intensity = 1;
  directionalLight.position.set(1, 3, 1);
  scene.add(directionalLight);
  
  // 3Dモデルの読み込み
  const objLoader = new THREE.OBJLoader();
  objLoader.load(
    'aaa.obj',
    function (obj) {
      scene.add(obj);
      // obj.position.x = -50;
      // obj.position.y = -100;
    },
    );
    

    window.addEventListener('wheel', onDocumentMouseWheel);
    tick();
   

      function onDocumentMouseWheel(event) {
        const delta = event.deltaY;
        console.log(delta);
        let z;
        z = 100 + delta;  //ここを修正中
        const scrollSpeed = 0.1;
        
        // スクロール量に基づいてカメラの z 座標を変更
        camera.position.z += delta * scrollSpeed;
        
        // カメラの z 座標がある範囲内に収まるように制限
        const minZ = 200;
        const maxZ = 800;
        camera.position.z = Math.max(minZ, Math.min(maxZ, camera.position.z));
        
        controls.update();
        return z;
      }

      console.log(z);

      function tick() {
        let z;
        controls.update();
        camera.position.set(0, 0,100);
        // camera.lookAt(new THREE.Vector3(0,0,0));
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
      }
}