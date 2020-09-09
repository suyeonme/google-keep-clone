import React from 'react';
import styled from 'styled-components';

import Arrow from '../../../icons/arrow.svg';

const GreyLine = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 5px 24px 14px 24px;
`;

const ArrowIcon = styled.div`
  width: 20px;
  height: 20px;
  background: url(${Arrow}) center center no-repeat;
  background-size: 50%;
  margin-left: ${(props) => (props.isNote ? '11px' : ' 24px')};
`;

const Title = styled.div`
  line-height: 1.5;
  letter-spacing: 0.00625em;
  color: #80868a;
  padding: 0 24px 0 7px;
  font-size: ${(props) => (props.isNote ? '1.3rem' : '1.6rem')};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function CompletedTodo({ doneTaskCount, clicked, isNote }) {
  return (
    <div onClick={clicked}>
      <GreyLine />
      <TitleContainer>
        <ArrowIcon isNote={isNote} />
        <Title isNote={isNote}>{doneTaskCount} Completed items</Title>
      </TitleContainer>
    </div>
  );
}

export default React.memo(CompletedTodo);
