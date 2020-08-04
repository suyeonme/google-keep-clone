import React, { useRef } from 'react';
import './Note.scss';

import Icon from '../../../icons/trash-can.svg'

const Note = props => {   
    const btnRef = useRef();

    const truncateText = p => {
        let text;
        (p.length > 120) ?  text =  p.substr(0, 120) + '...' : text = p;
        return text;
    };

    const onClickNote = e => {
        if (e.target !== btnRef.current) props.selected(props.id);
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
    
    /// Class
    let classes = `Note`;
    if (props.checkIndex) classes = `Note Clicked`;

    return(
        <div className={classes} onClick={onClickNote}>
            <h1>{props.title}</h1>
            { content }
            <button onClick={onRemoveNote}>
                <img src={Icon} alt="Delete Icon" ref={btnRef} />
            </button>
        </div>
    );
};

export default Note;
