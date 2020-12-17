import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dbService } from 'fbase';
import { RouteComponentProps } from 'react-router-dom';

import Notes from 'components/Notes/Notes';
import { searchNote } from 'shared/utility';
import NoMatching from 'components/UI/NoMatching/NoMatching';
import { RootState } from 'store/reducers';
import { Note } from 'shared/types';

interface MatchParams {
  labelName: string;
}

const LabelPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const { labelName } = match.params;
  const [notes, setNotes] = useState<Note[]>([]);
  const query = useSelector((state: RootState) => state.view.searchQuery);
  const searchedNotes = searchNote(query, notes);

  useEffect(() => {
    const unsubscribe = dbService.collection('notes').onSnapshot((snapshot) => {
      const labeledNotes = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          isChecked: doc.data().isChecked,
          isPinned: doc.data().isPinned,
          isArchived: doc.data().isArchived,
          bgColor: doc.data().bgColor,
          content: doc.data().content,
          labels: doc.data().labels,
        }))
        .filter((note: Note) => note.labels.includes(labelName));
      setNotes(labeledNotes);
    });
    return () => unsubscribe();
  }, [labelName]);

  if (query !== '' && searchedNotes.length > 0) {
    return <Notes notes={searchedNotes} />;
  }

  if (query !== '' && searchedNotes.length === 0) {
    return <NoMatching text="No matching results." />;
  }

  return <Notes notes={notes} />;
};

export default LabelPage;
