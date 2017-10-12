'use strict';

(function init() {
  var res = document.getElementById("result");
  var widgets = {
    text: {
      createHelper: function (text) { return document.createTextNode(text); },
    },
    input: {
      tagName: 'input',
      defaultProps: {
        type: 'text',
        className: 'myinput',
      },
      availableProps: ['type', 'name', 'id', 'className'],
      children: false,
    },
    button: {
      tagName: 'button',
      defaultProps: {
        type: 'text',
        className: 'myinput',
      },
      availableProps: ['type', 'name', 'id', 'className'],
      children: true,
    },
    textarea: {
      tagName: 'textarea',
      defaultProps: {
        col: '40',
      },
      availableProps: ['cols', 'row', 'name', 'id', 'className'],
      children: true,
    }
  };
	
  function cleanResult() {
    res.innerHTML = "";
  }
	
  function setError(msg) {
    cleanResult();
    
    var el = document.createElement("span");
    el.appendChild(document.createTextNode(msg));
    res.appendChild(el);
  }
  
  function parseChildren(rootNode, domElement) {
    var children = rootNode.children;
    
    if (children && Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var child = parseNode(children[i]);
        domElement.appendChild(child);
      }
    }
    
    return domElement;
  }

  function parseNode(node) {
    var domElement;
    var children = node.children;
    var widget = widgets[node.type];
    
    if (widget) {
      if (widget.createHelper && typeof widget.createHelper === 'function') {
        domElement = widget.createHelper(node.text || '');
      } else {
        domElement = document.createElement(widget.tagName);
      }
      
      /* build children if it can have some */
      if (widget.children && children) {
        domElement = parseChildren(node, domElement);
      }
    } else {
      domElement = document.createElement('div');
      
      /* build children */
      domElement = parseChildren(node, domElement);
    }
    
    return domElement;
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
