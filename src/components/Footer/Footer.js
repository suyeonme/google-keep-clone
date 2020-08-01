import React from 'react';
import './Footer.scss';

const Footer = props => {
    const currentYear = new Date().getFullYear();

    return(
        <div className="Footer">
            <p>Copyright &copy; {currentYear}</p>
        </div>
    );
};

export default Footer;