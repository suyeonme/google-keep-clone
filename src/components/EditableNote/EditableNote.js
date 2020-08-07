import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './EditableNote.scss';
import { saveEditedNote } from '../../store/actions/notes';

const EditableNote = props => {
    const [editedNote, setEditedNote] = useState({title: '', content: '', id: props.id});
    const dispatch = useDispatch();

    // It need to be enhanced
    const handleChangeTitle = e => {
        setEditedNote({ ...editedNote, title: e.target.innerText });
        dispatch(saveEditedNote(editedNote));
    };

    const handleChangeContent = e => {
        setEditedNote({ ...editedNote, content: e.target.innerText });
        dispatch(saveEditedNote(editedNote));
    };

    return(
        <div 
        className="EditableNote" 
        spellCheck="true">
            <div
            className="EditableNote__title"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleChangeTitle}>{props.title}</div>

            <div
            className="EditableNote__content"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleChangeContent}>{props.content}</div>
        </div>
    );
};

export default EditableNote;