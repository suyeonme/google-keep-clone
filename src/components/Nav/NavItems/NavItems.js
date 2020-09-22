import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import EditLabel from 'containers/Label/EditLabel/EditLabel';
import lightIcon from 'icons/light.svg';
import archiveIcon from 'icons/archive.svg';
import penIcon from 'icons/pen.svg';

const Link = styled(NavLink)`
  height: 100%;
  display: block;
  text-decoration: none;
  position: relative;
  border-radius: ${(props) => (props.ishover ? '0 25px 25px 0' : '50%')};
  width: ${(props) => (props.ishover ? '100%' : '48px')};

  &:hover {
    background-color: #f1f3f4;
  }

  &.active {
    background-color: #fef0c3;
  }
`;

const IconContainer = styled.div`
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(props) => `url(${props.bgImage})`} no-repeat center center;
  background-size: 20px 20px;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #202124;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  text-decoration: none;
  position: relative;
  border-radius: ${(props) => (props.ishover ? '0 25px 25px 0' : '50%')};
  cursor: pointer;

  &:hover {
    background-color: #f1f3f4;
  }
`;

function NavItems({ isHover, openNav }) {
  const [showEditLabel, setShowEditLabel] = useState(false);

  let icons;
  const navIcons = [
    { image: lightIcon, title: 'Notes', link: '/' },
    { image: archiveIcon, title: 'Archive', link: '/archive' },
    { image: penIcon, title: 'Edit labels', link: '' },
  ];

  const handleClick = () => {
    openNav(false);
    setShowEditLabel(true);
  };

  if (isHover) {
    icons = navIcons.map((icon, i) => (
      <li key={i}>
        {icon.link !== '' ? (
          <Link to={icon.link} exact={true} ishover={isHover.toString()}>
            <IconContainer bgImage={icon.image} />
            <Title>{icon.title}</Title>
          </Link>
        ) : (
          <Container ishover={isHover.toString()} onClick={handleClick}>
            <IconContainer bgImage={icon.image} />
            <Title>{icon.title}</Title>
          </Container>
        )}
      </li>
    ));
  }

  if (!isHover) {
    icons = navIcons.map((icon, i) => (
      <li key={i}>
        {icon.link !== '' ? (
          <Link to={icon.link} exact={true}>
            <IconContainer bgImage={icon.image} />
          </Link>
        ) : (
          <Container ishover={isHover.toString()}>
            <IconContainer bgImage={icon.image} />
          </Container>
        )}
      </li>
    ));
  }

  return (
    <>
      <ul>{icons}</ul>
      {showEditLabel && <EditLabel showNav={setShowEditLabel} />}
    </>
  );
}

NavItems.propTypes = {
  isHover: PropTypes.bool,
  openNav: PropTypes.func,
};

export default React.memo(NavItems);
