import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle, NoteContent } from '../Note/NoteElements';
import { saveEditedNote } from '../../../store/actions/notes';

const EditableNote = props => {
    const [editedNote, setEditedNote] = useState({ title: props.title, content: props.content, id: props.id });

    const dispatch = useDispatch();

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
            clicked={props.clicked}
            onInput={handleUpdateNote}
            contentEditable
            suppressContentEditableWarning={true}>
                {props.title}
            </NoteTitle>
            <NoteContent
            id="content"
            placeholder="Note"
            clicked={props.clicked}
            onInput={handleUpdateNote}
            contentEditable
            suppressContentEditableWarning={true}>
                {props.content}
            </NoteContent>
        </EditNote>
    );
};

// Styles
const EditNote = styled.div`
    cursor: text;
`;

export default EditableNote;




