import React from 'react';
import { availableColors, capitalize } from './colors';

const TodoListItem = ({id, text, completed}) => {

    const colorOptions = availableColors.map(color => (
        <option key={color} value={color}>
            {capitalize(color)}
        </option>
    ))

    return ( 
        <li>
            <div key={id}>
            <input className="toggle" type="checkbox"/>
            <p className='todo-text'>{text}</p>
            <select className='colorPicker'>
                <option value=""></option>
                {colorOptions}
            </select>
            <button className='destroy'></button>
            </div>
        </li>
     );
}
 
export default TodoListItem;