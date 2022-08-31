import React from 'react';
import { useDispatch } from 'react-redux';
import { allCompleted, completedCleared } from '../../redux/modules/todosSlice';

const Actions = () => {
    const dispatch = useDispatch();

    const completedAllTodos = () => {
        dispatch(allCompleted());
    }

    const completedAllClear = () => {
        dispatch(completedCleared());
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