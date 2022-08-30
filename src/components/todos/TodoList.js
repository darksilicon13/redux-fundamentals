import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodos } from '../../redux/reducer';
import TodoListItem from './TodoListItem';

const TodoList = () => {

    console.log("TodoList rendered");
    const todos = useSelector(selectTodos);

    const loadingStatus = useSelector(state => state.todos.status);


    if (loadingStatus === 'loading') {
        return (
            <div className='todo-list'>
                <div className='loader' />
            </div>
        )
    }
    const renderedTodos = todos.map(todo => (
        <TodoListItem key={todo.id} {...todo} />
    ));
    return (
        <ul className='todo-list'>
            {renderedTodos}
        </ul>
    );
}

export default TodoList;