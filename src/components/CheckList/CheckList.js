import React, { useState } from 'react';
import styled from 'styled-components';

import { NoteTitle } from '../../containers/Notes/Note/NoteElements';
import PlusIcon from '../../icons/plus.svg';

const CheckItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  cursor: text;
  margin-top: 1.3rem;
  border-top: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
  border-bottom: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
`;

const CheckItem = styled.div`
  width: 20px;
  margin-right: 1rem;
  background: url(${PlusIcon}) center center no-repeat;
  background-size: 50%;
`;

// Change plus icon to checkbox onChange
// Create new row onChange

function CheckList({ size, placeholder }) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <CheckItemContainer>
      <CheckItem />
      <NoteTitle
        size={size}
        placeholder={placeholder}
        isFocus={isFocus}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        contentEditable
      />
    </CheckItemContainer>
  );
}

export default CheckList;
