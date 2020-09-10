import React from 'react';
import PropTypes from 'prop-types';

import { NoteTitle, NoteContent } from './NoteElements';
import TodoList from '../../components/TodoList/TodoList';
import { convertNoteToTodo } from '../../shared/utility';
import Tool from '../../components/Toolbar/Tool';

function NoteBody({ note, clicked, isHovered, isArchived }) {
  const { title, content, id, isChecked, isPinned } = note;

  // // FIXME
  // const truncateText = (p) => {
  //   let text;
  //   p.length > 120 ? (text = p.substr(0, 120)) : (text = p);
  //   return text;
  // };

  return (
    <div clicked={clicked}>
      {isHovered && (
        <Tool
          id={id}
          title="Pin Note"
          notePin
          isPinned={isPinned}
          isArchived={isArchived}
        />
      )}
      <NoteTitle>{title}</NoteTitle>
      {isChecked ? (
        <TodoList todoContent={() => convertNoteToTodo(content)} />
      ) : (
        <NoteContent>{content}</NoteContent>
      )}
    </div>
  );
}

NoteBody.propTypes = {
  note: PropTypes.object.isRequired,
  clicked: PropTypes.number.isRequired,
  isHovered: PropTypes.bool,
  isArchived: PropTypes.bool,
};

export default React.memo(NoteBody);
