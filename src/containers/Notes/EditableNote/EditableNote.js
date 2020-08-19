import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle, NoteContent } from '../Note/NoteElements';
import { saveEditableNote } from '../../../store/actions/notes';

const EditNote = styled.div`
    cursor: text;
`;

function EditableNote({ note }){
    const [editableNote, setEditableNote] = useState(note);
    const { title, content } = editableNote;
    
    useEffect(() => setEditableNote(note), [note]);

    const dispatch = useDispatch();
    const handleUpdateNote = e => {
        const name = e.target.id;
        const value = e.target.innerText;
        setEditableNote({ ...editableNote, [name]: value});
    };

    return(
        <EditNote
        spellCheck="true">
            <NoteTitle
            id="title"
            placeholder="Title"
            onInput={handleUpdateNote}
            onBlur={() => dispatch(saveEditableNote(editableNote))}
            contentEditable
            suppressContentEditableWarning={true}>
                {title}
            </NoteTitle>
            <NoteContent
            id="content"
            placeholder="Note"
            onInput={handleUpdateNote}
            onBlur={() => dispatch(saveEditableNote(editableNote))}
            contentEditable
            suppressContentEditableWarning={true}>
                {content}
            </NoteContent>
        </EditNote>
    );
}

export default EditableNote;


/* TODO
* Remove Style of NoteTitle and NoteContent
* Style ContentEditable
* Update State
*/
/* import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable'

import { saveEditableNote } from '../../../store/actions/notes';

const EditNote = styled.div`
    cursor: text;
`;

function EditableNote({ note }){
    //const [editableNote, setEditableNote] = useState(note.title);
    const [editableNote, setEditableNote] = useState(note);
    const titleRef = useRef();
    const contentRef = useRef();
    
    // useEffect(() => setEditableNote(note), [note]);

    const dispatch = useDispatch();

    const handleChangeTitle = e => {
        setEditableNote({ ...editableNote, title: e.target.value });
    };
    const handleChangeContent = e => {
        setEditableNote({ ...editableNote, content: e.target.value });
    };

    const handleBlur = () => {
        dispatch(saveEditableNote(editableNote));
    };

    return(
        <EditNote>
            <ContentEditable
            innerRef={titleRef}
            html={editableNote.title}
            onChange={handleChangeTitle}
            onBlur={handleBlur}
            />
            <ContentEditable
            innerRef={contentRef}
            html={editableNote.content}
            onChange={handleChangeContent}
            onBlur={handleBlur}
            />
        </EditNote>
    );
}

export default EditableNote; */