import React from 'react';
import styled, { css } from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip';

// STYLE
const ToolbarBtn = styled.button`
        border-radius: 50%;
        width: 28px;
        height: 28px;
        background: ${props => `url(${props.bgImage})`} no-repeat center center;
        background-size: 50%;
        margin-right: 10px;

        &:hover {  
            opacity: .87;
            background-color: rgba(95,99,104,0.157);
        }

        ${({ isInputField }) => isInputField && css`
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
        `}
`;

const Tool = ({ 
    title, 
    ariaLabel, 
    bgImage, 
    clicked, 
    showPalette, 
    hidePalette, 
    isInputField 
}) => {
    return (
        <>
        <Tooltip
        title={title} 
        aria-label={ariaLabel} 
        arrow>
            <ToolbarBtn
            bgImage={bgImage}
            isInputField={isInputField}
            onMouseEnter={showPalette} 
            onMouseLeave={hidePalette}
            onClick={clicked}
            />
        </Tooltip>
        </>
    );
};

export default Tool;


