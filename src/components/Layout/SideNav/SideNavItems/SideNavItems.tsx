import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { dbService } from 'fbase';

import EditLabel from 'containers/Label/EditLabel/EditLabel';
import lightIcon from 'icons/light.svg';
import archiveIcon from 'icons/archive.svg';
import penIcon from 'icons/pen.svg';
import labelIcon from 'icons/label.svg';
import { RootState } from 'store/reducers/index';
import { LabelObj as Label } from 'shared/types';
import { initLabels } from 'store/actions/notes';

const Link = styled(NavLink)<{ ishover?: string }>`
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

const IconContainer = styled('div')<{ bgImage: string }>`
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

const Container = styled('div')<{ ishover: string }>`
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

interface NavMenuProp {
  ishover: boolean;
  openNav: (bool: boolean) => void;
}

interface NavItemProp {
  image: string;
  link: string;
  title?: string;
  id?: string;
}

function NavMenu({ ishover, openNav }: NavMenuProp) {
  const [showEditLabel, setShowEditLabel] = useState(false);
  const labels = useSelector((state: RootState) => state.notes.labels);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dbService
      .collection('labels')
      .onSnapshot((snapshot) => {
        const labels = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          // ...doc.data(),
        }));
        dispatch(initLabels(labels));
      });
    return () => unsubscribe();
  }, [dispatch]);

  let labelIcons;
  let navIcons;
  const labelItems: NavItemProp[] = labels.map((label: Label) => {
    return {
      id: label.id,
      image: labelIcon,
      title: label.name,
      link: `/label/${label.name}`,
    };
  });
  const navItems: NavItemProp[] = [
    { image: lightIcon, title: 'Notes', link: '/' },
    { image: archiveIcon, title: 'Archive', link: '/archive' },
    { image: penIcon, title: 'Edit labels', link: '' },
  ];

  const handleClick = (): void => {
    openNav(false);
    setShowEditLabel(true);
  };

  if (ishover) {
    labelIcons = labelItems.map((label: NavItemProp) => (
      <Item key={label.id}>
        <Link to={label.link} exact={true} ishover={ishover.toString()}>
          <IconContainer bgImage={label.image} />
          <Title>{label.title}</Title>
        </Link>
      </Item>
    ));

    navIcons = navItems.map((icon: NavItemProp) => {
      if (icon.link !== '') {
        return (
          <Item key={icon.title}>
            <Link to={icon.link} exact={true} ishover={ishover.toString()}>
              <IconContainer bgImage={icon.image} />
              <Title>{icon.title}</Title>
            </Link>
          </Item>
        );
      } else {
        return (
          <Item key={icon.title}>
            <Container ishover={ishover.toString()} onClick={handleClick}>
              <IconContainer bgImage={icon.image} />
              <Title>{icon.title}</Title>
            </Container>
          </Item>
        );
      }
    });
  }

  if (!ishover) {
    labelIcons = labelItems.map((label: NavItemProp) => (
      <Item key={label.id}>
        <Link to={label.link} exact={true}>
          <IconContainer bgImage={label.image} />
        </Link>
      </Item>
    ));

    navIcons = navItems.map((icon: NavItemProp) => {
      if (icon.link !== '') {
        return (
          <Item key={icon.image}>
            <Link to={icon.link} exact={true}>
              <IconContainer bgImage={icon.image} />
            </Link>
          </Item>
        );
      } else {
        return (
          <Item key={icon.image}>
            <Container ishover={ishover.toString()} onClick={handleClick}>
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
        {navIcons}
        {labelItems.length > 0 && labelIcons}
      </ul>
      {showEditLabel && <EditLabel showNav={setShowEditLabel} />}
    </>
  );
}

export default React.memo(NavMenu);
