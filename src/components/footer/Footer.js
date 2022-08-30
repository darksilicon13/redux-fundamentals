import React from 'react';
import Actions from './Actions';
import ColorFilter from './ColorFilter';
import RemainingTodos from './RemainingTodos';
import StatusFilter from './StatusFilter';

const Footer = () => {

    return (
        <footer className='footer'>
            <Actions />
            <RemainingTodos />
            <StatusFilter />
            <ColorFilter />
        </footer>
    );
}

export default Footer;