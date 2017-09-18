// 窗口位置

var leftPos = ( typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX
var topPos = ( typeof window.screenTop == 'number') ? window.screenTop : window.screenY

// 视口
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight

if (typeof pageWidth != 'number') {
    if (document.compatMode == 'CSS1Compat') {
        pageWidth = document.documentElement.clientWidth
        pageHeight = document.documentElement.clientHeight
    } else{
        pageWidth = document.body.clientWidth
        pageHeight = document.body.clientHeight
    }
}

// window.open()

// window.open('http://ioodu.com','newWindow','fullscreen=no,height=400,width=400,top=10,left=10,location=no,menubar=no,resizable=no,scrollbare=no,status=no,toolbar=no')

// location search

function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
        args = [],
        items = qs.length ? qs.split('#') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length

    for (var i = 0; i < len; i++ ){
        item = items[i].split('=')
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])
        if (name.length){
            args[name] = value
        }
    }
    return args
}
