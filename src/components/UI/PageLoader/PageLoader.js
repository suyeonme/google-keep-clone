import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PageLoader = () => {
  return (
    <Container>
      <CircularProgress style={{ color: '#f3b501' }} />
    </Container>
  );
};

export default PageLoader;
