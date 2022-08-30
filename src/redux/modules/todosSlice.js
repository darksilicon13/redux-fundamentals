const initialState = [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build Something fun!', completed: false, color: 'blue' },
]

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
    return maxId + 1;
}

export const addTodo = (payload) => {
    return {type: 'todos/todoAdded', payload}
}

export const toggleTodo = (payload) => {
    return {type: 'todos/todoToggled', payload}
}

export const selectColor = ({todoId, color}) => {
    return {type: 'todos/colorSelected', payload:{todoId, color}}
}

export const deleteTodo = (payload) => {
    return {type: 'todos/todoDeleted', payload}
}

export const completeAll = () => {
    return {type: 'todos/allCompleted'}
}

export const clearCompleted = () => {
    return {type: 'todos/completedCleared'}
}


// use the initialState as a default value
export default function todosReducer(state = initialState, action = {}) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case 'todos/todoAdded': {
            return [
                ...state,
                {
                    id: nextTodoId(state),
                    text: action.payload,
                    completed: false
                }
            ];
        }
        case 'todos/todoToggled': {
            return state.map(todo => {
                if (todo.id !== action.payload) {
                    return todo;
                }
                return { ...todo, completed: !todo.completed };
            });
        }
        case 'todos/colorSelected': {
            return state.map(todo => {
                if (todo.id !== action.payload.todoId) {
                    return todo;
                }
                return { ...todo, color: action.payload.color };
            });
        }
        case 'todos/todoDeleted': {
            return state.filter(todo =>
                todo.id !== action.payload
            );
        }
        case 'todos/allCompleted': {
            return state.map(todo => {
                return { ...todo, completed: true };
            });
        }
        case 'todos/completedCleared': {
            return state.filter(todo =>
                todo.completed === false
            )
        }
        default:
            // If this reducer doesn't recognize the action type, or doesn't 
            // care about this specific action, return the existing state unchanaged
            return state;
    }
}