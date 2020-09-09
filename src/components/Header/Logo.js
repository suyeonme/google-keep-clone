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
  font-weight: ${(props) => (props.path ? '400' : '300')};
`;

function Logo(props) {
  let path = props.location.pathname.slice(1);
  if (path === 'notes' || path === '') path = 'keep';

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <LogoContainer href="/">
      {path === 'keep' && <LogoImg src={LogoIcon} alt="Logo" />}
      <LogoText path={path === 'keep' ? path : null}>
        {capitalizeFirstLetter(path)}
      </LogoText>
    </LogoContainer>
  );
}

export default React.memo(withRouter(Logo));
