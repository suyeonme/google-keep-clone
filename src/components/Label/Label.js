import React from 'react';
import styled from 'styled-components';

const LabelContainer = styled.div`
  ${'' /* position: absolute; */}
  z-index: 2;
  width: 225px;
  border-radius: 2px;
  font-size: 13px;
  background-color: #fff;
  padding-top: 11px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
`;

const LabelTitle = styled.h3`
  font-size: 14px;
  padding: 0 12px;
`;

function Label() {
  return (
    <LabelContainer>
      <LabelTitle>Label note</LabelTitle>
    </LabelContainer>
  );
}

export default Label;
