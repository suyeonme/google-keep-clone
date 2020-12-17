import React from 'react';
import styled from 'styled-components';

import SideNavItems from 'components/Layout/SideNav/SideNavItems/SideNavItems';

const NavContainer = styled('nav')<{ ishover: boolean }>`
  position: fixed;
  top: 7.2rem;
  left: 0;
  z-index: 300;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 8px 0 8px 8px;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  width: ${(props) => (props.ishover ? '280px' : '80px')};
  box-shadow
    ${(props) =>
      props.ishover &&
      '0 16px 10px 0 rgba(0, 0, 0, 0.14), 0 11px 18px 0 rgba(0, 0, 0, 0.12), 0 13px 5px -1px rgba(0, 0, 0, 0.2)'};

    @media (max-width: 576px) {
      width: ${(props) => (props.ishover ? '220px' : '60px')};
  }
`;

const Overlay = styled.div`
  display: none;
  background: transparent;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 7.2rem;
  left: 0;
  z-index: 1;

  @media (max-width: 1024px) {
    display: block;
  }
`;

interface SideNavProp {
  ishover: boolean;
  onHover: (bool: boolean) => void;
}

const SideNav = ({ ishover, onHover }: SideNavProp) => {
  return (
    <NavContainer
      ishover={ishover}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <SideNavItems ishover={ishover} openNav={onHover} />
      {ishover && <Overlay onClick={() => onHover(false)} />}
    </NavContainer>
  );
};

export default React.memo(SideNav);
