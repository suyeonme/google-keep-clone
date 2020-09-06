import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Archive from '../icons/archive.svg';

import { NotesContainer } from '../containers/Notes/Notes';
import Note from '../containers/Notes/Note/Note';
import Backdrop from '../components/UI/Backdrop';

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

function ArchivedNote(props) {
  const archives = useSelector((state) => state.archives);

  if (archives.length === 0) {
    return (
      <Container>
        <ArchiveIcon />
        <Text>Your archived notes appear here</Text>
      </Container>
    );
  }

  if (archives.length > 0) {
    const noteList = archives.map((note) => <Note key={note.id} note={note} />);

    return (
      <NotesContainer>
        {noteList}
        <Backdrop />
      </NotesContainer>
    );
  }
}

export default ArchivedNote;
