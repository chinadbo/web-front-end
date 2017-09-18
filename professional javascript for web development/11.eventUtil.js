var EventUtil = {
    addHandler: function (element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false)
        }else if (element.attachEvent){
            element.attachEvent('on'+type, handler)
        } else {
            element['on'+type] = handler
        }
    },
    getEvent: function (event){
        return event ? event : window.event
    },
    getTarget: function (event){
        return event.target || event.srcElement
    },
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    },
    removeHandler: function (element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false)
        }else if (element.detachEvent){
            element.detachEvent('on'+type, handler)
        } else {
            element['on'+type] = null
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation()
        }else{
            event.cancelBubble = true
        }
    },
    getRelatedTarget: function(event){
        if (event.relatedTarget){
            return event.relatedTarget
        }else if(event.toElement){
            return event.toElement
        }else if (event.fromElement){
            return event.fromElement
        }else{
            return null
        }
    },
    getButton: function(event){
        if (document.implementation.hasFeature('MouseEvents', '2.0')){
            return event.button
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0
                case 2:
                case 6:
                    return 2
                case 4:
                    return 1
            }
        }
    },
    getWheelDelta: function(event){
        if (event.wheelDelta){
            // if (clientInformation.engine.opera && client.engine.opera < 9.5) return -event.wheelDelta
            return event.wheelDelta
        }else {
            return -event.detail * 40 //firefox DOMMouseScroll
        }
    },
    getCharCode: function(event){
        if (typeof event.charCode == 'number'){
            return event.charCode
        } else {
            return event.keyCode
        } // String.fromCharCode()
    }
}

EventUtil.addHandler(window, 'load', function(){
    var script = EventUtil.
})