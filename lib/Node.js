import { List } from 'immutable';
import React from 'react';
import styled from 'styled-components';
import reduce from 'lodash/reduce';
import { TreeNode, TreeNodeGroup } from 'components/TreeNode';
import WIDGETS from 'lib/widgets';

class Node {
  constructor(rawNode, err = false, rootNode) {
    this.hasError = err;
    this.tree = null;
    this.rootNode = rootNode;

    if (rawNode) {
      const { type, props, children, ...attributes } = rawNode;
      this.widget = WIDGETS[type];
      this.type = type;
      this.props = props;
      this.attributes = attributes;
      this.children = Node.buildChildren(children);
      if (rootNode) {
        this.tree = this.toTree(0);
      }
    }
  }

  toTree(level=0, key=-1) {
    const hasChildren = this.children && List.isList(this.children);
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
    if (List.isList(this.children)) {
      children = this.children.reduce((arr,node,i) => {
        if (!(node instanceof Node)) return null;
        return node.render(editor)
      }, []);
    }
    let rendered;
    if (this.widget.createHelper &&
        typeof this.widget.createHelper === 'function') {
      rendered = this.widget.createHelper(this);
    } else {
      rendered = React.createElement(this.widget.tagName, this.props, children);
    }
    return rendered;
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
      }, List());
    } else if (rawChildren && typeof rawChildren === 'object') {
      return List([Node.fromObj(rawChildren, null, false)]);
    }
  }
}

export default Node;
