import { combineReducers } from 'redux'

import todosReducer from "./todosSlice";
import filtersReducer from "./filtersSlice";


const rootReducer = combineReducers({
    todos: todosReducer(state.todos, action),
    filters: filtersReducer(state.filters, action)
})

export default rootReducer;