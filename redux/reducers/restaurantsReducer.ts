import { Reducer } from 'redux';

const initialState = { restaurants: undefined };

const restaurantsReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case `GET_RESTAURANTS_PENDING`:
      return state;

    case `GET_RESTAURANTS_FULFILLED`:
      return {
        restaurants: action.payload,
      };

    default:
      return state;
  }
};

export default restaurantsReducer;
