import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodos } from '../redux/reducer';
import TodoListItem from './TodoListItem';

const TodoList = () => {

    const todos = useSelector(selectTodos);

    const renderedTodos = todos.map(todo => (
        <TodoListItem key={todo.id} {...todo}/>
    ));
    return ( 
        <ul className='todo-list'>
        {renderedTodos}
        </ul>
     );
}
 
export default TodoList;