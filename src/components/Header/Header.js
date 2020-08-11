import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';

const Header = props => {
    return(
        <HeaderContainer>
            <Logo />
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    width: 100%;
    min-height: 9vh;
    background-color: inherit;
    border-bottom: 1px solid rgba(66, 66, 66, .2);
    display: flex;
    align-items: center;
`;

export default Header;