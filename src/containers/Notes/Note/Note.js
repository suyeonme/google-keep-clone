import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectNote } from '../../../store/actions/notes';

import './Note.scss';
import Toolbar from '../../../components/Toolbar/Toolbar';
import EditableNote from '../../../components/EditableNote/EditableNote';

const Note = props => {   
    // GLOBAL
    const selectedNoteIndex = useSelector(state => state.selectedNoteIndex);
    const isSelected = useSelector(state => state.isSelected);
    const dispatch = useDispatch();

    // LOCAL
    const [isHovered, setIsHovered] = useState(false);
    const handlerHover = () => setIsHovered(true);
    const handlerUnHover = () => setIsHovered(false);

    const handleDeleteNote = () => {
        dispatch(deleteNote(props.id))
    };

    const handleSelectNote = e => {
        if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') dispatch(selectNote(props.id));
    };

    const truncateText = p => {
        let text;
        (p.length > 120) ?  text =  p.substr(0, 120) + '...' : text = p;
        return text;
    };

    // NOTE DETAIL
    let noteDetail;

    if (selectedNoteIndex !== null) {
        noteDetail = <EditableNote 
        title={props.title} 
        content={props.content}
        id={props.id} />;
    } else {
        noteDetail =  <>
            <div className="Note__title">{props.title}</div>
            <div className="Note__content">{truncateText(props.content)}</div></>
    };

    // DEFINE CLASS
    let classes = `Note`;
    if (selectedNoteIndex === props.id) classes = `Note clicked`;

    return(
        
        <div 
        className={classes} 
        onClick={handleSelectNote} 
        onMouseEnter={handlerHover} 
        onMouseLeave={handlerUnHover}>
            { noteDetail }
            { isHovered && <Toolbar onRemove={handleDeleteNote} onExpand={selectedNoteIndex === props.id} /> }
        </div>
    );
};

export default Note;