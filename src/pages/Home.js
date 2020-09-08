import React from 'react';
import { useSelector } from 'react-redux';

import InputField from '../containers/InputField/InputField';
import Notes from '../components/Notes/Notes';

function Home() {
  const notes = useSelector((state) => state.notes.notes);

  return (
    <div>
      <InputField />
      <Notes notes={notes} />
    </div>
  );
}

export default Home;
