/* import React from 'react';
import './Backdrop.scss';

const Backdrop = props => {

    let classes = `Backdrop`;
    const handleRemove = () => {
        classes = `Backdrop removed`;
        props.clicked();
    }


    <div className="Backdrop" onClick={props.clicked}></div>
};

export default Backdrop;

 */

import React from 'react';

import { CSSTransition } from 'react-transition-group';
import './Backdrop.scss';

const Backdrop = props => {
    return (
        <CSSTransition
        in={props.onShow}
        timeout={300}
        unmountOnExit
        classNames="showBackdrop">
            <div className="Backdrop" onClick={props.onClick}></div>
        </CSSTransition>
    );
};

export default Backdrop;

