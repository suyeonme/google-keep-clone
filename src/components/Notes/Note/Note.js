import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../../store/actions/notes';

import './Note.scss';
import Toolbar from './Toolbar/Toolbar';

const Note = props => {   
    const dispatch = useDispatch();

    const handleDeleteNote = () => {
        dispatch(deleteNote(props.id))
        //props.onRemoveNote(props.id)
        props.onRemoveBackdrop();
    };

    const [isHovered, setIsHovered] = useState(false);

    const handlerHover = () => setIsHovered(true);
    const handlerUnHover = () => setIsHovered(false);

    const handleExpandNote = (e) => {
        if (e.target.nodeName !== 'IMG') props.onSelect(props.id);  
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
    if (props.checkIndex) classes = `Note clicked`;

    return(
        <div 
        className={classes} 
        onClick={handleExpandNote} 
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
            { isHovered && <Toolbar onRemove={handleDeleteNote} onExpand={props.checkIndex} /> }
            
        </div>
    );
};

export default Note;