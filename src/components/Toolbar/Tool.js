import React from 'react';
import styled, { css } from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip';

export const ToolbarBtn = styled.button`
        border-radius: 50%;
        width: 28px;
        height: 28px;
        background: ${props => `url(${props.bgImage})`} no-repeat center center;
        background-size: 50%;
        &:not(:first-child) { margin: 0 10px; }

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
            onMouseEnter={showPalette} 
            onMouseLeave={hidePalette}
            onClick={clicked}
            bgImage={bgImage}
            isInputField={isInputField}
            />
        </Tooltip>
        </>
    );
};

export default Tool;


