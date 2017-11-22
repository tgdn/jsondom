import { List } from 'immutable';
import React, { ReactNode, ReactChild } from 'react';
import styled from 'styled-components';
import reduce from 'lodash/reduce';
import { TreeNode, TreeNodeGroup } from 'components/TreeNode';
import WIDGETS, { IWidget } from 'lib/widgets';

export interface IRawNode {
  type: string,
  props: object,
  children?: any[] | null
}

class Node {
  hasError?: Error | null;
  tree: ReactNode;
  rootNode: boolean;
  widget?: IWidget;
  type: string;
  props: object;
  attributes: object;
  children: List<Node> | null | undefined;

  constructor(rawNode: IRawNode | null, err = null, rootNode: boolean) {
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

  toTree(level=0, key=-1): ReactNode {
    const hasChildren = this.children && List.isList(this.children);
    return <TreeNodeGroup level={level} key={key}>
      <TreeNode
        type={this.type}
        hasChildren={hasChildren}>
        {this.type}
      </TreeNode>
      {hasChildren &&
        this.children!.map((child,i) => child!.toTree(level + 1, i))}
    </TreeNodeGroup>;
  }

  render(editor=false): ReactNode {
    if (!this.widget) {
      return <div />; // TODO - better alternative?
    }

    let children: ReactNode[] = [];
    if (List.isList(this.children)) {
      children = this.children!.reduce((arr: ReactNode[] = [], node: Node | undefined) => {
        if (!(node instanceof Node)) return arr;
        return [...arr!, node.render(editor)];
      }, []);
    }

    let rendered: ReactNode;
    if (this.widget.createHelper &&
        typeof this.widget.createHelper === 'function') {
      rendered = this.widget.createHelper(this);
    } else {
      rendered = React.createElement(this.widget.tagName, this.props, children);
    }
    return rendered;
  }

  static fromJSON(json: string, rootNode = false): Node {
    try {
      const parsed = JSON.parse(json);
      return new Node(parsed, null, rootNode);
    } catch (ex) {
      console.warn(ex);
      return new Node(null, ex, rootNode);
    }
  }

  static fromObj(obj: IRawNode, rootNode = false): Node {
    return new Node(obj, null, rootNode);
  }

  static buildChildren(rawChildren: any): List<Node> | undefined | null {
    if (!rawChildren) return; // stop here
    if (rawChildren && Array.isArray(rawChildren)) {
      return reduce(rawChildren, (children, rawChild) => {
        return children.push(Node.fromObj(rawChild, false));
      }, List());
    } else if (rawChildren && typeof rawChildren === 'object') {
      return List([Node.fromObj(rawChildren, false)]);
    }
  }
}

export default Node;
