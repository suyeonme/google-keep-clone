import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, selectNote, saveNote } from '../../../store/actions/notes';

import contentEditable from '../../../components/ContentEditable/ContentEditable';
import './Note.scss';
import Toolbar from '../../../components/Toolbar/Toolbar';
import ContentEditable from '../../../components/ContentEditable/ContentEditable';

const Note = props => {   
    const selectedNoteIndex = useSelector(state => state.selectedNoteIndex);
    const isSelected = useSelector(state => state.isSelected);
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
    if (!isSelected) {
        content = truncateText(props.content);
    } else {
        content = props.content;
    }
    
    // DEFINE CLASS
    let classes = `Note`;
    if (selectedNoteIndex === props.id) classes = `Note clicked`;

    return(
        
        <div 
        className={classes} 
        onClick={handleSelectNote} 
        onMouseEnter={handlerHover} 
        onMouseLeave={handlerUnHover}>
            <ContentEditable title={props.title} content={props.content} />
            { isHovered && <Toolbar onRemove={handleDeleteNote} onExpand={selectedNoteIndex === props.id} /> }
        </div>
    );
};

export default Note;

