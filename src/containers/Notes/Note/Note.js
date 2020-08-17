import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectNote } from '../../../store/actions/notes';

import NoteBody from './NoteBody';
import { NoteContainer } from './NoteElements';
import Toolbar from '../../../components/Toolbar/Toolbar';
import EditableNote from '../EditableNote/EditableNote';

const Note = ({ id, title, content, bgColor }) => {   
    const selectedNote = useSelector(state => state.selectedNote);
    const [isHovered, setIsHovered] = useState(false);

    const dispatch = useDispatch();
    const handlerHover = () => setIsHovered(true);
    const handlerUnHover = () => setIsHovered(false);
    const handleDeleteNote = () => dispatch(deleteNote(id));
    const handleSelectNote = e => {
        // Select note when not clicked a delete button
        if(e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') dispatch(selectNote(id)); 
    };

    // NOTE BODY
    let noteBody;

    if (selectedNote === id) {
        noteBody = <EditableNote 
        id={id} 
        title={title} 
        content={content}
        clicked={selectedNote === id ? 1 : 0}  
        bgColor={bgColor}
        />;
    } else {
        noteBody = <NoteBody 
        title={title} 
        content={content} 
        clicked={selectedNote=== id ? 1 : 0} 
        />
    };

    return (
        <NoteContainer
        onClick={handleSelectNote} 
        onMouseEnter={handlerHover} 
        onMouseLeave={handlerUnHover} 
        clicked={selectedNote === id ? 1 : 0} 
        bgColor={bgColor}> 
            { noteBody }
            <Toolbar 
            id={id}
            onRemove={handleDeleteNote} 
            onHover={isHovered}
            /> 
        </NoteContainer>
    );
};

export default Note;



