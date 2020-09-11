import Geocoder from 'react-native-geocoding';
import Constants from 'expo-constants';
import { Coordinates } from '../redux/appState';

class GooglePlacesApiClient {
  geocoder: Geocoder;
  constructor() {
    this.geocoder = Geocoder;
    this.geocoder.init(Constants.manifest.extra.googleGeocodingApiKey, {});
  }
  getLocationDetails = ({ latitude, longitude }: Required<Coordinates>) => {
    return this.geocoder.from(latitude, longitude);
  };
}

export const googlePlacesApiClient = new GooglePlacesApiClient();
