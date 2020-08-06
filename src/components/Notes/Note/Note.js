import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectNote } from '../../../store/actions/notes';

import './Note.scss';
import Toolbar from './Toolbar/Toolbar';

const Note = props => {   
    const selectedNoteIndex = useSelector(state => state.selectedNoteIndex);
    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);
    const handlerHover = () => setIsHovered(true);
    const handlerUnHover = () => setIsHovered(false);

    const handleDeleteNote = () => {
        dispatch(deleteNote(props.id))
    };

    const handleSelectNote = e => {
        if (e.target.nodeName !== 'IMG') dispatch(selectNote(props.id));
    };

    const truncateText = p => {
        let text;
        (p.length > 120) ?  text =  p.substr(0, 120) + '...' : text = p;
        return text;
    };

    // CONTENT
    let content;
    if (props.checkIndex) {
        content = props.content;
    } else {
        content = truncateText(props.content);
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
            <h1 
            contentEditable="true" 
            suppressContentEditableWarning={true} // Check 
            spellCheck="true">{props.title}</h1>
            <div 
            contentEditable="true" 
            suppressContentEditableWarning={true}
            spellCheck="true">
                { content }
            </div>
            { isHovered && <Toolbar onRemove={handleDeleteNote} onExpand={selectedNoteIndex === props.id} /> }
        </div>
    );
};

export default Note;