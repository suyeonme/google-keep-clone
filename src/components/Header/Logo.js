import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import LogoIcon from '../../icons/logo.svg';

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImg = styled.img`
  width: 47px;
  height: 47px;
  margin-bottom: 4px;
  padding-right: 4px;
`;

const LogoText = styled.span`
  font-size: 22px;
  line-height: 24px;
  color: #5f6368;
  padding-left: 4px;
`;

function Logo(props) {
  let path = props.location.pathname.slice(1);
  if (path === 'notes' || path === '') path = 'keep';

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <LogoContainer href="/">
      <LogoImg src={LogoIcon} alt="Logo" />
      <LogoText>{capitalizeFirstLetter(path)}</LogoText>
    </LogoContainer>
  );
}

export default withRouter(Logo);
