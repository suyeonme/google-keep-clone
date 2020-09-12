import React from 'react';
import styled from 'styled-components';

import { TodoItemInput as Input } from '../../../../components/TodoList/TodoInput/TodoInput';
import Tool from '../../../Toolbar/Tool/Tool';

const ItemContainer = styled.div`
  width: 100%;
  height: 45px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function EditLabelItem({ label, bgFIrst, bgSecond, placeholder }) {
  return (
    <ItemContainer>
      <Tool title="Delete label" bgImage={bgFIrst} editLabel />
      <Input placeholder={placeholder} editLabel />
      <Tool title="Rename label" bgImage={bgSecond} editLabel />
    </ItemContainer>
  );
}

export default EditLabelItem;
