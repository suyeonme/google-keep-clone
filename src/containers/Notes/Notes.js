import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Note from './Note/Note';
import Backdrop from '../../components/UI/Backdrop';

const NotesContainer = styled.div`
  width: calc(100% - 80px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  justify-content: end;
  grid-gap: 15px;
  grid-auto-rows: minmax(min-cotent, auto);
  grid-auto-flow: dense;
  padding: 0 40px;
  margin-left: auto;
`;

function Notes(props) {
  const notes = useSelector((state) => state.notes);
  const noteList = notes.map((note) => <Note note={note} key={note.id} />);

  return (
    <NotesContainer>
      {noteList}
      <Backdrop />
    </NotesContainer>
  );
}

export default Notes;
