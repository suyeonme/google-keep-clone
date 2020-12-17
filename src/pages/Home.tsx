import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dbService } from 'fbase';

import { initNotes } from 'store/actions/notes';
import InputField from 'containers/InputField/InputField';
import Notes from 'components/Notes/Notes';
import styled from 'styled-components';
import { searchNote } from 'shared/utility';
import NoMatching from 'components/UI/NoMatching/NoMatching';

import { RootState } from 'store/reducers';
import { Note } from 'shared/types';

const Container = styled.div`
  position: relative;
`;

function Home() {
  const notes = useSelector((state: RootState) => state.notes.notes).filter(
    (note: Note) => note.isArchived === false,
  );
  const query = useSelector((state: RootState) => state.view.searchQuery);
  const dispatch = useDispatch();
  const searchedNotes = searchNote(query, notes);

  useEffect(() => {
    const unsubscribe = dbService.collection('notes').onSnapshot((snapshot) => {
      const noteArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        isChecked: doc.data().isChecked,
        isPinned: doc.data().isPinned,
        isArchived: doc.data().isArchived,
        bgColor: doc.data().bgColor,
        content: doc.data().content,
        labels: doc.data().labels,
        // ...doc.data(),
      }));

      dispatch(initNotes(noteArr));
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (query !== '' && searchedNotes.length > 0) {
    return (
      <Container>
        <InputField />
        <Notes notes={searchedNotes} />
      </Container>
    );
  }

  if (query !== '' && searchedNotes.length === 0) {
    return <NoMatching text="No matching results." />;
  }

  return (
    <Container>
      <InputField />
      <Notes notes={notes} />
    </Container>
  );
}

export default Home;
