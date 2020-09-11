import { ipClient } from '../../services/ip';
import { Location, Coordinates } from '../appState';
import { googlePlacesApiClient } from '../../services/googlePlaces';
import { AnyAction } from 'redux';
import { GeocodingResponse, GeocodingResult, AddressType } from 'google__maps';

export const getUserCoordinates = (): AnyAction => {
  const promise = ipClient.getUserLocation().then((response) => {
    const { lat, lon } = response.data;
    return { latitude: lat, longitude: lon };
  });
  return {
    type: 'GET_USER_COORDINATES',
    payload: promise,
  };
};

export type HasNeighborhoodOrLocality = ({ types }: { types: AddressType[] }) => void;

export type CreateLocationDict = (dict: Partial<Location>, result: GeocodingResult) => Location;
export type Type = 'neighborhood' | 'locality';

const hasNeighborhoodOrLocality: HasNeighborhoodOrLocality = ({ types }) =>
  types.includes('neighborhood') || types.includes('locality');

const createLocationDict: CreateLocationDict = (dict, result) => {
  const type = result.types[0];
  if (['neighborhood', 'locality'].includes(type)) {
    dict[type as Type] = result.address_components[0].long_name;
  }
  return dict;
};

export const getUserLocation = ({ latitude, longitude }: Required<Coordinates>): AnyAction => {
  const promise = googlePlacesApiClient.getLocationDetails({ latitude, longitude }).then((response) => {
    const { results } = (response as unknown) as GeocodingResponse;
    const locationDict = results.filter(hasNeighborhoodOrLocality).reduce(createLocationDict, {});
    return locationDict;
  });
  return {
    type: 'GET_USER_LOCATION',
    payload: promise,
  };
};
