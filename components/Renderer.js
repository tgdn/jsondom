import React from 'react';
import TextField from './TextField';

const WIDGETS = {
  input: {
    tagName: TextField,
    defaultProps: {
      type: 'text',
      className: 'myinput',
    },
    availableProps: ['type', 'name', 'id', 'className'],
    children: false,
  },
}

class Renderer extends React.Component {
  parseChildren(rootNode) {
    const childrenTree = rootNode.children;

    if (childrenTree && Array.isArray(childrenTree)) {
      return childrenTree.map(node => this.parseNode(node));
    }
    return [];
  }

  parseNode(node) {
    let domElement;
    let children;
    const childrenTree = node.children;
    const widget = WIDGETS[node.type];

    if (widget) {
      /* a component */
      if (widget.children && childrenTree) {
        children = this.parseChildren(node);
      }

      const props = {...widget.defaultProps, ...node.props}
      domElement = React.createElement(widget.tagName, props, children);
    } else {
      /* a container */
      children = this.parseChildren(node);
      const props = node.props;
      domElement = React.createElement('div', props, children);
    }

    return domElement;
  }

  render() {
    let rendered;
    try {
      const json = JSON.parse(this.props.rawTree);
      rendered = this.parseNode(json);
    } catch (ex) {
      console.warn(ex.message);
      rendered = <p>Rendering error</p>;
    }
    return rendered;
  }
}

export default Renderer;
