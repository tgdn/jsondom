import React from 'react';
// import TextField from 'components/TextField';
import { Button } from "@blueprintjs/core";
import WIDGETS from 'lib/widgets';

class Renderer extends React.Component {
  parseChildren(rootNode) {
    const childrenTree = rootNode.children;

    if (childrenTree && Array.isArray(childrenTree)) {
      return childrenTree.map((node, i) => this.parseNode(node, i));
    } else if (childrenTree && typeof childrenTree === 'object') {
      // FIXME: will return a div if unknown
      return this.parseNode(childrenTree);
    }
    return [];
  }

  parseNode(node, key) {
    let domElement;
    let children;
    const childrenTree = node.children;
    const widget = WIDGETS[node.type];

    if (widget) {
      /* can it have children? */
      if (widget.children) {
        children = this.parseChildren(node);
      }

      /* concat props and default props */
      const props = {...widget.defaultProps, ...node.props};
      /* set key and react will be happy */
      if (key) {
        props.key = key;
      }
      console.log('key ', key);

      /* does it have a helper function ? */
      if (widget.createHelper && typeof widget.createHelper === 'function') {
        domElement = widget.createHelper(node, props);
      } else {
        /* create React element from tagName, props and children */
        domElement = React.createElement(widget.tagName, props, children);
      }
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
