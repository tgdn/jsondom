import Immutable from 'immutable';
import React from 'react';
import styled from 'styled-components';
import reduce from 'lodash/reduce';
import { TreeNode, TreeNodeGroup } from 'components/TreeNode';
import WIDGETS from 'lib/widgets';

class Node {
  constructor(rawNode, err = false, rootNode) {
    this.hasError = err;
    this.tree = null;

    if (rawNode) {
      this.widget = WIDGETS[rawNode.type];
      this.type = rawNode.type;
      this.props = rawNode.props;
      this.children = Node.buildChildren(rawNode.children);
      if (rootNode) {
        this.tree = this.toTree(0);
      }
    }
  }

  toTree(level=0, key=-1) {
    const hasChildren = this.children && Immutable.List.isList(this.children);
    return <TreeNodeGroup level={level} key={key}>
      <TreeNode
        type={this.type}
        hasChildren={hasChildren}>
        {this.type}
      </TreeNode>
      {hasChildren &&
        this.children.map((child,i) => child.toTree(level + 1, i))}
    </TreeNodeGroup>;
  }

  render(editor=false) {
    if (!this.widget) {
      return <div />; // TODO - better alternative?
    }

    let children = [];
    if (Immutable.List.isList(this.children)) {
      children = this.children.map((node, i) => {
        return node.render(editor);
      })
    }
    return React.createElement(this.widget.tagName, this.props, children);
  }

  static fromJSON(json, rootNode = false) {
    try {
      const parsed = JSON.parse(json);
      return new Node(parsed, null, rootNode);
    } catch (ex) {
      console.warn(ex);
      return new Node(null, true, rootNode);
    }
  }

  static fromObj(obj, rootNode = false) {
    return new Node(obj, null, rootNode);
  }

  static buildChildren(rawChildren) {
    if (!rawChildren) return; // stop here
    if (rawChildren && Array.isArray(rawChildren)) {
      return reduce(rawChildren, (children, rawChild) => {
        return children.push(Node.fromObj(rawChild, null, false));
      }, Immutable.List());
    } else if (rawChildren && typeof rawChildren === 'object') {
      return Immutable.List([Node.fromObj(rawChildren, null, false)]);
    }
  }
}

export default Node;
