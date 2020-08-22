// TODO
// Convert note.content(textarea) to block div(contentEditable) if content exist
// Add block div(contentEditable) to note.content(value)  if content doesn't exist and click checkbox

import React, { useState } from 'react';
import { InputTextArea } from '../InputElements';
import CheckList from '../../../components/CheckList/CheckList';

function TextArea({ isOpen, isChecked, value, onChange }) {
  const [numCheckList, setNumCheckList] = useState(0);

  // Add new div onInput
  //const checkItems = [];
  /*   for (let i = 0; i < numCheckList; i++) {
    checkItems.push(
      <CheckList key={i} size="small" placeholder="List item" number={i} />,
    );
  } */

  /*   let timeout = useState(0);   
const handleType = () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      handleAddItem();
    }, 300);
  }; */

  const handleAddItem = () => {
    setNumCheckList(numCheckList + 1);
  };

  const handleLineBreak = (val) => {
    let lineBreaks = val.replace(/\n/g, '<br>') || [];
    let lineBreakArr = lineBreaks.split('<br>');
    return lineBreakArr;
  };

  let children;

  if (value) {
    const contentArr = handleLineBreak(value);

    children = contentArr.map((c, i) => (
      <CheckList
        key={i}
        size="small"
        placeholder="List item"
        content={c}
        //onInput={handleType}
      />
    ));
  }

  if (isOpen && !isChecked) {
    return (
      <InputTextArea
        name="content"
        value={value}
        onChange={onChange}
        placeholder="Take a note..."
        rows="2"
        isChecked={isChecked}
      />
    );
  }

  if (isOpen && isChecked && children !== '') {
    return { children };

    /*     return (
      children !== ''?
      children : 
      <CheckList size="small" placeholder="List item" />
    ) */
  }

  if (isOpen && isChecked && children === '') {
    return <CheckList size="small" placeholder="List item" />;
  }

  return null;
}

export default TextArea;

/* import React from 'react';
import { InputTextArea } from '../InputElements';
import CheckList from '../../../components/CheckList/CheckList';

function TextArea({ isOpen, isChecked, value, onChange }) {
  if (isOpen && !isChecked) {
    return (
      <InputTextArea
        name="content"
        value={value}
        placeholder="Take a note..."
        rows="2"
        onChange={onChange}
        isChecked={isChecked}
      />
    );
  }

  if (isOpen && isChecked) {
    return <CheckList size="small" placeholder="List item"/>;
  }

  return null;
}

export default TextArea; */
