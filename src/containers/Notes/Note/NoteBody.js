import React from 'react';
import { NoteTitle, NoteContent } from './NoteElements';

const NoteDetail = ({ clicked, title, content }) => {
    const truncateText = p => {
        let text;
        if (p.length > 120) {
            text =  p.substr(0, 120)
        } else {
            text = p;
        }
        return text;
    };

    return ( 
        <div clicked={clicked}>
            <NoteTitle>{title}</NoteTitle>
            <NoteContent>{truncateText(content)}</NoteContent>
        </div>
    );
};

export default NoteDetail;