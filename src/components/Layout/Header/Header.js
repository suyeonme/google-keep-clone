import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

import Profile from 'components/Layout/Header/Profile';
import Logo from 'components/Layout/Header/Logo';
import SideNav from 'components/Layout/SideNav/SideNav';
import Hamburger from 'icons/hamburger.svg';
import SearchBar from 'components/UI/SearchBar/SearchBar';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid rgba(66, 66, 66, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.4rem 1rem 0.8rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Menu = styled.div`
  display: inline-block;
  width: 4.7rem;
  height: 4.7rem;
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
        <div style={{ display: 'flex' }}>
          {userObj && (
            <Tooltip title="Main menu" arrow>
              <Menu onClick={() => setOpenNav(!openNav)} />
            </Tooltip>
          )}
          <Logo />
        </div>
        {userObj && (
          <>
            <SideNav isHover={openNav} onHover={setOpenNav} />
            <SearchBar />
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
