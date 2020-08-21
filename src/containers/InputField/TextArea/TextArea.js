import React from 'react';
import { InputTextArea } from '../InputElements';
import CheckList from '../../../components/CheckList/CheckList';

function TextArea({ isOpen, isChecked, value, onChange }) {
  if (isOpen && !isChecked) {
    return (
      <InputTextArea
        name="content"
        value={value}
        placeholder={isChecked ? 'List Item' : 'Take a note...'}
        rows="2"
        onChange={onChange}
        isChecked={isChecked}
      />
    );
  }

  if (isOpen && isChecked) {
    return <CheckList size="small" placeholder="List item" />;
  }

  return null;
}

export default TextArea;
