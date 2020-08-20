import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectNote } from '../../../store/actions/notes';

import NoteBody from './NoteBody';
import { NoteContainer } from './NoteElements';
import Toolbar from '../../../components/Toolbar/Toolbar';
import EditableNote from '../EditableNote/EditableNote';

function Note({ note }) {
    const { id, bgColor } = note;
    const selectedNote = useSelector(state => state.selectedNote);
    const [isHovered, setIsHovered] = useState(false);

    const dispatch = useDispatch();
    const handleSelectNote = e => {
        if (e.target.nodeName !== 'BUTTON' && !selectedNote) {
            dispatch(selectNote(id));
        }
    };

    const isClickedNote = selectedNote === id;

    return (
        <NoteContainer
            onClick={handleSelectNote}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            bgColor={bgColor}
            clicked={isClickedNote ? 1 : 0}>
            {' '}
            {isClickedNote ? (
                <EditableNote note={note} clicked={isClickedNote ? 1 : 0} />
            ) : (
                <NoteBody note={note} clicked={isClickedNote ? 1 : 0} />
            )}{' '}
            <Toolbar id={id} onRemove={() => dispatch(deleteNote(id))} onHover={isHovered} />{' '}
        </NoteContainer>
    );
}

export default Note;
