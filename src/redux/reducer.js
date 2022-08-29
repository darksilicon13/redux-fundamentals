import { combineReducers } from 'redux'

import todosReducer from "./modules/todosSlice";
import filtersReducer from "./modules/filtersSlice";


const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer
})

export default rootReducer;

export const selectTodos = state => state.todos;

export const selectCompletedTodos = state => state.todos.filter(todo => todo.completed);

export const selectTotalCompletedTodos = state => {
    const completedTodos = state.todos.filter(todo => todo.completed);
    return completedTodos.length;
}