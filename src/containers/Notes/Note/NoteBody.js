import React from 'react';

import { NoteTitle, NoteContent } from './NoteElements';
import TodoList from '../../../components/TodoList/TodoList';
import { convertNoteToTodo } from '../../../shared/utility';

function NoteBody({ note, clicked }) {
  const { title, content, isChecked } = note;

  // FIXME
  const truncateText = (p) => {
    let text;
    p.length > 120 ? (text = p.substr(0, 120)) : (text = p);
    return text;
  };

  return (
    <div clicked={clicked}>
      <NoteTitle>{title}</NoteTitle>
      {isChecked ? (
        <TodoList todoContent={() => convertNoteToTodo(content)} />
      ) : (
        <NoteContent>{truncateText(content)}</NoteContent>
      )}
    </div>
  );
}

export default NoteBody;
