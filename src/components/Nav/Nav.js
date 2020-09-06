import React, { useState } from 'react';
import styled from 'styled-components';

import lightIcon from '../../icons/light.svg';
import archiveIcon from '../../icons/archive.svg';

const NavContainer = styled.nav`
  position: fixed;
  top: 68px;
  z-index: 1;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  transition: all 150ms cubic-bezier(0.4,0.0,0.2,1);
  width: ${(props) => (props.isHover ? '280px' : '80px')};
  box-shadow ${(props) =>
    props.isHover &&
    '0 16px 10px 0 rgba(0, 0, 0, 0.14), 0 11px 18px 0 rgba(0, 0, 0, 0.12), 0 13px 5px -1px rgba(0, 0, 0, 0.2)'}
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f1f3f4;
    border-radius: 0 25px 25px 0;
  }
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 0 12px;
  background: ${(props) => `url(${props.bgImage})`} no-repeat center center;
  background-size: 20px 20px;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #202124;
  margin-left: 20px;
`;

function Nav() {
  const [isHover, setIsHover] = useState(false);

  const navIcons = [
    { image: lightIcon, title: 'Notes' },
    { image: archiveIcon, title: 'Archive' },
  ];

  let icons;

  if (isHover) {
    icons = navIcons.map((icon, i) => (
      <NavItem key={i}>
        <Icon bgImage={icon.image} />
        <Title>{icon.title}</Title>
      </NavItem>
    ));
  }

  if (!isHover) {
    icons = navIcons.map((icon, i) => <Icon key={i} bgImage={icon.image} />);
  }

  return (
    <NavContainer
      isHover={isHover}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {icons}
    </NavContainer>
  );
}

export default Nav;
