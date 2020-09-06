import { combineReducers, composeReducers } from 'redoodle';

const reducers = {};

const combinedReducers = combineReducers(reducers);
export const rootReducer = composeReducers(combinedReducers);
