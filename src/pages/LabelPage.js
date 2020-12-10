import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dbService } from 'fbase';

import Notes from 'components/Notes/Notes';
import { searchNote } from 'shared/utility';
import NoMatching from 'components/UI/NoMatching/NoMatching';

const LabelPage = ({ match }) => {
  const {
    params: { labelName },
  } = match;

  const [notes, setNotes] = useState([]);
  const query = useSelector((state) => state.view.searchQuery);
  const searchedNotes = searchNote(query, notes);

  useEffect(() => {
    const subscribe = dbService.collection('notes').onSnapshot((snapshot) => {
      const labeledNotes = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((note) => note.labels.includes(labelName));

      setNotes(labeledNotes);
    });

    return () => subscribe();
  }, [labelName]);

  if (query !== '' && searchedNotes.length > 0) {
    return <Notes notes={searchedNotes} />;
  }

  if (query !== '' && searchedNotes.length === 0) {
    return <NoMatching text="No matching results." />;
  }

  return <Notes notes={notes} />;
};

export default React.memo(LabelPage);
