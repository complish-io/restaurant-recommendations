import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const LATITUDE_DELTA = 0.0922;
const ASPECT_RATIO = WIDTH / HEIGHT;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SCREEN_HORIZONTAL_PADDING = 32;

export default {
  WIDTH,
  HEIGHT,
  LATITUDE_DELTA,
  ASPECT_RATIO,
  LONGITUDE_DELTA,
  SCREEN_HORIZONTAL_PADDING,
  IS_SMALL_DEVICE: WIDTH < 375,
};
