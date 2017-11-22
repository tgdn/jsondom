import React from 'react';
import { Classes } from '@blueprintjs/core';
import {
  Button,
  Grid,
  Header,
  Image,
  Input,
  Label,
} from 'semantic-ui-react';
import Node from 'lib/Node';

export const DEFAULT_ICON = Classes.iconClass('widget');

export interface IWidget {
  tagName?: any,
  children?: boolean,
  icon?: string,
  createHelper?: (node: Node) => any,
  defaultProps?: object
}

interface IWidgets {
  [index: string]: IWidget
}

const WIDGETS: IWidgets = {
  grid: {
    tagName: Grid,
    children: true,
    icon: Classes.iconClass('grid'),
  },
  row: {
    tagName: Grid.Row,
    children: true,
    icon: Classes.iconClass('drag-handle-horizontal'),
  },
  col: {
    tagName: Grid.Column,
    children: true,
    icon: Classes.iconClass('drag-handle-vertical'),
  },
  text: {
    createHelper: (node: Node) => node.attributes.text || node.attributes.value,
    icon: Classes.iconClass('paragraph'),
  },
  label: {
    tagName: Label,
    children: true,
    icon: Classes.iconClass('label'),
  },
  input: {
    tagName: Input,
    defaultProps: {
      type: 'text',
    },
    children: false,
    icon: Classes.iconClass('manually-entered-data'),
  },
  button: {
    tagName: Button,
    defaultProps: {},
    children: true,
    icon: Classes.iconClass('widget-button'),
  }
}

export default WIDGETS;