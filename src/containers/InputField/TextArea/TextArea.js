// TODO
// Add new checkList if user typing
// When value is not empty, add new component
// if value is exist, it is editable. And update new value
// Save content to the state
// Add feature on toolbar button

import React from 'react';
import { InputTextArea } from '../InputElements';
import TodoList from '../../../components/TodoList/TodoList';
import { convertNoteToTodo } from '../../../shared/utility';

function TextArea({ isChecked, content, onChange }) {
  // (isChecked && content === '')
  // (isChecked && content !== '')
  // (!isChecked);

  // TextArea
  // TodoList

  if (isChecked && !content) {
    console.log(isChecked);
    return <TodoList size="small" placeholder="List item" />;
  }

  if (isChecked && content) {
    const todos = convertNoteToTodo(content);
    return (
      <TodoList size="small" placeholder="List item" todoContent={todos} />
    );
  }

  if (!isChecked) {
    return (
      <InputTextArea
        name="content"
        value={content}
        placeholder="Take a note..."
        rows="3"
        onChange={onChange}
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
