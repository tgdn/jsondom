import React from 'react';
import styled from 'styled-components';
// import TextField from 'components/TextField';
import { Button } from "@blueprintjs/core";
import WIDGETS from 'lib/widgets';

const Title = styled.h3`
  color: #a0a0a0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 2.7;
`;

const ErrorTitle = Title.extend`
  color: #fd9a9a;
`

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
    const rawTree = this.props.rawTree;

    if (rawTree) {
      try {
        const json = JSON.parse(rawTree);
        rendered = this.parseNode(json);
      } catch (ex) {
        console.warn(ex.message);
        rendered = <ErrorTitle>Rendering error</ErrorTitle>;
      }
    } else {
      rendered = <Title>
        Nothing to render
        <Button>Add component</Button>
      </Title>;
    }
    return rendered;
  }
}

export default Renderer;
