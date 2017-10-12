'use strict';

(function init() {
	var res = document.getElementById("result");
	
	function cleanResult() {
		res.innerHTML = "";
	}
	
	function setError(msg) {
		cleanResult();
		
		var el = document.createElement("span");
		el.appendChild(document.createTextNode(msg));
		res.appendChild(el);
	}
	
	function parseNode(node) {
		var el;
		var type = node.type;
		var children = node.children;
		
		var widgets = ['input', 'button', 'textarea'];
		
		if (widgets.indexOf(type) !== -1) {
			el = document.createElement(type);
		} else {
			el = document.createElement('div');
			/* build children */
			if (children && Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = parseNode(children[i]);
					el.appendChild(child);
				}
			}
		}
		
		return el;
	}
	
	function parse(tree) {
		cleanResult();
		var doc = parseNode(tree);
		
		if (doc) {
			res.appendChild(doc);
		}
	}

	function handleChange(instance) {
		var json;
		var val = instance.getValue();
		
		try {
			json = JSON.parse(val);
			parse(json);
		} catch (ex) {
			setError(ex.message);
		}
	}
	
	var textarea = document.getElementById("text");
	var editor = CodeMirror.fromTextArea(textarea, {
		matchBrackets: true,
		autoCloseBrackets: true,
		mode: "application/json",
		lineWrapping: true,
	});
	
	editor.on('change', handleChange);
})();
