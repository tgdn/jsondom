import React from 'react';
import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import styled from 'styled-components';
import WIDGETS, { DEFAULT_ICON } from 'lib/widgets';
import Node from 'lib/Node';

const Tree = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: rgb(71,78,90);
`;

class TreeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.parsedNode = null;
    this.buildTree(props);
  }

  componentWillReceiveProps(newProps) {
    this.buildTree(newProps);
  }

  buildTree(props) {
    const rootNode = props.rootNode;
    if (rootNode) {
      this.parsedNode = rootNode.tree;
    }
  }

  render() {
    return (
      <Tree>{this.parsedNode}</Tree>
    )
  }
}

TreeEditor.propsTypes = {
  rootNode: PropTypes.instanceOf(Node),
}

export default TreeEditor;

// const StyledTree = styled(Tree)`
//   width: 100%;
// `;

// class TreeEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.parseChildren = this.parseChildren.bind(this);
//     this.parseNode = this.parseNode.bind(this);
//     this.handleNodeExpand = this.handleNodeExpand.bind(this);
//     this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
//   }
//
//   shouldComponentUpdate() { return true; }
//
//   componentWillMount() {
//     this.parse(this.props);
//   }
//
//   componentWillReceiveProps(newProps) {
//     this.parse(this.props);
//   }
//
//   parse(props) {
//     let nodes = [];
//     const rawTree = props.rawTree;
//
//     if (rawTree) {
//       try {
//         const json = JSON.parse(rawTree);
//         nodes = [this.parseNode(json)];
//       } catch (ex) {
//         console.warn(ex);
//       }
//     }
//
//     let i = 0;
//     this.forEachNode(nodes, n => (n.id = i++));
//
//     this.setState({ nodes });
//   }
//
//   parseChildren(rawNode) {
//     let rawChildren = rawNode.children;
//
//     /* make it an array if it isnt one */
//     if (!Array.isArray(rawChildren)) {
//       rawChildren = [rawChildren];
//     }
//
//     return rawChildren.map(this.parseNode);
//   }
//
//   parseNode(rawNode) {
//     const widget = WIDGETS[rawNode.type];
//     const node = {
//       label: rawNode.type || 'no name',
//       isExpanded: true,
//       iconName: DEFAULT_ICON,
//     };
//     if (widget) {
//       node.iconName = widget.icon || DEFAULT_ICON;
//     }
//     if (rawNode.children) {
//       node.childNodes = this.parseChildren(rawNode);
//     }
//
//     return node;
//   }
//
//   render() {
//     return (
//       <StyledTree
//         className={Classes.DARK}
//         contents={this.state.nodes}
//         onNodeExpand={this.handleNodeExpand}
//         onNodeCollapse={this.handleNodeCollapse}
//       />
//     );
//   }
//
//   handleNodeExpand(nodeData) {
//     nodeData.isExpanded = true;
//     this.setState(this.state);
//   }
//
//   handleNodeCollapse(nodeData) {
//     nodeData.isExpanded = false;
//     this.setState(this.state);
//   }
//
//   forEachNode(nodes, cb) {
//     if (!nodes) {
//       return;
//     }
//
//     for (const node of nodes) {
//       cb(node);
//       this.forEachNode(node.childNodes, cb);
//     }
//   }
// }
//
// export default TreeEditor;
