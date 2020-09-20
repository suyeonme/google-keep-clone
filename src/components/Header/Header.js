import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

import Logo from './Logo';
import Hamburger from '../../icons/hamburger.svg';
import Nav from '../Nav/Nav';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid rgba(66, 66, 66, 0.2);
  display: flex;
  align-items: center;
  padding: 5px 8px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Menu = styled.div`
  display: inline-block;
  width: 47px;
  height: 47px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 4px;
  padding: 12px;
  : url(${Hamburger}) center center no-repeat;
  background-size: 35%;

  &:hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;

function Header() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <HeaderContainer>
        <Tooltip title="Main menu" arrow>
          <Menu onClick={() => setOpenNav(!openNav)} />
        </Tooltip>
        <Logo />
      </HeaderContainer>
      <Nav isHover={openNav} onHover={setOpenNav} />
    </>
  );
}

export default React.memo(Header);
