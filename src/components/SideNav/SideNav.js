import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SideNavItems from 'components/SideNav/SideNavItems/SideNavItems';

const NavContainer = styled.nav`
  position: fixed;
  top: 7.2rem;
  left: 0;
  z-index: 5;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 8px 0 8px 8px;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  width: ${(props) => (props.isHover ? '280px' : '80px')};
  box-shadow
    ${(props) =>
      props.isHover &&
      '0 16px 10px 0 rgba(0, 0, 0, 0.14), 0 11px 18px 0 rgba(0, 0, 0, 0.12), 0 13px 5px -1px rgba(0, 0, 0, 0.2)'};

    @media (max-width: 576px) {
      width: ${(props) => (props.isHover ? '220px' : '60px')};
  }
`;

function SideNav({ isHover, onHover }) {
  return (
    <NavContainer
      isHover={isHover}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <SideNavItems isHover={isHover} openNav={onHover} />
    </NavContainer>
  );
}

NavContainer.propTypes = {
  isHover: PropTypes.bool,
  onHover: PropTypes.func,
};

export default React.memo(SideNav);
