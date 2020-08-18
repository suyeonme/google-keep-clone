import React  from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getNoteColor, changeNoteColor } from '../../store/actions/notes'; 

// STYLES
const ColorPaletteContainer = styled.div`
    max-width: 128px;
    padding: .5rem;
    position: absolute;
    bottom: ${props => props.isInputField ? '43px' : '30px' };
    left: 8px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);
    background-color: white;
`;

const ColorPaletteBtn = styled.button`
    width: 25px;
    height: 25px;
    border: 1.5px solid transparent;
    border-radius: 50%;
    margin: .2rem;
    background: ${(props) => props.color};

    &:hover { border: 1.5px solid #5F6367; }

    &:first-child {
        border: 1.5px solid #E7EAED;
        &:hover { border: 1.5px solid #5F6367; }
    }
`;

const ColorPalette = ({ id, isInputField, onHover, onUnHover }) => {    
    const colors = [
        '#fff',
        '#d9adad',
        '#84a9ac',
        '#93b5e1',
        '#e3dfc8',
        '#eebb4d',
        '#99b898',
        '#c26565',
    ];

    const dispatch = useDispatch();

    const handleChangeColor = (e, color, id) => {
        // CHANGE COLOR OF NOTE ON CLICK
        e.preventDefault();
        dispatch(getNoteColor(color)); 
        dispatch(changeNoteColor(id)); 
    };

    return (
        <ColorPaletteContainer
        isInputField={isInputField}
        onMouseEnter={onHover}
        onMouseLeave={onUnHover}>
            { colors.map((color, index) => <ColorPaletteBtn 
            color={color}
            key={index}
            onClick={(e) => handleChangeColor(e, color, id)}
            />
            )}
        </ColorPaletteContainer>
    );
};

export default ColorPalette;



