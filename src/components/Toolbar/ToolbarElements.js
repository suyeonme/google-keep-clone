import styled from 'styled-components';

export const ToolbarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    margin-top: 20px;
    line-height: 0;
    opacity: ${props => props.hoverd ? 1 : 0};
    transition: opacity .3s ease-out;
`;

export const ToolbarIcon = styled.img`
        width: 15px;
        height: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
`;

export const ToolbarBtn = styled.button`
        position: relative;
        background-color: transparent; 
        border-radius: 50%;
        width: 32px;
        height: 32px;

        &:hover {  
            opacity: .87;
            background-color: rgba(95,99,104,0.157);
        }
`;