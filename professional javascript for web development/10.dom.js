//在 IE8 及之前版本中无效
var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);

function convertToArray(nodes) {
    var array = null
    try {
        array = Array.prototype.slice.call(nodes, 0)
    } catch (ex) {
        array = new Array()
        for (var i = 0, ilen = nodes.length; i < ilen;i++){
            array.push(nodes[i])
        }
    }
    return array
}

//取得完整的 URL
var url = document.URL;
//取得域名
var domain = document.domain;
//取得来源页面的 URL
var referrer = document.referrer;

// <img src="myimage.gif" name="myImage">
var images = document.getElementsByTagName("img");

console.log(images.length); //输出图像的数量
console.log(images[0].src); //输出第一个图像元素的 src 特性
console.log(images.item(0).src); //输出第一个图像元素的 src 特性

var myImage = images.namedItem("myImage");
var myImage = images["myImage"];


// <div id="myDiv"></div>

var div = document.getElementById('myDiv')
div.tagName = div.nodeName //DIV

function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
    }

function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
    script.appendChild(document.createTextNode(code));
    } catch (ex){
    script.text = code;
    }
    document.body.appendChild(script);
    }
    
//下面是调用这个函数的示例：
//    loadScriptString("function sayHi(){alert('hi');}");

var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "style.css";
var head = document.getElementsByTagName("head")[0];
head.appendChild(link);


//创建 table
var table = document.createElement("table");
table.border = 1;
table.width = "100%";
//创建 tbody
var tbody = document.createElement("tbody");
table.appendChild(tbody);
// 创建第一行
tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("Cell 2,1"));
// 创建第二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("Cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("Cell 2,2"));
//将表格添加到文档主体中
document.body.appendChild(table);


//取得 body 元素
var body = document.querySelector("body");
//取得 ID 为"myDiv"的元素
var myDiv = document.querySelector("#myDiv");
//取得类为"selected"的第一个元素
var selected = document.querySelector(".selected");
//取得类为"button"的第一个图像元素
var img = document.body.querySelector("img.button");


//取得某<div>中的所有<em>元素（类似于 getElementsByTagName("em")）
var ems = document.getElementById("myDiv").querySelectorAll("em");
//取得类为"selected"的所有元素
var selecteds = document.querySelectorAll(".selected");
//取得所有<p>元素中的所有<strong>元素
var strongs = document.querySelectorAll("p strong");


function matchesSelector(element, selector){
    if (element.matchesSelector){
    return element.matchesSelector(selector);
    } else if (element.msMatchesSelector){
    return element.msMatchesSelector(selector);
    } else if (element.mozMatchesSelector){
    return element.mozMatchesSelector(selector);
    } else if (element.webkitMatchesSelector){
    return element.webkitMatchesSelector(selector);
    } else {
    throw new Error("Not supported.");
    }
}
if (matchesSelector(document.body, "body.page1")){
    //执行操作
}


// Element Traversal API

/**
 childElementCount ：返回子元素（不包括文本节点和注释）的个数。
 firstElementChild ：指向第一个子元素； firstChild 的元素版。
 lastElementChild ：指向最后一个子元素； lastChild 的元素版。
 previousElementSibling ：指向前一个同辈元素； previousSibling 的元素版。
 nextElementSibling ：指向后一个同辈元素； nextSibling 的元素版。
 */

// HTML5

//取得所有类中包含"username"和"current"的元素，类名的先后顺序无所谓
var allCurrentUsernames = document.getElementsByClassName("username current");
//取得 ID 为"myDiv"的元素中带有类名"selected"的所有元素
var selected = document.getElementById("myDiv").getElementsByClassName("selected");

{/* <div class="bd user disabled">...</div> */}

// delete class 'user'
var classNames = div.className.split(/\s+/)
var pos = -1,i,len
for (i = 0,len = classNames.length;i < len;i++){
    if (classNames[i] == 'user') {
        pos = i
        break
    }
}
classNames.splice(i,1)
div.className = classNames.join(" ")

// classList
/**
  add(value) ：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
     contains(value) ：表示列表中是否存在给定的值，如果存在则返回 true ，否则返回 false 。
     remove(value) ：从列表中删除给定的字符串。
     toggle(value) ：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。
    这样，前面那么多行代码用下面这一行代码就可以代替了： 
 */
div.classList.remove('user')

// 焦点管理
var button = document.getElementById("myButton");
button.focus();
console.log(document.activeElement === button); //true
console.log(document.hasFocus()); //true


// HTMLDocument
if (document.readyState == "complete"){
    //已经加载完文档
}else if(document.readyState == "loading"){
    //正在加载文档
}

// head
var head = document.head || document.getElementsByTagName("head")[0]

// insertAdjacentHTML
//作为前一个同辈元素插入
element.insertAdjacentHTML("beforebegin", "<p>Hello world!</p>");
//作为第一个子元素插入
element.insertAdjacentHTML("afterbegin", "<p>Hello world!</p>");
//作为最后一个子元素插入
element.insertAdjacentHTML("beforeend", "<p>Hello world!</p>");
//作为后一个同辈元素插入
element.insertAdjacentHTML("afterend", "<p>Hello world!</p>");


// scrollIntoView()
//将页面主体滚动 5 行
document.body.scrollByLines(5);
//在当前元素不可见的时候，让它进入浏览器的视口
document.images[0].scrollIntoViewIfNeeded();
//将页面主体往回滚动 1 页
document.body.scrollByPages(-1);


// DOM2

//创建一个新的 SVG 元素
var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
//创建一个属于某个命名空间的新特性
var att = document.createAttributeNS("http://www.somewhere.com", "random");
//取得所有 XHTML 元素
var elems = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "*");



function getBoundingClientRect(element) {
    var scrollTop = document.documentElement.scrollTop
    var scrollLeft = document.documentElement.scrollLeft

    if (element.getBoundingClientRect){
        if (typeof arguments.callee.offset != 'number'){
            var temp = document.createElement('div')
            temp.style.cssText = 'position:absolute;left:0;top:0'
            document.body.appendChild(temp)
            arguments.callee.offset = -temp.getBoundingClientRect().top
            document.body.removeChild(temp)
            temp = null
        }

        var rect = element.getBoundingClientRect()
        var offset = arguments.callee.offset

        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.bottom + offset
        }
    } else {
        var actualLeft = getElementLeft(element)
        var actualTop = getELementTop(element)

        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }
}


// 遍历

var supportsTraversals = document.implementation.hasFeature('Traversal', '2.0')
var supportsNodeIterator = (typeof document.createNodeIterator == 'function')
var supportsTreeWalker = (typeof document.createTreeWalker == 'function')