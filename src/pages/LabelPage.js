import React from 'react';
import { useSelector } from 'react-redux';

import Notes from 'components/Notes/Notes';

const LabelPage = ({ match }) => {
  const {
    params: { labelId },
  } = match;

  const notes = useSelector((state) => state.notes.notes).filter((note) =>
    note.labels.includes(labelId),
  );

  return <Notes notes={notes} />;
};

export default React.memo(LabelPage);
