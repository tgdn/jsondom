import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import styled from 'styled-components';
import { Classes, Tabs2, Tab2 } from '@blueprintjs/core';
import { setTab } from 'actions/ui';

class BPHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(tabId) {
    this.props.setTab(tabId);
  }

  render() {
    const { className } = this.props;
    return (
      <nav className={cx(Classes.NAVBAR, Classes.DARK, className)}>
        <div className={cx(Classes.NAVBAR_GROUP, Classes.ALIGN_LEFT)}>
          <div className={Classes.NAVBAR_HEADING}>JSONDom</div>
        </div>
        <div className={cx(Classes.NAVBAR_GROUP, Classes.ALIGN_LEFT)}>
          <Tabs2
            id="navbar"
            className={Classes.LARGE}
            onChange={this.handleChange}
            selectedTabId={this.props.tabId}
          >
            <Tab2 id="editor" title="Editor" />
            <Tab2 id="renderer" title="Renderer" />
          </Tabs2>
        </div>
        <div className={cx(Classes.NAVBAR_GROUP, Classes.ALIGN_RIGHT)}>
          <button
            className={cx(
              Classes.BUTTON,
              Classes.MINIMAL,
              Classes.iconClass('home')
            )}
          >
            Home
          </button>
          <span className={Classes.NAVBAR_DIVIDER}></span>
          <button
            className={cx(
              Classes.BUTTON,
              Classes.MINIMAL,
              Classes.iconClass('cog')
            )}
          />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ ui: { currentTabId } }) => ({
  tabId: currentTabId,
});

const mapDispatchToProps = dispatch => ({
  setTab: tabId => dispatch(setTab(tabId)),
})

const Header = styled(BPHeader)``;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
