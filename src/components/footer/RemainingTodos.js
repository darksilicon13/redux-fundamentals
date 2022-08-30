import React from 'react';
import { useSelector } from 'react-redux';
const RemainingTodos = () => {

    const todos = useSelector(state=>Object.values(state.todos.entities))
        .filter(todo => !todo.completed)
        .length;
    const suffix = todos === 1 ? '' : 's'


    return (
        <div className='todo-count'>
            <h5>Remaining Todos</h5>
            <strong>{todos}</strong> item{suffix} left
        </div>
    );
}

export default RemainingTodos;