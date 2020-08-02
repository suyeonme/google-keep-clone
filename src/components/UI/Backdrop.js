import React from 'react';
import './Backdrop.scss';

const Backdrop = props => (
    <div className="Backdrop" onClick={props.show}></div>
);

export default Backdrop;
