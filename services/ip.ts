import axios, { AxiosPromise } from 'axios';

interface UserLocationResponse {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

type GetUserLocation = () => AxiosPromise<UserLocationResponse>;

class IPClient {
  getUserLocation: GetUserLocation = () => {
    return axios.get(`http://ip-api.com/json`);
  };
}

export const ipClient = new IPClient();
