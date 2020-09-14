import { StyleSheet } from 'react-native';
import Layout from '../constants/Layout';
import { lightGray, gray } from './colors';

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingBottom: 24,
    flex: 1,
    alignItems: 'center',
  },
  screenWidth: { width: Layout.WIDTH - 32 },
  horizontalRule: { borderBottomColor: lightGray, borderBottomWidth: 0.5 },
  gray: { color: gray },
});

export default styles;
