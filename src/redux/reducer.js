import { combineReducers } from 'redux'

import todosReducer from "./modules/todosSlice";
import filtersReducer from "./modules/filtersSlice";


const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer
})

export default rootReducer;

export const selectTodos = state => Object.values(state.todos.entities)
.filter(todo => {
    switch(state.filters.status) {
        case 'all':
            return todo;
        case 'active':
            return !todo.completed;
        case 'completed': 
            return todo.completed;
        default:
            return null;
    }
})
.filter(todo=> {
    if(!state.filters.colors.length) {
        return todo;
    } else {
        return state.filters.colors.includes(todo.color)
    }
}
);

export const selectTotalCompletedTodos = state => {
    const completedTodos = Object.values(state.todos.entities).filter(todo => todo.completed);
    return completedTodos.length;
}