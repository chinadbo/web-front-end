/**
 * XMLHttpRequest
 */

function createXhr() {
    if(typeof XMLHttpRequest != undefined){
        return new XMLHttpRequest()
    }else if(typeof ActiveXObject != undefined){
        // < IE 7
        if(typeof arguments.callee.activeXString != 'string'){
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], i, len

            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i])
                    arguments.callee.activeXString = versions[i]
                    break
                }
                catch (ex){

                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString)
    }else {
        throw new Error(' no XHR object available')
    }
}

// 声明
var xhr = createXhr()

//启动一个请求以备发送
xhr.open('get', 'example.txt', false) // get/post, URL, 是否异步

//发送请求
xhr.send(null) //（null）不需要通过请求主体发送数据

/**
 * responseText：作为响应主体被返回的文本
 * responseXML：如果响应的内容类型'text/xml'或'application/xml'，将保存包含着响应数据的XML DOM文档
 * status：响应的HTTP状态
 * statusText：HTTP状态的说明
 */

 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
     console.log( xhr.responseText)
 }
 else {
     console.log( 'request unsuccessful: ' + xhr.status)
 }


/**
 * readyState
 *  0 ：未初始化。尚未调用 open() 方法。
 *  1 ：启动。已经调用 open() 方法，但尚未调用 send() 方法。
 *  2 ：发送。已经调用 send() 方法，但尚未接收到响应。
 *  3 ：接收。已经接收到部分响应数据。
 *  4 ：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。
 */

var xhr = createXhr()

xhr.onreadyStateChange = function () {
    if (xhr.readyState == 4) {
        if ( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            console.log(xhr.responseText)
        }
        else{
            console.log( 'request unsuccessful: ' + xhr.status)  
        }
    }
}

xhr.open('get', 'example.txt', true)
xhr.send(null)

//停止触发事件
xhr.abort()

/**
 * HTTP 头部信息
 * 请求头部信息：
 * Accept: 浏览器能够处理的内容类型
 * Accept-Charset: 浏览器能够显示的字符集
 * Accept-Encoding: 浏览器能够处理的压缩编码
 * Accept-Language: 浏览器当前设置的语言
 * Connection: 浏览器与服务器之间连接的类型
 * Cookie: 当前页面设置的任何Cookie
 * Host：发出请求的页面所在的域
 * Referer：发出请求的页面的URI
 * User-Agent：浏览器的用户代理字符串
 */

// 在open和send之间调用setRequestHeader
xhr.setRequestHeader('myHeader', 'myValue')

var myHeader = xhr.getResponseHeader('myHeader')
var allHeaders = xhr.getAllResponseHeaders()

//POST

