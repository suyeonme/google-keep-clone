import React, { useState } from 'react';
import './Note.scss';

import Toolbar from './Toolbar/Toolbar';

const Note = props => {   
    const [isHovered, setIsHovered] = useState(false);

    const handlerHover = () => setIsHovered(true);
    const handlerUnHover = () => setIsHovered(false);

    const truncateText = p => {
        let text;
        (p.length > 120) ?  text =  p.substr(0, 120) + '...' : text = p;
        return text;
    };

    const onClickNote = (e) => {
        if (e.target.nodeName !== 'IMG') props.selected(props.id);
    };

    const onRemoveNote = () => {
        props.removeNote(props.id)
        props.removeBackdrop();
    };

    // Content 
    let content;
    if (props.checkIndex) {
        content = props.content;
    } else {
        content = truncateText(props.content);
    };
    
    // Class
    let classes = `Note`;
    if (props.checkIndex) classes = `Note clicked`;

    return(
        <div 
        className={classes} 
        onClick={onClickNote} 
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
            <Toolbar removed={onRemoveNote} onHover={isHovered} />
        </div>
    );
};

export default Note;