import { AnyAction } from 'redux';
import { Coordinates } from '../appState';
import { yelpApiClient } from '../../services/yelp';

interface GetRestaurantsParams extends Required<Coordinates> {
  categories?: string;
  term?: string;
}

export const getRestaurants = ({
  latitude,
  longitude,
  categories = 'restaurants',
  term = '',
}: GetRestaurantsParams): AnyAction => {
  const promise = yelpApiClient
    .getRestaurants({
      latitude,
      longitude,
      categories,
      term,
    })
    .then((response) => {
      const { businesses } = response.data;
      return businesses;
    });
  return {
    type: 'GET_RESTAURANTS',
    payload: promise,
  };
};
