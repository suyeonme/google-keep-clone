import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dbService } from 'fbase';

import { initNotes } from 'store/actions/notes';
import InputField from 'containers/InputField/InputField';
import Notes from 'components/Notes/Notes';
import styled from 'styled-components';
import { searchNote } from 'shared/utility';
import NoMatching from 'components/UI/NoMatching/NoMatching';

const Container = styled.div`
  position: relative;
  ${'' /* z-index: -1; */}
`;

function Home() {
  const notes = useSelector((state) => state.notes.notes).filter(
    (note) => note.isArchived === false,
  );
  const query = useSelector((state) => state.view.searchQuery);
  const dispatch = useDispatch();
  const searchedNotes = searchNote(query, notes);

  useEffect(() => {
    dbService.collection('notes').onSnapshot((snapshot) => {
      const noteArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(initNotes(noteArr));
    });
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

export default React.memo(Home);
