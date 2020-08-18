import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectNote } from '../../../store/actions/notes';

import NoteBody from './NoteBody';
import { NoteContainer } from './NoteElements';
import Toolbar from '../../../components/Toolbar/Toolbar';
import EditableNote from '../EditableNote/EditableNote';

const Note = ({ note }) => {   
    const selectedNote = useSelector(state => state.selectedNote);
    const [isHovered, setIsHovered] = useState(false);

    const dispatch = useDispatch();
    const handlerHover = () => setIsHovered(true);
    const handlerUnHover = () => setIsHovered(false);
    const handleDeleteNote = () => dispatch(deleteNote(note.id));
    const handleSelectNote = e => {
        // Select note when not clicked a delete button
        if(e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') {
            dispatch(selectNote(note.id));    
        };
    };

    // NOTE BODY
    let noteBody;
    const isClickedNote = selectedNote === note.id; 

    if (isClickedNote) {
        noteBody = <EditableNote 
        note={note}
        clicked={isClickedNote ? 1 : 0}
        />;
    } else {
        noteBody = <NoteBody 
        title={note.title} 
        content={note.content} 
        clicked={isClickedNote ? 1 : 0}
        />
    };

    return (
        <NoteContainer
        onClick={handleSelectNote} 
        onMouseEnter={handlerHover} 
        onMouseLeave={handlerUnHover} 
        bgColor={note.bgColor}
        clicked={isClickedNote ? 1 : 0}> 
            { noteBody }
            <Toolbar 
            id={note.id}
            onRemove={handleDeleteNote} 
            onHover={isHovered}
            /> 
        </NoteContainer>
    );
};

export default Note;


