import axios, { AxiosInstance, AxiosPromise } from 'axios';
import Constants from 'expo-constants';
import { GeocodingResult, PlaceAutocompleteResponse } from 'google__maps';
import queryString from 'query-string';
import Geocoder from 'react-native-geocoding';
import { Coordinates } from '../redux/appState';

class GooglePlacesApiClient {
  client: AxiosInstance;
  geocoder: Geocoder;
  apiKey: string = Constants.manifest.extra.googleApiKey;
  constructor() {
    // Geocoder for user's coordinates
    this.geocoder = Geocoder;
    this.geocoder.init(this.apiKey, {});
    this.client = axios.create();

    // Client for Place Search
  }
  getLocationDetails = ({ latitude, longitude }: Required<Coordinates>) => {
    return this.geocoder.from(latitude, longitude);
  };

  getPlaceCoordinates = (place: string) => {
    return (this.geocoder.from(place) as unknown) as Promise<{ results: GeocodingResult[] }>;
  };

  // Type is borked
  getCities = (term: string): AxiosPromise<PlaceAutocompleteResponse> => {
    const queryParams = {
      key: this.apiKey,
      input: term,
      types: ['(cities)'],
      components: 'country:us',
    };
    const qs = queryString.stringify(queryParams);
    return this.client.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?${qs}`);
  };
}

export const googlePlacesApiClient = new GooglePlacesApiClient();
