import React, { useState } from 'react';

import Backdrop from '../UI/Backdrop';
import Note from './Note/Note';
import './Note/Note.scss';

const Notes = props => {
    const [showBackdrop, setShowBackdrop] = useState(false); 
    const [isSelected, setIsSelected] = useState(null); // Select each note for styling

    const handleSelectNote = index => {
        setIsSelected(index);
        setShowBackdrop(true)
    };
    
    const handleUnSelectNote = () => {
        setIsSelected(null);
        setShowBackdrop(false);
    };

    const notes = props.noteList.map((note, index) => <Note 
            title={note.title} 
            content={note.content} 
            id={index}
            key={index} 
            checkIndex={isSelected === index} 
            onSelect={handleSelectNote}
            onRemoveNote={props.onRemove}  
            onRemoveBackdrop={handleUnSelectNote} />
    );

    return (
        <div className="Notes">
            {notes}
            <Backdrop onClick={handleUnSelectNote} onShow={showBackdrop} />
        </div>
    );
};

export default Notes;


