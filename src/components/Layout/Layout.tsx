import React from 'react';
import styled from 'styled-components';

import Header from 'components/Layout/Header/Header';
import Footer from 'components/Layout/Footer/Footer';
import FlashMessage from 'components/UI/FlashMessage/FlashMessage';

import { UserObjType } from 'App';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled('div')<{ userObj: UserObjType }>`
  flex-grow: 1;
  display: ${(props) => !props.userObj && 'flex'};
  align-items: ${(props) => !props.userObj && 'center'};
`;

interface LayoutProp {
  userObj: UserObjType;
  children: React.ReactNode;
}

const Layout = ({ userObj, children }: LayoutProp) => {
  return (
    <Container>
      <Content userObj={userObj}>
        <Header userObj={userObj} />
        {children}
        <FlashMessage />
      </Content>
      <Footer />
    </Container>
  );
};

export default Layout;
