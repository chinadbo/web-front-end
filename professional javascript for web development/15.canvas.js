/**
 * canvas
 * <canvas id='drawing' width='200' height='200'></canvas>
 */
//获得绘图上下文

const drawing = document.getElementById('drawing')

//确定浏览器支持
if (drawing.getContext) {
	const context = drawing.getContext('2d')

	// 取得图像的数据URI
	const imgURI = drawing.toDataURL('image/png')

	// 填充和描边
	context.fillStyle = '#0000ff'
	context.strokeStyle = 'pink'

	// 绘制红色矩形
	context.fillStyle = '#ff0000'
	context.fillRect(10,10,50,50)

	// 绘制半透明蓝色矩形
	context.fillStyle = 'rgba(0,0,255,0.5)'
	context.fillRect(30,30,50,50)

	// 绘制红色描边矩形
	context.strokeStyle = '#ff0000'
	context.strokeRect(10,10,50,50)

	// 绘制半透明蓝色描边矩形
	context.strokeStyle = 'rgba(0,0,255,0.5)'
	context.strokeRect(30,30,50,50)
	// 描边线条的宽度由lineWidth属性控制（任意整数），lineCap控制线条末端的形状平头、圆头还是方头(butt,round,square)
	// lineJoin控制线条相交方式 圆交、斜交、斜接（round,bevel,miter）

	// clearRect() 清除画布上的矩形区域
	context.clearRect(40,40,10,10)
}
/**
绘制路径
 arc(x, y, radius, startAngle, endAngle, counterclockwise) ：以 (x,y) 为圆心绘
	制一条弧线，弧线半径为 radius ，起始和结束角度（用弧度表示）分别为 startAngle 和
	endAngle 。最后一个参数表示 startAngle 和 endAngle 是否按逆时针方向计算，值为 false
	表示按顺时针方向计算。
 arcTo(x1, y1, x2, y2, radius) ：从上一点开始绘制一条弧线，到 (x2,y2) 为止，并且以
	给定的半径 radius 穿过 (x1,y1) 。
	 bezierCurveTo(c1x, c1y, c2x, c2y, x, y) ：从上一点开始绘制一条曲线，到 (x,y) 为
	止，并且以 (c1x,c1y) 和 (c2x,c2y) 为控制点。
 lineTo(x, y) ：从上一点开始绘制一条直线，到 (x,y) 为止。
 moveTo(x, y) ：将绘图游标移动到 (x,y) ，不画线。
 quadraticCurveTo(cx, cy, x, y) ：从上一点开始绘制一条二次曲线，到 (x,y) 为止，并
	且以 (cx,cy) 作为控制点。
 rect(x, y, width, height) ：从点 (x,y) 开始绘制一个矩形，宽度和高度分别由 width 和
	height 指定。这个方法绘制的是矩形路径，而不是 strokeRect() 和 fillRect() 所绘制的独
	立的形状。
*/

