import React, { useState } from 'react';
import './Note.scss';

import Icon from '../../icons/trash-can.svg';
import Backdrop from '../UI/Backdrop';

const Note = props => {
    // const [isClicked, setIsClicked] = useState(false);

    const truncateText = p => {
        let text;

        if (p.length > 120) {
            text =  p.substr(0, 120) + '...';
        } else {
            text = p;
        }
        return text;
    };

    // TEST
    // When Click body, have 'Note' class.
    // Backdrop, save button
    // Set state and local Storage
    const clickedClass = props.isClicked ? 'Clicked' : '';
    const classes = `Note ${clickedClass}`
    
    let content;
    if (props.isClicked) {
        content = <p suppressContentEditableWarning={true} contentEditable="true">{props.content}</p>;
    }  else {
        content =  <p>{truncateText(props.content)}</p>;
    };

    return(
        <div className={classes} onClick={props.clicked}>
            <h1>{props.title}</h1>
            { content }
            <button onClick={() => props.onRemove(props.id)}>
                <img src={Icon} alt="Delete Icon"/>
            </button>
        </div>
    );
};

export default Note;

