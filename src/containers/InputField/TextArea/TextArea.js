// TODO
// Add new checkList if user typing
// When value is not empty, add new component
// if value is exist, it is editable. And update new value
// Save content to the state
// Add feature on toolbar button

import React from 'react';
import { InputTextArea } from '../InputElements';
import CheckList from '../../../components/CheckList/CheckList';

function TextArea({ isChecked, value, onChange, onChangeTodo }) {
  const handleLineBreak = (val) => {
    let lineBreaks = val.replace(/\n/g, '<br>') || [];
    lineBreaks = lineBreaks.split('<br>');
    return lineBreaks;
  };

  const contentArr = value ? handleLineBreak(value) : [];
  let children;

  if (!isChecked) {
    return (
      <InputTextArea
        name="content"
        value={value}
        placeholder="Take a note..."
        rows="2"
        isChecked={isChecked}
        onChange={onChange}
      />
    );
  }

  /*   if (isChecked && value && contentArr.length > 0) {
    children = contentArr.reduce((acc, cur, i) => {
      return (
        <>
          {acc}
          <CheckList
            key={i}
            size="small"
            placeholder="List item"
            content={cur}
            onChangeTodo={onChangeTodo}
          />
        </>
      );
    });
    return children;
  } */

  if (isChecked && !value) {
    return (
      <CheckList
        size="small"
        placeholder="List item"
        onChangeTodo={onChangeTodo}
      />
    );
  }

  return null;
}

export default TextArea;

//NOTE Recent
/* function TextArea({ isChecked, value, onChange }) {
  const handleLineBreak = (val) => {
    let lineBreaks = val.replace(/\n/g, '<br>') || [];
    lineBreaks = lineBreaks.split('<br>');
    return lineBreaks;
  };

  if (!isChecked) {
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

  if (isChecked && value) {
    const contentArr = handleLineBreak(value);
    // contentArr.length === 0 ? <CheckList size="small" placeholder="List item" />;
    // else

    const children = contentArr.map((c, i) => (
      <CheckList key={i} size="small" placeholder="List item" content={c} />
    ));

    return children;
  }

  if (isChecked && !value) {
    return <CheckList size="small" placeholder="List item" />;
  }

  return null;
}

export default TextArea; */

/* NOTE original
import React from 'react';
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
