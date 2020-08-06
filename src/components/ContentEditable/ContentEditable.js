import React, { useState, useDispatch } from 'react';
import { saveNote } from '../../store/actions/notes';

const ContentEditable = props => {
    const [note, setNote] = useState({title: '', content: ''});

    const handleChangeTitle = e => setNote({ ...note, title: e.target.textContent });
    const handleChangeContent = e => setNote({ ...note, content: e.target.textContent });
    console.log(note);

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

export default ContentEditable;




