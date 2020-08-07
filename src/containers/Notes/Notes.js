import React from 'react';
import { useSelector } from 'react-redux';

import Note from './Note/Note';
import Backdrop from '../../components/UI/Backdrop';
import './Notes.scss';

const Notes = props => {

    // GLOBAL NOTES STATE
    const notes = useSelector(state => state.notes);

    const noteList = notes.map(note => <Note 
            title={note.title} 
            content={note.content} 
            id={note.id}
            key={note.id} />
    );

    return (
        <div className="Notes">
            {noteList}
            <Backdrop />
        </div>
    );
};

export default Notes;