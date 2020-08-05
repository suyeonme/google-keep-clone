import React, { useState } from 'react';

import Backdrop from '../UI/Backdrop';
import Note from './Note/Note';
import './Note/Note.scss';

const Notes = props => {
    const [showBackdrop, setShowBackdrop] = useState(false); // Backdrop
    const [isSelected, setIsSelected] = useState(null); // Select each note for styling

    const onSelectNote = index => {
        setIsSelected(index);
        setShowBackdrop(true)
    };
    
    const onUnSelectNote = () => {
        setIsSelected(null);
        setShowBackdrop(false);
    };

    const notes = props.noteList.map((note, index) => <Note 
            title={note.title} 
            content={note.content} 
            id={index}
            key={index} 
            checkIndex={isSelected === index} 
            selected={onSelectNote}
            removeNote={props.onRemove}  
            removeBackdrop={onUnSelectNote} />
    );

    return (
        <div className="Notes">
            {notes}
            <Backdrop onClick={onUnSelectNote} onShow={showBackdrop} />
        </div>
    );
};

export default Notes;


