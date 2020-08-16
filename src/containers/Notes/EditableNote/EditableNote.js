import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle, NoteContent } from '../Note/NoteElements';
import { saveEditedNote } from '../../../store/actions/notes';

const EditableNote = ({ title, content, id, bgColor, clicked }) => {
    // Initial Value
    const [editedNote, setEditedNote] = useState({ 
        title: title, 
        content: content, 
        id: id, 
        bgColor: bgColor
    });

    const dispatch = useDispatch();

    // Update Value
    useEffect(() => {
        setEditedNote({
            title: title, 
            content: content, 
            id: id, 
            bgColor: bgColor
        });

    }, [title, content, id, bgColor]);

    // ISSUE !!
    // Change text and color, text is reverted to previous value.
    useEffect(() => {
        dispatch(saveEditedNote(editedNote)); 
    }, [dispatch, editedNote]);

    const handleUpdateNote= e => {
        const value = e.target.innerText;
        const name = e.target.id;
        setEditedNote({ ...editedNote, [name]: value});
    };

    return(
        <EditNote
        spellCheck="true">
            <NoteTitle
            id="title"
            placeholder="Title"
            clicked={clicked}
            onInput={handleUpdateNote}
            contentEditable
            suppressContentEditableWarning={true}>
                {title}
            </NoteTitle>
            <NoteContent
            id="content"
            placeholder="Note"
            clicked={clicked}
            onInput={handleUpdateNote}
            contentEditable
            suppressContentEditableWarning={true}>
                {content}
            </NoteContent>
        </EditNote>
    );
};

// Styles
const EditNote = styled.div`
    cursor: text;
`;

export default EditableNote;