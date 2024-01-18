import { combineReducers } from '@reduxjs/toolkit';
import postReducer from './post';

const rootReducer = combineReducers({
  posts: postReducer,
});

export default rootReducer;