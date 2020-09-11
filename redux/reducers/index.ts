import { combineReducers, composeReducers } from 'redoodle';
import userDetailsReducer from './userDetailsReducer';
import restaurantsReducer from './restaurantsReducer';

const reducers = { userDetails: userDetailsReducer, restaurants: restaurantsReducer };

const combinedReducers = combineReducers(reducers);
export const rootReducer = composeReducers(combinedReducers);