if (drawing.getContext) {
	const context = drawing.getContext('2d')
	//start path
	context.beginPath()
	//draw out circle
	context.arc(100,100,99,0,2*Math.PI,false)
	//draw inner circle
	context.moveTo(194,100)
	context.arc(100,100,94,0,2*Math.PI,false)
	// draw second
	context.moveTo(100,100)
	context.lineTo(100,15)
	//draw hour
	context.moveTo(100,100)
	context.lineTo(35,100)

	context.stroke()

	// context.isPointInPath(100,100)

	/**
	 * fill text
	 * context.font = 'bold 14px Arial'
	 * context.textAlign = 'satrt|end|center'
	 * context.textBaseline = 'middle'
	 * context.fillText('12', 100, 20) //(绘制的文本字符串，x， y，可选的最大像素宽度)
	 */

	 //绘制图像
	 //要绘制的图像、源图像的 x 坐标、源图像的 y 坐标、源图像的宽度、源图像的高度、目标图像的 x 坐标、目标图像的 y 坐标、目标图像的宽度、目标图像的高度
	context.drawImage(image,0,10,50,50,0,0,50,50)

	 //阴影
	context.shadowOffsetX = 5; //x轴阴影偏移量
	context.shadowOffsetY = 5;//y轴阴影偏移量
	context.shadowBlur = 4; //模糊的像素数
	context.shadowColor = "rgba(0, 0, 0, 0.5)";

	//线性渐变
	const gradient = context.createLinearGradient(30,30,70,70) //起止点坐标
	gradient.addColorStop(0, 'white')
	gradient.addColorStop(1, 'black')
	//径向渐变
	createRadialGradient(0,0,10,20,20,10)//起止点坐标及半径

	//模式：重复的图像，填充或描边图形
	const image = document.images[0]
	const pattern = context.createPattern(image,'repeat|repeat-x|repeat-y|no-repeat')
	context.fillStyle = pattern
	context.fillRect(10,10,150,150)

	//使用图像数据
	const imageData = context.getImageData(10,5,50,50)//坐标及宽高
	imageData.width | imageData.height | imageData.data
	red = imageData.data[0]
	alpha = imageData.data[3]

	if (drawing.getContext){
		var context = drawing.getContext("2d"),
		image = document.images[0],
		imageData, data,
		i, len, average,
		red, green, blue, alpha;
		//绘制原始图像
		context.drawImage(image, 0, 0);
		//取得图像数据
		imageData = context.getImageData(0, 0, image.width, image.height);
		data = imageData.data;
		for (i=0, len=data.length; i < len; i+=4){
			red = data[i];
			green = data[i+1];
			blue = data[i+2];
			alpha = data[i+3];
			//求得 rgb 平均值
			average = Math.floor((red + green + blue) / 3);
			//设置颜色值，透明度不变
			data[i] = average;
			data[i+1] = average;
			data[i+2] = average;
		}
		//回写图像数据并显示结果
		imageData.data = data;
		context.putImageData(imageData, 0, 0);
		}
	}


/**
 * WebGL
 */
// typed arrays 类型化数组
// 每个ArrayBuffer（数组缓存器类型）对象表示的只是内存中指定的字节数
const buffer = new ArrayBuffer(20)
const bytes = buffer.byteLength

//视图
var view = new DataView(buffer) //基于整个缓冲器创建一个新视图
var view = new DataView(buffer,9) //开始于字节9的新视图
var view = new DataView(buffer, 9. 10) //字节9-18的新视图

//DataView对象会把字节偏移量以及字节长度保存在byteOffset,byteLength
//view.byteOffset
//view.byteLength


//整数25以16位无符号保存在字节偏移量为0的位置
view.setUnit16(0,25)
view.setUnit16(2,50) //不能从字节1开始，因为16位整数要用2B
const value = view.getUnit16(0)

//类型化视图
//创建一个新数组，使用整个缓冲器
var int8s = new Int8Array(buffer); //8位二补整数
//只使用从字节 9 开始的缓冲器
var int16s = new Int16Array(buffer, 9);//16位二补整数
//只使用从字节 9 到字节 18 的缓冲器
var uint16s = new Uint16Array(buffer, 9, 10);//16位无符号整数

//使用缓冲器的一部分保存 8 位整数，另一部分保存 16 位整数
var int8s = new Int8Array(buffer, 0, 10);
var uint16s = new Uint16Array(buffer, 11, 10);

//每个视图构造函数有一个BYTES_PER_ELEMENT的属性，表示类型化数组的每个元素需要多少字节
//需要 10 个元素空间
var int8s = new Int8Array(buffer, 0, 10 * Int8Array.BYTES_PER_ELEMENT);
//需要 5 个元素空间
var uint16s = new Uint16Array(buffer, int8s.byteOffset + int8s.byteLength,5 * Uint16Array.BYTES_PER_ELEMENT);


/**
 * WebGL上下文
 * getContext()第二个参数：
 *  alpha ：值为 true ，表示为上下文创建一个 Alpha 通道缓冲区；默认值为 true 。
 *  depth ：值为 true ，表示可以使用 16 位深缓冲区；默认值为 true 。
 *  stencil ：值为 true ，表示可以使用 8 位模板缓冲区；默认值为 false 。
 *  antialias ：值为 true ，表示将使用默认机制执行抗锯齿操作；默认值为 true 。
 *  premultipliedAlpha ：值为 true ，表示绘图缓冲区有预乘 Alpha 值；默认值为 true 。
 *  preserveDrawingBuffer ：值为 true ，表示在绘图完成后保留绘图缓冲区；默认值为 false 。
 */

if (drawing.getContext) {
	const gl = drawing.getContext('webgl', {alpha: false})
}