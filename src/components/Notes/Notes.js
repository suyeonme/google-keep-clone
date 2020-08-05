import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Backdrop from '../UI/Backdrop';
import Note from './Note/Note';
import './Note/Note.scss';

const Notes = props => {
    // GLOBAL NOTES STATE
    const notes = useSelector(state => state.notes);

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

    const noteList = notes.map((note, index) => <Note 
            title={note.title} 
            content={note.content} 
            id={index}
            key={index} 
            
            checkIndex={isSelected === index} 
            onSelect={handleSelectNote}
            onRemoveBackdrop={handleUnSelectNote} />
    );

    return (
        <div className="Notes">
            {noteList}
            <Backdrop onClick={handleUnSelectNote} onShow={showBackdrop} />
        </div>
    );
};

export default Notes;


