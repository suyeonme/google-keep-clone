import React, { useState } from 'react';

import Github from 'icons/github.svg';
import Google from 'icons/google.svg';
import {
  Container,
  Form,
  FormInput,
  FormLabel,
  FormTitle,
  SubmitBtn,
  FormBtn,
  SocialsContainer,
  BtnContainer,
  IconContainer,
  SocialLogInTitle,
} from 'components/Auth/AuthForm/AuthFormElements';

const SocialIcon = (icon) => {
  const { bgColor, img, name } = icon.icon;

  return (
    <IconContainer bgColor={bgColor}>
      <img src={img} alt={name} />
    </IconContainer>
  );
};

function AuthForm() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [newAccount, setNewAccout] = useState(true);
  const [error, setError] = useState('');
  const { email, password } = userInfo;

  const socialIcons = [
    { name: 'Google', img: Google, bgColor: '#3B5998' },
    { name: 'Github', img: Github, bgColor: '#211F1F' },
  ];
  const handleToggle = () => setNewAccout((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   let data;
    //   if (newAccount) {
    //     data = await authService.createUserWithEmailAndPassword(
    //       email,
    //       password,
    //     );
    //   } else {
    //     data = await authService.signInWithEmailAndPassword(email, password);
    //   }
    //   console.log(data);
    // } catch (error) {
    //   setError(error.message);
    // }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Sign In</FormTitle>
        <FormLabel htmlFor="email">Email Adress</FormLabel>
        <FormInput
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormLabel htmlFor="email">Password</FormLabel>
        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <SubmitBtn
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error && <span>{error}</span>}
        <FormBtn onClick={handleToggle}>
          {newAccount ? 'Sign In' : 'Create Account'}
        </FormBtn>
        <SocialsContainer>
          <SocialLogInTitle>Or</SocialLogInTitle>
          <BtnContainer>
            {socialIcons.map((icon, i) => (
              <SocialIcon icon={icon} key={i} />
            ))}
          </BtnContainer>
        </SocialsContainer>
      </Form>
    </Container>
  );
}

export default AuthForm;
