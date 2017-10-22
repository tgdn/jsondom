import React from 'react';
import { Classes, Tree } from '@blueprintjs/core';
import WIDGETS, { DEFAULT_ICON } from 'lib/widgets';

class TreeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.parseChildren = this.parseChildren.bind(this);
    this.parseNode = this.parseNode.bind(this);
    this.handleNodeExpand = this.handleNodeExpand.bind(this);
    this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
  }

  shouldComponentUpdate() { return true; }

  componentWillMount() {
    this.parse(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.parse(this.props);
  }

  parse(props) {
    let nodes = [];
    const rawTree = props.rawTree;

    if (rawTree) {
      try {
        const json = JSON.parse(rawTree);
        nodes = [this.parseNode(json)];
      } catch (ex) {
        console.warn(ex);
      }
    }

    let i = 0;
    this.forEachNode(nodes, n => (n.id = i++));

    this.setState({ nodes });
  }

  parseChildren(rawNode) {
    let rawChildren = rawNode.children;

    /* make it an array if it isnt one */
    if (!Array.isArray(rawChildren)) {
      rawChildren = [rawChildren];
    }

    return rawChildren.map(this.parseNode);
  }

  parseNode(rawNode) {
    const widget = WIDGETS[rawNode.type];
    const node = {
      label: rawNode.type || 'no name',
      isExpanded: true,
      iconName: DEFAULT_ICON,
    };
    if (widget) {
      node.iconName = widget.icon || DEFAULT_ICON;
    }
    if (rawNode.children) {
      node.childNodes = this.parseChildren(rawNode);
    }

    return node;
  }

  render() {
    return (
      <Tree
        contents={this.state.nodes}
        className={Classes.ELEVATION_0}
        onNodeExpand={this.handleNodeExpand}
        onNodeCollapse={this.handleNodeCollapse}
      />
    );
  }

  handleNodeExpand(nodeData) {
    nodeData.isExpanded = true;
    this.setState(this.state);
  }

  handleNodeCollapse(nodeData) {
    nodeData.isExpanded = false;
    this.setState(this.state);
  }

  forEachNode(nodes, cb) {
    if (!nodes) {
      return;
    }

    for (const node of nodes) {
      cb(node);
      this.forEachNode(node.childNodes, cb);
    }
  }
}

export default TreeEditor;
