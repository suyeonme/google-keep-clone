import React  from 'react';
import { useDispatch } from 'react-redux';

import { changeColorNote } from '../../store/actions/notes'; 
import styled from 'styled-components';

const ColorPalette = props => {
    const dispatch = useDispatch();

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

    return (
        <ColorPaletteContainer
        onMouseEnter={props.onHover}
        onMouseLeave={props.onUnHover}>
            { colors.map((color, index) => <ColorPaletteBtn 
            color={color}
            key={index}
            //onClick={() => dispatch(changeColorNote(color))}
            />
            )}
        </ColorPaletteContainer>
    );
};

// Styles
const ColorPaletteContainer = styled.div`
    max-width: 128px;
    padding: .5rem;
    position: absolute;
    bottom: 33px;
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

export default ColorPalette;
