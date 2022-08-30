import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/modules/todosSlice';

const Header = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleChange = e => setText(e.target.value);

    const handleKeyDown = e => {
        const trimmedText = text.trim();

        if (e.key === 'Enter' && trimmedText) {
            dispatch(addTodo(trimmedText));
            setText('');
        }
    }

    return (
        <header className='header'>
            <input
                className='new-todo'
                type="text"
                placeholder='What needs to be done?'
                autoFocus={true}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </header>
    );
}

export default Header;