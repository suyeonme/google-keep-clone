/* import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectNote } from '../../../store/actions/notes';

import NoteDetail from './NoteDetail';
import { NoteContainer } from './NoteElements';
import Toolbar from '../../../components/Toolbar/Toolbar';
import EditableNote from '../EditableNote/EditableNote';

const Note = props => {   
    const selectedNoteIndex = useSelector(state => state.selectedNoteIndex);
    const color = useSelector(state => state.color);
    const isSelected = useSelector(state => state.isSelected); 

    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);
    const handlerHover = () => setIsHovered(true);
    const handlerUnHover = () => setIsHovered(false);

    const handleDeleteNote = () => {
        dispatch(deleteNote(props.id))
    };

    const handleSelectNote = e => {
        if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') dispatch(selectNote(props.id));
    };

    // NOTE DETAIL
    let noteDetail;

    if (selectedNoteIndex !== null) {
        noteDetail = <EditableNote 
        id={props.id} 
        title={props.title} 
        content={props.content}
        clicked={selectedNoteIndex === props.id ? 1 : 0}  
        />;
    } else {
        noteDetail = <NoteDetail 
        title={props.title} 
        content={props.content} 
        clicked={selectedNoteIndex === props.id ? 1 : 0} 
        />
    };

    return (
        <NoteContainer
        onClick={handleSelectNote} 
        onMouseEnter={handlerHover} 
        onMouseLeave={handlerUnHover}
        color={color}
        clicked={selectedNoteIndex === props.id ? 1 : 0}
        > 
            { noteDetail }
            <Toolbar 
            onRemove={handleDeleteNote} 
            onHover={isHovered}

            id={props.id}
            /> 
        </NoteContainer>
    );
};

export default Note; */


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectNote } from '../../../store/actions/notes';

import NoteBody from './NoteBody';
import { NoteContainer } from './NoteElements';
import Toolbar from '../../../components/Toolbar/Toolbar';
import EditableNote from '../EditableNote/EditableNote';

const Note = props => {   
    const selectedNote = useSelector(state => state.selectedNote);
    const isSelected = useSelector(state => state.isSelected); 
    const color = useSelector(state => state.color);

    const [isHovered, setIsHovered] = useState(false);
    //const handlerHover = () => setIsHovered(true);
    //const handlerUnHover = () => setIsHovered(false);
    const handlerHover = () => setIsHovered(!isHovered);
    
    const dispatch = useDispatch();
    const handleDeleteNote = () => dispatch(deleteNote(props.id));

    const handleSelectNote = e => {
        if(e.target.id !== 'saveBtn' && e.target.id !== 'deleteBtn') {
            dispatch(selectNote(props.id)); 
        };
    };

    // NOTE DETAIL
    let noteBody;

    if (selectedNote === props.id) {
        noteBody = <EditableNote 
        id={props.id} 
        title={props.title} 
        content={props.content}
        clicked={selectedNote === props.id ? 1 : 0}  
        />;
    } else {
        noteBody = <NoteBody 
        title={props.title} 
        content={props.content} 
        clicked={selectedNote=== props.id ? 1 : 0} 
        />
    };

    return (
        <NoteContainer
        onClick={handleSelectNote} 
        //onMouseEnter={handlerHover} 
        //onMouseLeave={handlerUnHover}
        onMouseEnter={handlerHover} 
        onMouseLeave={handlerHover}
        color={color}
        clicked={selectedNote === props.id ? 1 : 0}> 
            { noteBody }
            <Toolbar 
            onRemove={handleDeleteNote} 
            onHover={isHovered}

            id={props.id}
            /> 
        </NoteContainer>
    );
};

export default Note;



