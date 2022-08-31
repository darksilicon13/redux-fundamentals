import { client } from '../../api/client';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     status: 'idle',
//     entities: {},
// }

// function nextTodoId(todos) {
//     const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
//     return maxId + 1;
// }

// export const loadingTodos = () => {
//     return { type: 'todos/todosLoading' }
// }

// export const loadedTodos = (payload) => {
//     return { type: 'todos/todosLoaded', payload };
// }

// export const addTodo = (payload) => {
//     return { type: 'todos/todoAdded', payload }
// }

// export const toggleTodo = (payload) => {
//     return { type: 'todos/todoToggled', payload }
// }

// export const selectColor = ({ todoId, color }) => {
//     return { type: 'todos/colorSelected', payload: { todoId, color } }
// }

// export const deleteTodo = (payload) => {
//     return { type: 'todos/todoDeleted', payload }
// }

// export const completeAll = () => {
//     return { type: 'todos/allCompleted' }
// }

// export const clearCompleted = () => {
//     return { type: 'todos/completedCleared' }
// }


// // use the initialState as a default value
// export default function todosReducer(state = initialState, action = {}) {
//     // The reducer normally looks at the action type field to decide what happens
//     switch (action.type) {
//         // Do something here based on the different types of actions
//         case 'todos/todosLoading': {
//             return { ...state, status: 'loading' }
//         }
//         case 'todos/todosLoaded': {
//             const newEntities = {};
//             action.payload.forEach(todo => {
//                 newEntities[todo.id] = todo
//             })

//             return { ...state, status: 'idle', entities: newEntities };
//         }
//         case 'todos/todoAdded': {
//             const todo = action.payload;
//             return {
//                 ...state,
//                 entities: { ...state.entities, [todo.id]: todo },
//             };
//         }
//         case 'todos/todoToggled': {
//             const todoId = action.payload;
//             const todo = state.entities[todoId];
//             return {
//                 ...state,
//                 entities: {
//                     ...state.entities,
//                     [todoId]: {
//                         ...todo,
//                         completed: !todo.completed,
//                     }
//                 }
//             }
//         }
//         case 'todos/colorSelected': {
//             const { todoId, color } = action.payload;
//             const todo = state.entities[todoId];
//             return {
//                 ...state,
//                 entities: {
//                     ...state.entities,
//                     [todoId]: {
//                         ...todo,
//                         color,
//                     }
//                 }
//             }
//         }
//         case 'todos/todoDeleted': {
//             const newEntities = { ...state.entities };
//             delete newEntities[action.payload];
//             return {
//                 ...state,
//                 entities: newEntities,
//             }
//         }
//         case 'todos/allCompleted': {
//             const newEntities = { ...state.entities };
//             Object.values(newEntities).forEach(todo => {
//                 newEntities[todo.id] = {
//                     ...todo,
//                     completed: true
//                 }
//             })
//             return {
//                 ...state,
//                 entities: newEntities
//             }
//         }
//         case 'todos/completedCleared': {
//             const newEntities = { ...state.entities };
//             Object.values(newEntities).forEach(todo => {
//                 if (todo.completed) {
//                     delete newEntities[todo.id];
//                 }
//             })
//             return {
//                 ...state,
//                 entities: newEntities
//             }
//         }
//         default:
//             // If this reducer doesn't recognize the action type, or doesn't 
//             // care about this specific action, return the existing state unchanaged
//             return state;
//     }
// }

// // Thunk function
// export async function fetchTodos(dispatch, getState) {
//     dispatch(todosLoading());
//     const response = await client.get('/fakeApi/todos');
//     dispatch(todosLoaded(response.todos));
// }



// export function saveNewTodo(text) {
//     return async function saveNewTodoThunk(dispatch, getState) {
//         const initialTodo = { text };
//         const response = await client.post('/fakeApi/todos', { todo: initialTodo });
//         dispatch(todoAdded(response.todo));
//     }
// }



// Redux Toolkit


const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
    status: 'idle'
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await client.get('/fakeApi/todos');
    return response.todos;
})

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async (text) => {
    const initialTodo = { text };
    const response = await client.post('/fakeApi/todos', { todo: initialTodo });
    return response.todo;
})

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todosLoading: (state) => {
            state.status = 'loading';
        },
        todosLoaded: (state, action) => {
            action.payload.forEach(todo => {
                state.entities[todo.id] = todo
            })
            state.status = 'idle';
        },
        todoAdded: (state, action) => {
            const todo = action.payload;
            state.entities[todo.id] = todo;
        },
        todoToggled: (state, action) => {
            const todoId = action.payload;
            const todo = state.entities[todoId]
            todo.completed = !todo.completed
        },
        colorSelected: (state, action) => {
            const { todoId, color } = action.payload;
            state.entities[todoId].color = color;
        },
        todoDeleted: todosAdapter.removeOne,
        allCompleted: (state) => {
            Object.values(state.entities).forEach(todo => {
                todo.completed = true;
            })
        },
        completedCleared: (state) => {
            const completedIds = Object.values(state.entities)
                .filter(todo => todo.completed)
                .map(todo => todo.id)

            todosAdapter.removeMany(state, completedIds);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                const newEntities = {};
                action.payload.forEach(todo => {
                    newEntities[todo.id] = todo
                })
                state.entities = newEntities;
                state.status = 'idle';
            })
            .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
    }
})

export const {
    todosLoading,
    todosLoaded,
    todoAdded,
    todoToggled,
    todoDeleted,
    colorSelected,
    allCompleted,
    completedCleared } = todoSlice.actions;

export default todoSlice.reducer;

