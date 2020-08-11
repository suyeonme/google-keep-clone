import React from 'react';
import styled from 'styled-components';

import LogoIcon from '../../icons/light.svg';

const Logo = props => {
    return (
        <LogoContainer>
            <LogoImg src={LogoIcon} alt="Logo"/>
            <LogoText>Keep</LogoText>
        </LogoContainer>
    );
};

// Styles
const LogoContainer = styled.div`
    display: flex;
`;

const LogoImg = styled.img`
        margin-left: 3rem;
        margin-right: 1rem;
`;

const LogoText = styled.h3`
        color: #5f6368; 
        font-size: 2.3rem;
        font-weight: 300;
`;

export default Logo;