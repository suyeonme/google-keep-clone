import React from 'react';

import { NoteTitle, NoteContent } from './NoteElements';
import TodoList from '../../components/TodoList/TodoList';
import { convertNoteToTodo } from '../../shared/utility';
import Tool from '../../components/Toolbar/Tool';
import PinIcon from '../../icons/pin.svg';

function NoteBody({ note, clicked, isHovered }) {
  const { title, content, isChecked } = note;

  // FIXME
  const truncateText = (p) => {
    let text;
    p.length > 120 ? (text = p.substr(0, 120)) : (text = p);
    return text;
  };

  return (
    <div clicked={clicked}>
      {isHovered && <Tool title="Pin Note" bgImage={PinIcon} notePin />}
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
