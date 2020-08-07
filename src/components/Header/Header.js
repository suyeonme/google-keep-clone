import React from 'react';
import './Header.scss';

import Logo from '../../icons/light.svg';

const Header = props => {
    return(
        <div className="Header">
            <img src={Logo} alt="Logo"/>
            <h3>Keep</h3>
        </div>
    );
};

export default Header;