xhr.open("post", "postexample.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var form = document.getElementById("user-info");
xhr.send(serialize(form));

/**
 * XMLHttpRequest 2
 */
//formData
var data = new FormData()
data.append('name', 'ioodu')
//or
var form = document.getElementById('user-info')
xhr.send(new FormData(form))

//timeout (only for IF8+)
xhr.timeout = 1000 //1second
xhr.ontimeout = function(){
    console.log('timeout a second')
}

//overrideMimeType
xhr.overrideMimeType('text/xml') //强迫xhr对象将响应当作xml而非纯文本来处理。send方法之前

/**
 * Progress Events进度事件
 *  loadstart ：在接收到响应数据的第一个字节时触发。
 *  progress ：在接收响应期间持续不断地触发。
 *  error ：在请求发生错误时触发。
 *  abort ：在因为调用 abort() 方法而终止连接时触发。
 *  load ：在接收到完整的响应数据时触发。
 *  loadend ：在通信完成或者触发 error 、 abort 或 load 事件后触发。
 */

xhr.onload = function(){
    if ( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        console.log(xr.responseText)
    }
}

xhr.onprogress = function(){
    var divstatus = document.getElementById('status')
    //接受event对象，其target是xhr对象。包含三个属性：
    // lengthComputable 表示进度信息是否可用的布尔值
    // position 表示已经接收的字节数
    // totalSize 表示Content-Length响应头确定的预期字节数
    if (event.lengthComputable){
        divstatus.innerHTML = 'Received ' + event.position + ' of ' + event.totalSize + ' bytes'
    }
    //open 方法之前调用onprogress
}


/**
 * CORS（Cross-Origin Resource Sharing，跨源资源共享）
 * 基本思想：使用自定义的HTTP头部，让浏览器和服务器沟通
 * IE： IE8引入XDR（XDomainRequest）
 * cookie不会随请求发送，也不会随响应返回
 * 只能设置请求头部信息中的Content-Type字段
 * 不能访问响应头部信息
 * 只支持get和post请求
 * 缓解CSRF（Cross-site Request FOrgery跨站点请求伪造） 和 XSS（Cross-site Scripting跨站点脚本）
 */
var xdr = new XDomainRequest()
xdr.onload = function(){
    console.log(xdr.responseText)
}
xdr.open('get', 'http://ioodu.com/page/')
xdr.send(null)

//onerror ontimeout
xdr.onerror = function(){}
xdr.timeout = 1000
xdr.ontimeout = function(){}

xdr.open()

xdr.contentType = 'application/x-www-form-urlencoded'

/**
 * 其它浏览器对CORS的实现
 * 标准的XHR对象并在open中使用绝对URL
 * 不能使用setRequestHeader（）设置自定义头部
 * 不能发送和接受cookie
 * 调用getAllResponseHeaders总会返回空字符串
 */

/**
 * Preflighted Request
 * CORS通过preflighted request的透明服务器验证机制支持开发人员使用自定义的头部、GET、POST之外的方法，以及不同类型的主体内容
 * 
 */
// 带有自定义头部NCZ的使用POST方法发送的请求
//Origin: http://www.ioodu.com
//Access-Control-Request-Method: POST
//Access-Control-Request-Headers: NCZ
// 响应
//Access-Control-Allow-Origin: http://www.ioodu.com
//Access-Control-Allow-Methods: POST, GET
//Access-Control-Allow-Headers: NCZ
//Access-Control-Max-Age: 172800 //应该将这个Preflight请求缓存多长时间（秒）


//带凭证的请求
//HTTP响应头
// Access-Control-Allow-Credentials: true


//跨浏览器的CORS

function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest()
    if ('withCredentials' in xhr){
        xhr.open(mthod,url,true)
    }
    else if (typeof XDomainRequest != 'undefined'){
        var xhr = new XDomainRequest()
        xhr.open(method, url)
    }
    else {
        xhr = null
    }
    return xhr
}

var request = createCORSRequest('get', 'http://ioodu.com/page')
if(request){
    request.onload = function(){}
    request.send()
}

/**
 * 其它跨域技术： 
 * 图像Ping
 */
var image = new Image()
image.onload = image.onerror = function(){}
img.src = 'http://www.ioodu.com/test?name=ioodu' //只能发送GET请求，无法访问服务器响应文本

//JSONP (JSON with padding 填充式JSON或参数式JSON)
function handleResponse(response){
    console.log('IP ' + response.ip + ' in ' + response.city)
}
var script = document.createElement('script')
script.src = 'http://freegroip.net/json/?callback=handleResponse'
document.body.insertBefore(script, document.body.firstChild)


/**
 * Comet（服务器推送）：长轮询和HTTP流
 * 长轮询: 页面发起一个到服务器的请求，服务器一直保持连接打开，直到有数据可发送。发送完数据后，浏览器关闭连接，随即又发起一个请求。
 * HTTP流：页面的整个生命周期只使用一个HTTP连接，浏览器向服务器发送一个请求，服务器保持连接打开，然后周期性向浏览器发送数据
 */

function createStreamingClient(url, progress, finished){
    var xhr = new XMLHttpRequest(), received = 0
    xhr.open('get', url, true)
    xhr.onreadystatechange = function(){
        var result
        if(xhr.readyState == 3){
            result = xhr.responseText.substring(received)
            received += result.length

            progress(result)
        }
        else if(xhr.readyState == 4){
            finished(xhr.responseText)
        }
    }
    xhr.send(null)
    return xhr
}

var client = createStreamingClient('streaming.php', function(data){
    console.log('received: ' + data)
}, function(data){
    console.log('Done!')
})


/**
 * web sockets
 *  WebSocket.OPENING  (0)：正在建立连接。
 *  WebSocket.OPEN  (1)：已经建立连接。
 *  WebSocket.CLOSING  (2)：正在关闭连接。
 *  WebSocket.CLOSE  (3)：已经关闭连接。
 */
var socket = new WebSocket('ws://www.ioodu.com/server.php')
//send message
socket.send('hello world')
//get message
socket.onmessage = function(event){
    var data = event.data
}

socket.onopen = function(){}
socket.onerror = function(){}
socket.onclose = function(event){
    // event.wasClean //布尔值，表示连接是否已经明确的关闭
    // event.code //服务器返回的数值状态码
    // event.reason //服务器发回的消息（字符串）
}