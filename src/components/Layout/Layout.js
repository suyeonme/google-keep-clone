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
  display: ${(props) => !props.userObj && 'flex'};
  align-items: ${(props) => !props.userObj && 'center'};
`;

function Layout(props) {
  const { userObj } = props;

  return (
    <Container>
      <Content userObj={userObj}>
        <Header userObj={userObj} />
        {props.children}
        <FlashMessage />
      </Content>
      <Footer />
    </Container>
  );
}

Layout.propTypes = {
  userObj: PropTypes.object,
};

export default Layout;
