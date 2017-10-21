import React from 'react';
import styled from 'styled-components';

const BPHeader = ({ className }) => (
  <nav className={`pt-navbar pt-dark ${className}`}>
    <div className="pt-navbar-group pt-align-left">
      <div className="pt-navbar-heading">JSONDom</div>
    </div>
    <div className="pt-navbar-group pt-align-right">
      <button className="pt-button pt-minimal pt-icon-home">Home</button>
      <span className="pt-navbar-divider"></span>
      <button className="pt-button pt-minimal pt-icon-cog"></button>
    </div>
  </nav>
)

const Header = styled(BPHeader)`

`;

export default Header;
