import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import EditLabel from 'containers/Label/EditLabel/EditLabel';
import lightIcon from 'icons/light.svg';
import archiveIcon from 'icons/archive.svg';
import penIcon from 'icons/pen.svg';
import labelIcon from 'icons/label.svg';

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

const Item = styled.li`
  list-style: none;
`;

function NavItems({ isHover, openNav }) {
  const [showEditLabel, setShowEditLabel] = useState(false);
  const labels = useSelector((state) => state.notes.labels);

  let labelIcons;
  const labelArr = labels.map((label) => {
    return {
      image: labelIcon,
      title: label.name,
      link: `/label/${label.name}`,
    };
  });

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
    labelIcons = labelArr.map((label, i) => (
      <Item key={i}>
        <Link to={label.link} exact={true} ishover={isHover.toString()} key={i}>
          <IconContainer bgImage={label.image} />
          <Title>{label.title}</Title>
        </Link>
      </Item>
    ));

    icons = navIcons.map((icon, i) => {
      if (icon.link !== '') {
        return (
          <Item key={i}>
            <Link to={icon.link} exact={true} ishover={isHover.toString()}>
              <IconContainer bgImage={icon.image} />
              <Title>{icon.title}</Title>
            </Link>
          </Item>
        );
      } else {
        return (
          <Item key={i}>
            <Container ishover={isHover.toString()} onClick={handleClick}>
              <IconContainer bgImage={icon.image} />
              <Title>{icon.title}</Title>
            </Container>
          </Item>
        );
      }
    });
  }

  if (!isHover) {
    labelIcons = labelArr.map((label, i) => (
      <Item key={i}>
        <Link to={label.link} exact={true} key={i}>
          <IconContainer bgImage={label.image} />
        </Link>
      </Item>
    ));

    icons = navIcons.map((icon, i) => {
      if (icon.link !== '') {
        return (
          <Item key={i}>
            <Link to={icon.link} exact={true}>
              <IconContainer bgImage={icon.image} />
            </Link>
          </Item>
        );
      } else {
        return (
          <Item key={i}>
            <Container ishover={isHover.toString()} onClick={handleClick}>
              <IconContainer bgImage={icon.image} />
            </Container>
          </Item>
        );
      }
    });
  }

  return (
    <>
      <ul>
        {icons}
        {labelArr.length > 0 && labelIcons}
      </ul>
      {showEditLabel && <EditLabel showNav={setShowEditLabel} />}
    </>
  );
}

NavItems.propTypes = {
  isHover: PropTypes.bool,
  openNav: PropTypes.func,
};

export default React.memo(NavItems);
