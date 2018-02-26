/**
 * HTML5 API
 * getUserMedia
 * 拍照实例
 */

const getUserMedia = (constraints, success, error) => {
    if(navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
    }
    else if(navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(constraints, success, error)
    }
    else if(navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(constraints, success, error)
    }
    else if(navigator.getUserMedia) {
        navigator.getUserMedia(constraints, success, error)
    }
}

const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

//success callback
const success = stream =>{
    const CompatibleURL = window.URL || window.webkitURL
    video.src = CompatibleURL.createObjectURL(stream)
    video.play()
}
//error callback
const error = error => {
    console.log(error.name, error.message)
}

if(navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia) {
    getUserMedia({
        video: {
            width: 480,
            height: 320,
            facingMode: 'user',
            facingMode: {
                exact: 'environment'
            }
        },
        audio: true,
    }, success, error)
}
else {
    console.log('不支持访问用户媒体设备')
}

//capture
document.getElementById('capture').addEventListener('click', () => {
    context.drawImage(video, 0, 0, 480, 320)
})

/**
 * DeviceMotionEvent
 * 摇一摇实例
 */

const SHAKE_SPEED_THRESHOLD = 300 //摇动速度阈值
let lastTime = 0
let x = y = z = lastX = lastY = lastZ = 0

const motionHandler = (evt) => {
    const acceleration = evt.accelerationIncludingGravity
    const curTime = Date.now()
    if(curTime - lastTime > 120) {
        const diffTime = curTime - lastTime
        lastTime = curTime
        x = acceleration.x
        y = acceleration.y
        z = acceleration.z

        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 1000
        if (speed > SHAKE_SPEED_THRESHOLD){
            console.log('you have shaked!')
        }
        lastX = x
        lastY = y
        lastZ = z

    }
}

if(window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', motionHandler, false)
}

/**
 * localstorage
 * <html manifest="./offline.appcache">
 */
//get text
const el = document.querySelector('#content')
el.addEventListener('blur', () => {
    const data = el.value
    if(navigator.onLine) saveOnline(data)
    else localStorage.setItem('data', data)
})
//监听上线事件
window.online = () => {
    const data = localStorage.getItem('data')
    if(!!data) {
        saveOnline(data)
        localStorage.removeItem('data')
    }
}
//save data
const saveOnline = data => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', './savedata')
    xhr.send('data=' + data)
}


/**
 * IndexedDB
 */
//声明一个数据库操作的构造函数
function localDB (dbName, tableName) {
    this.dbName = dbName
    this.tableName = tableName
    this.db = null
}
localDB.prototype.open = function (callback) {
    const _this = this
    const request = window.indexedDB.open(_this.dbName)
    request.onsuccess = function(event) {
        _this.db = request.result
        callback && callback()
    }
    //first time
    request.onupgradeneeded = function(event){
        const db = request.result
        if(!db.objectStoreNames.contains(_this.tableName)) {
            db.createObjectStore(_this.tableName, {
                keyPath: 'id',
                autoIncrement: true
            })
        }
    }
}
localDB.prototype.getStore = function(){
    const transaction = this.db.transaction(this.tableName, 'readwrite')
    const objStore = transaction.objectStore(this.tableName)
    return objStore
}
localDB.prototype.set = function(data, callback){
    const objStore = this.getStore()
    const request = data.id ? objStore.put(data) : objStore.add(data)
    request.onsuccess = function (event) {
        callback && callback(event.target.result)
    }
}
localDB.prototype.get = function(id, callback) {
    const objStore = this.getStore()
    const result = objStore.get(id)
    request.onsuccess = function(event){
        callback && callback(event.target.result)
    }
}
localDB.prototype.getAll = function(callback){
    const objStore = this.getStore()
    const request = objStore.openCursor()
    request.onsuccess = function(event){
        const cursor = event.target.cursor
        if(cursor){
            callback && callback(cursor.value)
            cursor.continue()
        }
    }
}
localDB.prototype.remove = function(id){
    const objStore = this.getStore()
    objStore.delete(id)
}