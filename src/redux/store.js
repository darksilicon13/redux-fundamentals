// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// const store = createStore(rootReducer, composedEnhancer);

const store = configureStore({reducer: rootReducer})

export default store;