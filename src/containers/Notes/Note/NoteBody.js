import React from 'react';
import { NoteTitle, NoteContent } from './NoteElements';

function NoteDetail({ note, clicked }) {
  const { title, content } = note;

  const truncateText = (p) => {
    let text;
    p.length > 120 ? (text = p.substr(0, 120)) : (text = p);
    return text;
  };

  return (
    <div clicked={clicked}>
      <NoteTitle size="medium">{title}</NoteTitle>
      <NoteContent>{truncateText(content)}</NoteContent>
    </div>
  );
}

export default NoteDetail;
