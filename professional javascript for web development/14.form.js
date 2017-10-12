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
