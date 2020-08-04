import React from 'react';
import './Backdrop.scss';

const Backdrop = props => (
    <div className="Backdrop" onClick={props.clicked}></div>
);

export default Backdrop;

