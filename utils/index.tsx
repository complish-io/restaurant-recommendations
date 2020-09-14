import { reduce } from 'lodash';
import { Business, Location } from '../services/yelp';

const MILES_TO_METERS = 1609.34;

export const Days = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

export type DaysProperties = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Category {
  alias: string;
  title: string;
}

export const convertToMiles = (meters: number): number => {
  const miles = meters / MILES_TO_METERS;
  if (Number.isInteger(miles)) {
    return miles;
  }
  return Number.parseFloat(miles.toFixed(2));
};

export const mergeCategories = (categories: Category[]): string =>
  reduce(
    categories,
    (text, category) => {
      const bulletPrefix = Boolean(text) ? ' • ' : '';
      return text.concat(`${bulletPrefix + category.title}`);
    },
    '',
  );

export const findIndex = (restaurants: Business[], id: string): number =>
  restaurants.findIndex((restaurant) => restaurant.id === id);

export const isLeft = (num: number): boolean => num % 2 === 0;
export const inLastRow = (num: number): boolean => num >= 8;

export const calculateTime = (militaryTime: string): string => {
  const suffix = parseInt(militaryTime) <= 1200 ? 'AM' : 'PM';
  let hours = parseInt(militaryTime) / 100;
  if (hours > 12) {
    hours -= 12;
  }

  return `${Math.floor(hours)}:00 ${suffix}`;
};

export const getFormattedAddress = (address: Partial<Location>): [string, string] => {
  const { address1 = '', address2 = '', address3 = '', city = '', zip_code: zipCode = '' } = address;
  const streetAddress = `${address1} ${address2} ${address3}`.trim();
  const cityZip = `${city}, ${zipCode}`.trim();
  return [streetAddress, cityZip];
};
