import React from 'react';
import { authService, firebaseInstance } from 'fbase';

import AuthForm from 'components/AuthForm/AuthForm';

const Auth = () => {
  const handleClickSocial = async (e: any) => {
    const { name } = e.target;
    let provider: any;

    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await authService.signInWithPopup(provider);
  };

  return <AuthForm onClick={handleClickSocial} />;
};

export default Auth;
