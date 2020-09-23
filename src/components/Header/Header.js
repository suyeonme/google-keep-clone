import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

import Profile from 'components/Header/Profile';
import Logo from 'components/Header/Logo';
import Nav from 'components/Nav/Nav';
import Hamburger from 'icons/hamburger.svg';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid rgba(66, 66, 66, 0.2);
  display: flex;
  align-items: center;
  padding: 5px 24px 5px 8px;

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
  background: url(${Hamburger}) center center no-repeat;
  background-size: 35%;

  &:hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;

function Header({ userObj }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <HeaderContainer>
        {userObj && (
          <Tooltip title="Main menu" arrow>
            <Menu onClick={() => setOpenNav(!openNav)} />
          </Tooltip>
        )}
        <Logo />

        {userObj && (
          <>
            <Nav isHover={openNav} onHover={setOpenNav} />
            <Profile userObj={userObj} />
          </>
        )}
      </HeaderContainer>
    </>
  );
}

Header.propTypes = {
  userObj: PropTypes.object,
};

export default React.memo(Header);
