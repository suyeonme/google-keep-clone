import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveEditedNote } from '../../store/actions/notes';

const EditableNote = props => {
    const [editedNote, setEditedNote] = useState({title: '', content: '', id: props.id});
    const dispatch = useDispatch();

    const handleChangeTitle = e => {
        setEditedNote({ ...editedNote, title: e.target.textContent });
        dispatch(saveEditedNote(editedNote));
    };

    const handleChangeContent = e => {
        setEditedNote({ ...editedNote, content: e.target.textContent });
        dispatch(saveEditedNote(editedNote));
    };

    return(
        <div>
            <div
            name="title"
            spellCheck="true"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleChangeTitle}>{props.title}</div>

            <div
            name="content"
            spellCheck="true"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleChangeContent}>{props.content}</div>
        </div>
    );
};

export default EditableNote;