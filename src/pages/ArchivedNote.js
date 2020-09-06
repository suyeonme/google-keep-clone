import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Archive from '../icons/archive.svg';
import NotesContainer from '../containers/Notes/Note/Note';
import Note from '../containers/Notes/Note/Note';

const ArchiveIcon = styled.div`
  width: 95px;
  height: 95px;
  opacity: .2;
  background: url(${Archive})} no-repeat center center;
  background-size: cover;
  margin: 20px;
`;

const Text = styled.p`
  color: #80868b;
  font-size: 2.3rem;
  line-height: 1.75rem;
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Show warning when click button on InputField
// Delete archived note
// Unarchived

function ArchivedNote(props) {
  const archives = useSelector((state) => state.archives);
  let notes;

  if (archives.length === 0) {
    notes = (
      <Container>
        <ArchiveIcon />
        <Text>Your archived notes appear here</Text>
      </Container>
    );
  }

  if (archives.length > 0) {
    const noteList = archives.map((note) => <Note note={note} key={note.id} />);
    notes = <NotesContainer>{noteList}</NotesContainer>;
  }

  return <div>{notes}</div>;
}

export default ArchivedNote;
