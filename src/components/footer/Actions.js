import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCompleted, completeAll } from '../../redux/modules/todosSlice';

const Actions = () => {
    const dispatch = useDispatch();

    const completedAllTodos = () => {
        dispatch(completeAll());
    }

    const completedAllClear = () => {
        dispatch(clearCompleted());
    }

    return (
        <div className='actions'>
            <h5>Actions</h5>
            <button
                className='button'
                onClick={completedAllTodos
                }
            >Mark All Completed</button>
            <button
                className='button'
                onClick={completedAllClear}
            >Clear Completed</button>
        </div>
    );
}

export default Actions;