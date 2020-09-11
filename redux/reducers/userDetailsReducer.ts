import { Reducer } from 'redux';
import { UserDetails } from '../appState';

const initialState = {
  coordinates: {
    latitude: undefined,
    longitude: undefined,
  },
  location: {
    neighborhood: undefined,
    locality: undefined,
  },
};

const userDetailsReducer: Reducer<UserDetails> = (state = initialState, action) => {
  switch (action.type) {
    case `GET_USER_COORDINATES_PENDING`:
      return state;

    case `GET_USER_COORDINATES_FULFILLED`:
      return {
        ...state,
        coordinates: action.payload,
      };

    case `GET_USER_LOCATION_PENDING`:
      return state;

    case `GET_USER_LOCATION_FULFILLED`:
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
};

export default userDetailsReducer;
