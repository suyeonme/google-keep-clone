import React, { useState } from 'react';
import { authService } from 'fbase';

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
} from 'components/AuthForm/AuthFormElements';

interface Icon {
  title: string;
  img: string;
  bgColor: string;
  name: string;
}

interface SocialIconProp {
  icon: Icon;
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

interface AuthFormProp {
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const SocialIcon = ({ icon, onClick }: SocialIconProp) => {
  const { bgColor, img, title, name } = icon;

  return (
    <IconContainer bgColor={bgColor} name={name} onClick={onClick}>
      <img src={img} alt={title} name={name} />
    </IconContainer>
  );
};

const AuthForm = ({ onClick }: AuthFormProp) => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [newAccount, setNewAccout] = useState(true);
  const [error, setError] = useState('');
  const { email, password } = userInfo;

  const socialIcons: Icon[] = [
    { title: 'Google', img: Google, bgColor: '#3B5998', name: 'google' },
    { title: 'Github', img: Github, bgColor: '#211F1F', name: 'github' },
  ];
  const handleToggle = (): void => setNewAccout((prev: boolean) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
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
              <SocialIcon icon={icon} onClick={onClick} key={i} />
            ))}
          </BtnContainer>
        </SocialsContainer>
      </Form>
    </Container>
  );
};

export default React.memo(AuthForm);
