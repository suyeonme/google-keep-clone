import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import './Notes.css';

import Note from '../../containers/Notes/Note/Note';
import Backdrop from '../UI/Backdrop/Backdrop';

const NotesContainer = styled.div`
  margin: 30px 0;
`;

function Notes({ notes, isArchived }) {
  notes = notes.map((note) => (
    <Note key={note.id} note={note} isArchived={isArchived} />
  ));

  return (
    <NotesContainer>
      <Masonry breakpointCols={5} className="grid" columnClassName="col">
        {notes}
      </Masonry>
      <Backdrop />
    </NotesContainer>
  );
}

export default Notes;
