import React from 'react';
import {
  Button,
  Grid,
  Header,
  Image,
  Input,
  Label,
} from 'semantic-ui-react';

export default {
  grid: {
    tagName: Grid,
    children: true,
  },
  row: {
    tagName: Grid.Row,
    children: true,
  },
  col: {
    tagName: Grid.Column,
    children: true,
  },
  text: {
    createHelper: node => node.text || node.value,
  },
  label: {
    tagName: Label,
    children: true,
  },
  input: {
    tagName: Input,
    defaultProps: {
      type: 'text',
    },
    children: false,
  },
  button: {
    tagName: Button,
    defaultProps: {},
    children: true,
  }
}
