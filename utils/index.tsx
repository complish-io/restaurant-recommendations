import { reduce } from 'lodash';
import { Business } from '../services/yelp';

const MILES_TO_METERS = 1609.34;

interface Category {
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
