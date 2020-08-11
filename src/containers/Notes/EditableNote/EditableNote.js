import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

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
            <EditNoteTitle
            id="title"
            placeholder="Title"
            onInput={handleUpdateNote}
            contentEditable
            suppressContentEditableWarning={true}>
            {props.title}
            </EditNoteTitle>
            <EditNoteContent
            id="content"
            placeholder="Note"
            onInput={handleUpdateNote}
            contentEditable
            suppressContentEditableWarning={true}>
            {props.content}
            </EditNoteContent>
        </EditNote>
    );
};

// Styles
const EditNote = styled.div`
    cursor: text;
`;

const EditNoteTitle = styled.div`
    font-size: 2.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    padding: 12px 12px 0 12px;
    outline: 0px solid transparent;

    &:empty::before{
        content:attr(placeholder);
        color:#80868A;
    }
`;

const EditNoteContent = styled.div`
    font-size: 1.7rem; 
    line-height: 1.5;
    padding: 12px 12px 0 12px;
    outline: 0px solid transparent;

    &:empty::before{
        content:attr(placeholder);
        color:#80868A;
    }
`;

export default EditableNote;




