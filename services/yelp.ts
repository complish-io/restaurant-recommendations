import axios, { AxiosInstance, AxiosPromise } from 'axios';
import queryString from 'query-string';
import { omitBy, isNil } from 'lodash';
import Constants from 'expo-constants';

interface Category {
  alias: string;
  title: string;
}

export interface Location {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip_code: string;
  country: string;
  display_address: string[];
  cross_streets: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type Hours = {
  open: DayHours[];
  hours_type: string;
  is_open_now: boolean;
}[];

interface DayHours {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
}

interface SpecialHours {
  date: string;
  is_closed: boolean;
  start: string;
  end: string;
  is_overnight: boolean;
}

export interface Business {
  rating: number;
  price: string;
  phone: string;
  id: string;
  alias: string;
  is_closed: false;
  categories: [
    {
      alias: string;
      title: string;
    },
  ];
  review_count: number;
  name: string;
  url: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image_url: string;
  location: {
    city: string;
    country: string;
    address2: string;
    address3: string;
    state: string;
    address1: string;
    zip_code: string;
  };
  distance: number;
  transactions: string[];
}

export interface Restaurants {
  total: number;
  businesses: Business[];
  region: {
    center: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface RestaurantDetails {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_claimed: boolean;
  is_closed: boolean;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  categories: Category[];
  rating: number;
  location: Location;
  coordinates: Coordinates;
  photos: string[];
  price: string;
  hours: [
    {
      open: DayHours[];
      hours_type: string;
      is_open_now: boolean;
    },
  ];
  transactions: any[];
  special_hours: SpecialHours[];
}

interface GetRestaurantsQueryParams {
  term?: string;
  location?: string;
  latitude: number;
  longitude: number;
  categories?: string;
  radius?: number;
}

type GetRestaurants = (queryParams: GetRestaurantsQueryParams) => AxiosPromise<Restaurants>;

type GetRestaurantDetails = (id: string) => AxiosPromise<RestaurantDetails>;

class YelpApiClient {
  client: AxiosInstance;
  constructor() {
    // https://docs.expo.io/guides/environment-variables/
    const yelpApiKey = Constants.manifest.extra.yelpApiKey;
    this.client = axios.create({
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
      },
    });
  }
  getRestaurants: GetRestaurants = (queryParams) => {
    const requiredQueryParams = omitBy(queryParams, isNil);
    const qs = queryString.stringify({
      ...requiredQueryParams,
      limit: 10,
    });
    return this.client.get(`https://api.yelp.com/v3/businesses/search?${qs}`);
  };
  getRestaurantDetails: GetRestaurantDetails = (id) => {
    return this.client.get(`https://api.yelp.com/v3/businesses/${id}`);
  };
}

export const yelpApiClient = new YelpApiClient();
