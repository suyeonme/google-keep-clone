/* import React, { useState } from 'react';
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

export default EditableNote; */

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './EditableNote.scss';
import { saveEditedNote } from '../../store/actions/notes';

const EditableNote = props => {
    const titleRef = useRef();
    const contentRef = useRef();
    const dispatch = useDispatch();
    const [editedNote, setEditedNote] = useState({ title: props.title, content: props.content, id: props.id });

    useEffect(() => {
        titleRef.onChange((e) => {
            const value = e.target.innerHTML
            setEditedNote({ ...editedNote, type: value});
        })
    }, [editedNote]);

    const getValue = (e, type) => {
        const value = e.target.innerText;
        setEditedNote({ ...editedNote, type: value});
        console.log(editedNote)
    };

    return(
        <div 
        className="EditableNote" 
        spellCheck="true">
            <div
            className="EditableNote__title"
            contentEditable
            suppressContentEditableWarning={true}

            ref={titleRef}
            // onInput={e => console.log(e.target.innerText)}
            //onInput={updateTitle}
            >{props.title}</div>

            <div
            className="EditableNote__content"
            contentEditable
            suppressContentEditableWarning={true}

            ref={contentRef}
            //onInput={e => console.log(e.target.innerText)}
            >{props.content}</div>
        </div>
    );
};

export default EditableNote;