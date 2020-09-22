import React from 'react';
import { authService, firebaseInstance } from 'fbase';

import AuthForm from 'components/Auth/AuthForm/AuthForm';

function Auth() {
  const handleClickSocial = async (e) => {
    const { name } = e.target;
    let provider;
    console.log(e.target.name);

    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await authService.signInWithPopup(provider);
  };

  return <AuthForm onClick={handleClickSocial} />;
}

export default Auth;
