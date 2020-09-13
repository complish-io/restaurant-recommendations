import { Reducer } from 'redux';
import { Business } from '../../services/yelp';

const initialState: Business[] = [];

const restaurantsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case `GET_RESTAURANTS_PENDING`:
      return state;

    case `GET_RESTAURANTS_FULFILLED`:
      return action.payload;

    default:
      return state;
  }
};

export default restaurantsReducer;
