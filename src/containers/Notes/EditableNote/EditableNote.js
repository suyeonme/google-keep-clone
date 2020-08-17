import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle, NoteContent } from '../Note/NoteElements';
import { saveEditableNote } from '../../../store/actions/notes';

const EditableNote = ({ title, content, id, bgColor, clicked }) => {
    const dispatch = useDispatch();

    const [editableNote, setEditableNote] = useState({ 
        title: title, 
        content: content, 
        id: id, 
        bgColor: bgColor
    });

    // Update editable note whenever its value is changed
    // It comes from props. So it doesn't update right away after chainging value 
    useEffect(() => {
        setEditableNote({
            title: title, 
            content: content, 
            id: id, 
            bgColor: bgColor
        });

    }, [title, content, id, bgColor]);

    // ISSUE !!
    // Change text and color, text is reverted to previous value.
    useEffect(() => {
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

// STYLE
const EditNote = styled.div`
    cursor: text;
`;

export default EditableNote;