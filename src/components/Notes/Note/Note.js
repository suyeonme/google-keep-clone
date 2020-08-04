import React, { useRef, useState } from 'react';
import './Note.scss';

import Toolbar from './Toolbar/Toolbar';

const Note = props => {   
    const [isHovered, setIsHovered] = useState(false);

    // Note on hover
    const onHover = () => setIsHovered(true);
    const onUnHover = () => setIsHovered(false);

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
        content = <p suppressContentEditableWarning={true} contentEditable="true">{props.content}</p>;
    } else {
        content = <p>{truncateText(props.content)}</p>;
    };
    
    // Class
    let classes = `Note`;
    if (props.checkIndex) classes = `Note Clicked`;

    return(
        <div className={classes} onClick={onClickNote} onMouseEnter={onHover} onMouseLeave={onUnHover}>
            <h1>{props.title}</h1>
            { content }
            { isHovered && <Toolbar removed={onRemoveNote} /> }
        </div>
    );
};

export default Note;