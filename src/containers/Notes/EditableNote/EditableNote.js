import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle, NoteContent } from '../Note/NoteElements';
import { saveEditableNote } from '../../../store/actions/notes';

// STYLE
const EditNote = styled.div`
    cursor: text;
`;

const EditableNote = ({ note }) => {
    const dispatch = useDispatch();

    const [editableNote, setEditableNote] = useState({ 
        title: note.title, 
        content: note.content, 
        id: note.id, 
        bgColor: note.bgColor
    });

    useEffect(() => {
    // REVIEW Update editable note whenever its value is changed
    // It comes from props. So it doesn't update right away after chainging value 
        setEditableNote({
            title: note.title, 
            content: note.content, 
            id: note.id, 
            bgColor: note.bgColor
        });
    }, [note.title, note.content, note.id, note.bgColor]);

    useEffect(() => {
    // FIXME  Change text and color, text is reverted to previous value.
        dispatch(saveEditableNote(editableNote)); 
    }, [dispatch, editableNote]);

    const handleUpdateNote= e => {
        const value = e.target.innerText;
        const name = e.target.id;
        setEditableNote({ ...editableNote, [name]: value});
    };

    return(
        <EditNote
        spellCheck="true">
            <NoteTitle
            id="title"
            placeholder="Title"
            onInput={handleUpdateNote}
            contentEditable
            suppressContentEditableWarning={true}>
                {note.title}
            </NoteTitle>
            <NoteContent
            id="content"
            placeholder="Note"
            onInput={handleUpdateNote}
            contentEditable
            suppressContentEditableWarning={true}>
                {note.content}
            </NoteContent>
        </EditNote>
    );
};

export default EditableNote;