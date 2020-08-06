import React from 'react';
import { useSelector } from 'react-redux';

import Note from './Note/Note';
import Backdrop from '../../components/UI/Backdrop';
import './Note/Note.scss';

const Notes = props => {

    // GLOBAL NOTES STATE
    const notes = useSelector(state => state.notes);

    const noteList = notes.map((note, index) => <Note 
            title={note.title} 
            content={note.content} 
            id={index}
            key={index} />
    );

    return (
        <div className="Notes">
            {noteList}
            <Backdrop />
        </div>
    );
};

export default Notes;

