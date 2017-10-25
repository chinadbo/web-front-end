/**
 * 跨文档消息传递 cross-document messaging(XDM)
 * postMessage()接受两参数： 消息， 消息接收方来自域的字符串（安全通信）
 */
const iframeWindow = document.getElementById('myframe').contentWindow
iframeWindow.postMessage('A secret', 'http://www.ioodu.com')

EventUtil.addHandler(window, 'message', function(event){
	//确保发送消息的域是已知的域
	if (event.origin == 'http://www.ioodu.com') { //origin:发送消息的文档所在的域
		//处理接收到的数据
		processMessage(event.data)
		//可选：向来源窗口发送回执
		event.source.postMessage('received', 'http://p2p.ioodu.com')
		//source： 发送消息的文档的window对象的代理
	}
})

/**
 * 原生拖放:
 * 拖放事件： dragstart,drag,dragend
 * 放置： dragenter,dragover,dragleave/drop
 */

//set and get data (text/URL)
event.dataTransfer.setData('text', 'some text')
event.dataTransfer.getData('text')

//get URL
const url = event.dataTransfer.getData('url') || dataTransfer.getData('text/uri-list')

//dropEffect（必须在 ondragenter 事件处理程序中针对放置目标来设置它。）被拖动的元素能够执行那种放置行为,搭配effectAllowed（必须在 ondragstart 事件处理程序中设置 effectAllowed 属性。）可用。
//  "none" ：不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值。
//  "move" ：应该把拖动的元素移动到放置目标。
//  "copy" ：应该把拖动的元素复制到放置目标。
//  "link" ：表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有 URL）。

// effectAllowed 属性可能的值如下。
//  "uninitialized" ：没有给被拖动的元素设置任何放置行为。
//  "none" ：被拖动的元素不能有任何行为。
//  "copy" ：只允许值为 "copy" 的 dropEffect 。
//  "link" ：只允许值为 "link" 的 dropEffect 。
//  "move" ：只允许值为 "move" 的 dropEffect 。
//  "copyLink" ：允许值为 "copy" 和 "link" 的 dropEffect 。
//  "copyMove" ：允许值为 "copy" 和 "move" 的 dropEffect 。
//  "linkMove" ：允许值为 "link" 和 "move" 的 dropEffect 。
//  "all" ：允许任意 dropEffect 。


/**
 * 媒体元素
 * <!-- 嵌入视频 -->
 *  <video id="myVideo" poster="" controls>
 *  <source src="conference.webm" type="video/webm; codecs='vp8, vorbis'">
 *  <source src="conference.ogv" type="video/ogg; codecs='theora, vorbis'">
 *  <source src="conference.mpg">
 *  Video player not available.
 *  </video>
 *  <!-- 嵌入音频 -->
 *  <audio id="myAudio">
 *  <source src="song.ogg" type="audio/ogg">
 *  <source src="song.mp3" type="audio/mpeg">
 *  Audio player not available.
 *  </audio>
 */
/**
 * 自定义播放器
 */
// <div class="mediaplayer">
// 	<div class="video">
// 		<video id="player" src="movie.mov" poster="mymovie.jpg" width="300" height="200">
// 		Video player not available.
// 		</video>
// 	</div>
// 	<div class="controls">
// 		<input type="button" value="Play" id="video-btn">
// 		<span id="curtime">0</span>/<span id="duration">0</span>
// 	</div>
// </div>

const player = document.getElementById('player')
const btn = document.getElementById('video-btn')
const curtime = document.getElementById('curtime')
const duration = document.getElementById('duration')

//更新播放时间
duration.innerHTML = player.duration
EventUtil.addHandler(btn, 'click', function(event){
	if (player.paused) {
		player.play()
		btn.value = 'Pause'
	}
	else {
		player.pause()
		btn.value = 'Play'
	}
})
//定时更新当前时间
setInterval(function(){
	curtime.innerHTML = player.currentTime
},250)

//检测编解码器的支持情况
if (audio.canPlayType('audio/mpeg')) {} //probably/maybe/''
if (audio.canPlayType('audio/mpeg; codeecs=\'vorbis\'')) {}

//历史状态管理
//history.pushState() 方法，该方法可以接收三个参数：状态对象、新状态的标题和可选的相对 URL
history.pushState({name: 'popstate'}, 'popstate page', 'pop.html')

EventUtil.addHandler(window, 'popstate', function(event){
	const state = event.state
	if (state) {//第一个页面加载时 state 为空
		processState(state)
	}
})
//更新当前状态，可以调用 replaceState() ，传入的参数与 pushState() 的前两个参数相同。
//调用这个方法不会在历史状态栈中创建新状态，只会重写当前状态。
history.replaceState({name:"Greg"}, "Greg's page");
