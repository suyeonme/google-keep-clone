import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 1.6rem;
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface NoMatchingProp {
  text: string;
}

const NoMatching = ({ text }: NoMatchingProp) => {
  return <Wrapper>{text}</Wrapper>;
};

export default NoMatching;
