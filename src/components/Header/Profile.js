import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { authService } from 'fbase';
import PropTypes from 'prop-types';

import User from 'icons/user.svg';

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: auto;
`;

const SignOutBtn = styled.button`
  background: transparent;
`;

function Profile({ userObj }) {
  const [showSignOut, setShowSignOut] = useState(false);

  const { displayName, email, img } = userObj;
  const history = useHistory();

  const handleClick = () => setShowSignOut(!showSignOut);

  const handleSignOut = () => {
    authService.signOut();
    history.push('/');
  };

  if (displayName && img) {
    return (
      <>
        <Tooltip title={`${displayName} (${email})`}>
          <ProfileImg src={img} onClick={handleClick} />
        </Tooltip>
        {showSignOut && (
          <SignOutBtn onClick={handleSignOut}>Sign Out</SignOutBtn>
        )}
      </>
    );
  }

  if (!displayName && !img) {
    return (
      <>
        <Tooltip title={`${email}`}>
          <ProfileImg src={User} onClick={handleClick} />
        </Tooltip>
        {showSignOut && (
          <SignOutBtn onClick={handleSignOut}>Sign Out</SignOutBtn>
        )}
      </>
    );
  }

  return null;
}

Profile.propTypes = {
  userObj: PropTypes.object,
};

export default React.memo(Profile);
