import React, { useState } from 'react';
import styled from 'styled-components';

import { NoteTitle } from '../../containers/Notes/Note/NoteElements';
import Plus from '../../icons/plus.svg';

const CheckItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  cursor: text;
  border-top: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
  border-bottom: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
  &:first-of-type {
    margin-top: 1.2rem;
  }
`;

const PlusIcon = styled.div`
  width: 20px;
  height: 100%;
  margin-right: 1rem;
  background: url(${Plus}) center center no-repeat;
  background-size: 50%;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
`;

// TODO
// if isChecked is true, change each row of textArea to <checkItemContainer />
// Add new <CheckItemContainer /> onChange
// Save title and content
// Add a todoItem to an array onBlur(reducer)
// Add functions (delete, check, drag)

function CheckList({ size, placeholder, content, onInput, onChange }) {
  const [isFocus, setIsFocus] = useState(false);
  // const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    //setIsTyping(true);
    onInput();
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <CheckItemContainer isFocus={isFocus}>
      {/* {!isTyping ? <PlusIcon /> : <Checkbox type="checkbox" />} */}
      {content !== '' ? <Checkbox type="checkbox" /> : <PlusIcon />}
      <NoteTitle
        size={size}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={handleBlur}
        onInput={() => onInput()}
        contentEditable
        suppressContentEditableWarning="true"
      >
        {content && content}
      </NoteTitle>
    </CheckItemContainer>
  );
}

export default CheckList;

/* function CheckList({ size, placeholder }) {
  const [isFocus, setIsFocus] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = e => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsFocus(false)
  };

  return (
    <CheckItemContainer isFocus={isFocus}>
      { 
        !isTyping ? 
        <PlusIcon /> : 
        <Checkbox type="checkbox" /> 
      }
      <NoteTitle
        size={size}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={handleBlur}
        onInput={handleChange}
        contentEditable
      />
    </CheckItemContainer>
  );
} */
