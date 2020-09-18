import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FlashMessage from '../UI/FlashMessage/FlashMessage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
`;

function Layout(props) {
  return (
    <Container>
      <Content>
        <Header />
        {props.children}
        <FlashMessage />
      </Content>

      <Footer />
    </Container>
  );
}

export default Layout;
