import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import FlashMessage from 'components/UI/FlashMessage/FlashMessage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  display: ${(props) => !props.isLoggedIn && 'flex'};
  align-items: ${(props) => !props.isLoggedIn && 'center'};
`;

function Layout(props) {
  const { isLoggedIn } = props;

  return (
    <Container>
      <Content isLoggedIn={isLoggedIn}>
        <Header isLoggedIn={isLoggedIn} />
        {props.children}
        <FlashMessage />
      </Content>

      <Footer />
    </Container>
  );
}

Layout.propTypes = {
  isLoggedIn: PropTypes.object,
};

export default Layout;
