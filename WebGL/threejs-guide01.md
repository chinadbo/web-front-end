# 入门ThreeJs

## 三大组件
在threejs中，要渲染物体到网页中，需要三大组件：场景（scene）、相机（camera）、和渲染器（renderer）

1. 场景
    场景就是所容物体的容器，通过new对象生成

    `var scene = new THREE.Scene()`

2. 相机
    相机决定了场景中哪个角度的景色显示出来，如眼睛一样。场景只有一种，但相机有多种：
    * 透视相机（THREE.PerspectiveCamera）
3. 渲染器
    渲染器决定渲染的结果应该以怎样的方式绘制在页面的什么元素上面

    `var renderer = new THREE.WebGLRenderer()`

    `renderer.setSize(window.innerWidth, window.innerHeight)`

    `document.body.appendChild(renderer.domElement)`

    domElement元素表示渲染器中的画布，所有的渲染都画在domElement上

根据场景、相机、渲染器构建的代码如下：

```javascript
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
```

## 渲染

1. 添加物体到场景中

        var geometry = new THREE.CubeGeometry(1,1,1)
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00})
        var cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

    THREE.CubeGeometry是一个几何体，三个参数分别代表长宽高

2. 渲染
    渲染使用渲染器，结合相机和场景渲染出画面

    `renderer(scene, camera, renderTarget, forceClear)`

    - scene： 已定义的场景
    - camera： 已定义的相机
    - renderTarget： 渲染的目标，默认是已定义的render变量中
    - forceClear： 每次绘制之前都将画布的内容清除

3. 渲染循环
    * 离线渲染
    * 实时渲染： 不停的对画面进行渲染

        requestAnimationFrame函数让浏览器去执行一次参数中的函数，通过上面render中调用requestAnimationFrame（）函数，requestAnimationFrame函数又让render在执行一次，形成 *游戏循环*

        ```
        function render() {
            cube.rotation.x += 0.1
            cube.rotation.y += 0.1
            renderer.render(scene, camera)
            requestAnimationFrame(render)
        }
        ```


## 分离功能

```
var renderer
function initThree() {
    width = doucment.getElementById('canvas').clientWidth
    height = doucment.getElementById('canvas').clientHeight
    renderer = new THREE.WebGLRenderer({
        antialias: true
        })
    renderer.setSize(width, height)
    document.getElementById('canvas').appendChild(renderer.domElement)
    renderer.setClearColor(0xFFFFFF, 1.0)
}
var camera
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000)
    camera.position.x = 0
    camera.position.y = 1000
    camera.position.z = 0
    camera.up.x = 0
    camera.up.y = 0
    camera.up.z = 1
    camera.lookAt({
        x: 0,
        y: 0,
        z: 0
        })
}

var scene
function initScene(){
    scene = new THREE.Scene()
}

var light
function initLight(){
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0)
    light.position.set(100,100,200)
    scene.add(light.position.set(100,100,200)
}

var cube
function initObject(){
    var geometry = new THREE.Geometry()
    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
        })
    var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0xFF0000)
    //线的材质可由2点的颜色决定
    var p1 = new THREE.Vector3(-100, 0, 100)
    var p2 = new THREE.Vector3(100, 0, -100)
    geometry.vertices.push(p1)
    geometry.vertices.push(p2)
    geometry.colors.push(color1, color2)

    var line = new THREE.Line(geometry, material, THREE.LinePieces)
    scene.add(line)
}

function render(){
    renderer.clear()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

function threeStart(){
    initThree()
    initCamera()
    initScene()
    initLight()
    initObject()
    render()
}
```
