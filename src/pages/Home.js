import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dbService } from 'fbase';

import { initNotes, initLabels } from 'store/actions/notes';
import InputField from 'containers/InputField/InputField';
import Notes from 'components/Notes/Notes';

function Home() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dbService.collection('notes').onSnapshot((snapshot) => {
      const noteArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(initNotes(noteArr));
    });
  }, [dispatch]);

  useEffect(() => {
    dbService.collection('labels').onSnapshot((snapshot) => {
      const labelArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(initLabels(labelArr));
    });
  }, [dispatch]);

  return (
    <div>
      <InputField />
      <Notes notes={notes} />
    </div>
  );
}

export default React.memo(Home);
