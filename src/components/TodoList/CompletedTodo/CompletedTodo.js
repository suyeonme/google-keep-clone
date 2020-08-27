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
  margin-left: 24px;
`;

const Title = styled.div`
  letter-spacing: 0.00625em;
  font-size: 1.6rem;
  line-height: 1.5;
  color: #80868a;
  padding: 0 24px 0 7px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function CompletedTodo(props) {
  const { doneTasks, children } = props;

  return (
    <div>
      <GreyLine />
      <TitleContainer>
        <ArrowIcon />
        <Title>{doneTasks} Completed items</Title>
      </TitleContainer>
      <div>{children}</div>
    </div>
  );
}

export default CompletedTodo;
