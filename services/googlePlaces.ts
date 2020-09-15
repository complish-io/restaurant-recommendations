import Geocoder from 'react-native-geocoding';
import Constants from 'expo-constants';
import { Coordinates } from '../redux/appState';
import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';

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

  getCities = (term: string) => {
    const queryParams = {
      key: this.apiKey,
      input: term,
      inputtype: 'textquery',
      type: '(cities)',
      fields: 'formatted_address,types',
    };
    const qs = queryString.stringify(queryParams);
    return this.client.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${qs}`);
  };
}

export const googlePlacesApiClient = new GooglePlacesApiClient();
