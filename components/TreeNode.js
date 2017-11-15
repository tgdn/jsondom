import React from 'react';
import cx from 'classnames';
import { Classes } from '@blueprintjs/core';
import styled from 'styled-components';
import { Icon } from "@blueprintjs/core";
import WIDGETS from 'lib/widgets';

const TreeNodeStyled = styled.div`
  display: block;
  line-height: 27px;
  font-size: 12px;
  color: #dedede;
  border-top: 1px solid transparent;
  border-bottom: 1px solid rgb(63, 72, 83);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    background: #525965;
  }
`;

const TreeNodeGroup = styled.div`
  display: block;
  padding-left: ${props => props.level * 4}px;
  margin: 0;
`;

const TreeNodeContent = styled.span`
  padding-left: 4px;
`;

function TreeNode({ children, type, hasChildren }) {
  const widget = WIDGETS[type];
  const iconName = !!widget ? widget.icon : Classes.iconClass('grid');
  const iconClassName = cx(Classes.ICON_STANDARD, {
    'pt-icon-caret-down': hasChildren,
    [iconName]: !hasChildren,
  });
  return <TreeNodeStyled>
    <span className={iconClassName} />
    <TreeNodeContent>
      {children}
    </TreeNodeContent>
  </TreeNodeStyled>
}

export { TreeNode, TreeNodeGroup };
