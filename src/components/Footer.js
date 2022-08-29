import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodos } from '../redux/reducer';
import { availableColors, capitalize } from './colors';

const Footer = () => {

    const todos = useSelector(selectTodos).length;


    const colorFilters = availableColors.map(color=> (
        <li>
            <input type='checkbox' />
            <div className='color-block' style={{"backgroundColor": color}}></div>
            <string>{capitalize(color)}</string>
        </li>
    ))

    return (
        <footer className='footer'>
            <div className='actions'>
                <h5>Actions</h5>
                <button className='button'>Mark All Completed</button>
                <button className='button'>Clear Completed</button>
            </div>
            <div className='todo-count'>
                <h5>Remaining Todos</h5>
                <strong>{todos}</strong> item left
            </div>
            <div className='filters statusFilters'>
                <h5>Filter by Status</h5>
                <ul>
                    <li><button className='selected'>All</button></li>
                    <li><button>Active</button></li>
                    <li><button>Completed</button></li>
                </ul>
            </div>
            <div className='filters colorFilters'>
                <h5>Filter by Color</h5>
                <ul>
                    {colorFilters}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;