import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import throttle from 'lodash/throttle';

const SidebarView = styled.div`
  position: relative !important;
  flex: 0 0 200px;
  display: flex;
  height: 100%;
  max-width: 38%;
  min-width: 10px;
  overflow: hidden;
  z-index: 1;
  background-color: rgb(63, 69, 79);
  border-left: ${props =>
    props.attached === 'left' && '1px solid #3e3e3e'};
  border-right: ${props =>
    props.attached !== 'left' && '1px solid #3e3e3e'};
  box-shadow: ${props => props.attached === 'left'
    ? '2px'
    : '-2px'} 0 4px 2px #5D5D5D;
`;

const DragHandle = styled.div`
  position: absolute;
  cursor: col-resize;
  right: ${props => props.side === 'left' ? 'inherit' : '0'};
  left: ${props => props.side === 'left' ? '0' : 'inherit'};
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 1;
`;

class ResizeableSidebar extends React.Component {
  state = {
    currentWidth: null,
  };
  dragDown = false;

  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = throttle(this.handleMouseMove.bind(this), 15);
  }

  componentDidMount() {
    this.dragHandle.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    this.dragHandle.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(e) {
    this.dragDown = true;
    this.startOffset = this.props.attached === 'right'
    ? this.sidebar.offsetWidth - e.pageX
    : this.sidebar.offsetWidth - (window.innerWidth - e.pageX);
  }

  handleMouseMove(e) {
    if (this.dragDown) {
      const w = this.props.attached === 'right'
      ? this.startOffset + e.pageX
      : this.startOffset + (window.innerWidth - e.pageX)
      this.setState({ currentWidth: `${w}px` })
    }
  }

  handleMouseUp() {
    this.dragDown = false;
  }

  render() {
    const { children, attached } = this.props;
    const { currentWidth } = this.state;
    return (
      <SidebarView
        innerRef={el => {this.sidebar = el;}}
        attached={attached}
        style={!!currentWidth ? {flex: '0 0 ' + currentWidth} : {}}
      >
        {children}
        <DragHandle
          side={attached}
          innerRef={el => { this.dragHandle = el; }}
        />
      </SidebarView>
    );
  }
}

SidebarView.propTypes = {
  width: PropTypes.string,
  attached: PropTypes.oneOf(['left', 'right']).isRequired,
};

SidebarView.defaultProps = {
  width: '240px',
};

export default ResizeableSidebar;
