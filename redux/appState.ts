import { Restaurants } from '../services/yelp';

export interface Coordinates {
  latitude?: number;
  longitude?: number;
}

export interface Location {
  neighborhood?: string;
  locality?: string;
}

export interface UserDetails {
  coordinates: Coordinates;
  location: Location;
}

export interface AppState {
  userDetails: UserDetails;
  restaurants: Restaurants[];
}
