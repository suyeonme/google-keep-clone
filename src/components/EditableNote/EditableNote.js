import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './EditableNote.scss';
import { saveEditedNote } from '../../store/actions/notes';

const EditableNote = props => {
    const [editedNote, setEditedNote] = useState({ title: props.title, content: props.content, id: props.id });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(saveEditedNote(editedNote));
    }, [editedNote]);

    const getValue = e => {
        const value = e.target.innerText;
        const name = e.target.id;
        setEditedNote({ ...editedNote, [name]: value});
    };

    return(
        <div 
        className="EditableNote" 
        spellCheck="true">
            <div
            className="EditableNote__title"
            id="title"
            onInput={getValue}
            contentEditable
            suppressContentEditableWarning={true}
            >{props.title}</div>
            <div
            className="EditableNote__content"
            id="content"
            onInput={getValue}
            contentEditable
            suppressContentEditableWarning={true}
            >{props.content}</div>
        </div>
    );
};

export default EditableNote;