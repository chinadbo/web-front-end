EventUtil.addHandler(form, 'submit', function(event) {
	event = EventUtil.getEvent(event)
	var target = EventUtil.getTarget(event)

	var btn = target.elements['submit-btn']
	btn.disabled = true
})

EventUtil.addHandler(window, 'load', function(event){
	var element = document.forms[0].elements[0]
	if (element.autofocus !== true) {
		element.focus()
	}
})

var textbox = document.forms[0].elements[0]
EventUtil.addHandler(textbox, 'focus', function(event){
	event = EventUtil.getEvent(event)
	var target = EventUtil.getTarget(event)
	if (target.style.backgroundColor != 'red') {
		target.style.backgroundColor = 'yellow'
	}
})

EventUtil.addHandler(textbox, 'blur',function(event){
	event = EventUtil.getEvent(event)
	var target = EventUtil.getTarget(event)
	if (/[^\d]/.test(target.value)) {
		target.style.backgroundColor = 'red'
	}
	else {
		target.style.backgroundColor = ''
	}
})

EventUtil.addHandler(textbox, 'cahnge',function(event){
	event = EventUtil.getEvent(event)
	var target = EventUtil.getTarget(event)
	if (/[^\d]/.test(target.value)) {
		target.style.backgroundColor = 'red'
	}
	else {
		target.style.backgroundColor = ''
	}
})

function selectText(textbox, startIndex, stopIndex) {
	if (textbox.setSelectionRange) {
		textbox.setSelectionRange(startIndex, stopIndex)
	}
	else if (textbox.createTextRange) {
		var range = textbox.createTextRange()
		range.collapse(true)
		range.moveStart('character', startIndex)
		range.moveEnd('character', stopIndex - startIndex)
		range.select()
	}
	textbox.focus()
}

EventUtil.addHandler(textbox, 'keypress', function(event){
	event = EventUtil.getEvent(event)
	var target = EventUtil.getTarget(event)
	var charcode = EventUtil.getCharCode(event)

	if ( !/\d/.test(String.fromCharCode(charcode)) && charcode > 9 && !event.ctrlKey) {}
})

EventUtil.addHandler(textbox, 'paste', function(event){
	event = EventUtil.getEvent(event)
	var text = EventUtil.getClipboardText(event)
	if (!/^\d*$/.test(text)) {
		EventUtil.preventDefault(event)
	}
})

/**
 * <input type="text" name="tel1" id="txtTel1" maxlength="3">
 * <input type="text" name="tel2" id="txtTel2" maxlength="3">
 * <input type="text" name="tel3" id="txtTel3" maxlength="4">
 *
 * var textbox1 = document.getElementById("txtTel1");
 * var textbox2 = document.getElementById("txtTel2");
 * var textbox3 = document.getElementById("txtTel3");
 *
 * EventUtil.addHandler(textbox1, "keyup", tabForward);
 * EventUtil.addHandler(textbox2, "keyup", tabForward);
 * EventUtil.addHandler(textbox3, "keyup", tabForward);
 */

function tabForeard(event) {
	event = EventUtil.getEvent(event)
	var target = EventUtil.getTarget(event)

	if (target.value.length === target.maxlength) {
		var form = target.form
		for (var i = 0; i < form.elements.length; i++) {
			if (form.elements[i] == target) {
				if (form.elements[i+1]) {
					form.elements[i+1].focus()
				}
				return
			}
		}
	}
}

var selectbox = document.forms[0].elements['location']

var text = selectbox.options[0].text
var value = selectbox.options[0].value


function getSelectedOptions(selectbox) {
	var result = new Array()
	var option = null
	for (var i = 0; i < selectbox.options.length; i++) {
		option = selectbox.options[i]
		if (option.selected) {
			result.push(option)
		}
	}
	return result
}

/**
//add select oprion

var newOption = document.createElement('option')
newOption.appendChild(document.createTextNode('OPtion text'))
newOption.setAttribute('value','Option value')

selectbox.appendChild(newOption)

// or

var newOption = new Option('Option text', 'Option value')
selectbox.add(newOption, undefined)

//remove option
selectbox.removeChild(selectbox.options[0]) //selectbox.options[0] = null //selectbox.remove(0)

*/

function serialize(form) {
	var parts = [],field = null,i,len,j,optLen,option,optValue
	for (var i = 0, len = form.elements.length; i < len; i++) {
		field = form.elements[i]
		switch(field.type){
			case 'select-one':
			case 'select-multiple':

				if (field.name.length) {
					for (j = 0, optLen = field.options.length; j < optLen; j++) {
						option = field.options[j]
						if (option.selected) {
							optValue = ''
							if (option.hasAttribute) {
								optValue = (option.hasAttribute('value') ? option.value : option.text)
							}
							else {
								optValue = (option.attributes['value'].specified ? option.value : option.text)
							}
							parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue))
						}
					}
				}
				break
			case undefined: //字段集
			case 'file': //文件输入
			case 'submit': //提交按钮
			case 'reset':
			case 'button': //自定义按钮
				break
			case 'radio':
			case 'checkbox':
				if (!field.checked) {
					break
				}
			default:
				if (field.name.length) {
					parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value))
				}
		}
	}
	return parts.join('&')
}