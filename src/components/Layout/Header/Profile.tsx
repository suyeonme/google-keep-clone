import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { authService } from 'fbase';

import User from 'icons/user.svg';
import { ToolSpan } from 'containers/Toolbar/Tool/ToolElements';
import { UserObj } from 'App';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  @media (max-width: 576px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const SignOutBtn = styled.button`
  background: transparent;
  display: block;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  text-decoration: underline;
`;

interface ProfileProp {
  userObj: UserObj;
}

const Profile = ({ userObj }: ProfileProp) => {
  const [showSignOut, setShowSignOut] = useState(false);
  const { displayName, email, img } = userObj;
  const history = useHistory();

  const handleClick = (): void => setShowSignOut(!showSignOut);

  const handleSignOut = (): void => {
    authService
      .signOut()
      .then(() => {
        console.log('User has been signout');
        history.push('/');
      })
      .catch((error) => {
        console.log('Error:' + error);
      });
  };

  if (displayName && img) {
    return (
      <Wrapper>
        <Tooltip title={<ToolSpan>{`${displayName} (${email})`}</ToolSpan>}>
          <ProfileImg src={img} onClick={handleClick} />
        </Tooltip>
        {showSignOut && (
          <SignOutBtn onClick={handleSignOut}>Sign Out</SignOutBtn>
        )}
      </Wrapper>
    );
  }

  if (!displayName && !img) {
    return (
      <Wrapper>
        <Tooltip title={`${email}`}>
          <ProfileImg src={User} onClick={handleClick} />
        </Tooltip>
        {showSignOut && (
          <SignOutBtn onClick={handleSignOut}>Sign Out</SignOutBtn>
        )}
      </Wrapper>
    );
  }

  return null;
};

export default Profile;
