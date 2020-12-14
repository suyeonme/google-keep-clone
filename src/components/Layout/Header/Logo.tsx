import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import LogoIcon from 'icons/logo.svg';
import { capitalizeFirstLetter } from 'shared/utility';

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImg = styled.img`
  width: 4.7rem;
  height: 4.7rem;
  margin-bottom: 0.4rem;
  padding-right: 0.4rem;
`;

const LogoText = styled('span')<{ path: string }>`
  font-size: 2.2rem;
  line-height: 2.4rem;
  color: #5f6368;
  padding-left: 4px;
  font-weight: ${(props) => (props.path ? '400' : '300')};
`;

const Logo = ({ location }: RouteComponentProps) => {
  let path: string = location?.pathname.slice(1)!;
  if (path === 'notes' || path === '') path = 'keep';

  return (
    <LogoContainer href="/">
      {path === 'keep' && <LogoImg src={LogoIcon} alt="Logo" />}
      <LogoText path={path === 'keep' ? path : null}>
        {capitalizeFirstLetter(path)}
      </LogoText>
    </LogoContainer>
  );
};

export default withRouter(Logo);
