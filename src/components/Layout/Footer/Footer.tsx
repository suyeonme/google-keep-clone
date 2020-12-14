import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  color: rgb(122, 122, 122);
`;

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <FooterContainer>
      <Copyright> Copyright &copy; {currentYear} </Copyright>
    </FooterContainer>
  );
};

export default Footer;
