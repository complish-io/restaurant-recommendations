import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { AppState } from '../redux/appState';
import { ScrollView } from 'react-native-gesture-handler';
import SwitchSelector from 'react-native-switch-selector';
import CategoryGrid from '../components/CategoryGrid';
import StatusBar from '../components/StatusBar';
import { Text, View } from '../components/Themed';
import { darkGray, gray, white } from '../theme/colors';
import { getUserCoordinates, getUserLocation } from '../redux/actions/userDetailsActions';
import { getRestaurants } from '../redux/actions/restaurantsActions';

const options = [
  {
    label: 'DISCOVER',
    value: 'Discover',
  },
  {
    label: 'NEARBY',
    value: 'Nearby',
  },
];

const Home: FC = () => {
  const location = useSelector((state: AppState) => state.userDetails.location);
  const coordinates = useSelector((state: AppState) => state.userDetails.coordinates);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCoordinates());
  }, []);
  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      dispatch(getUserLocation(coordinates as Required<Coordinates>));
      dispatch(getRestaurants(coordinates as Required<Coordinates>));
    }
  }, [coordinates]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <Text style={{ width: 105, textAlign: 'center' }}>You are in</Text>
        <Text>{location.neighborhood || location.locality}</Text>
        <SwitchSelector
          textColor={white}
          selectedColor={darkGray}
          buttonColor={white}
          options={options}
          initial={0}
          backgroundColor={gray}
          hasPadding
          onPress={() => undefined}
          fontSize={12}
          valuePadding={4}
          bold
          style={{ marginTop: 23 }}
        />
        <Text style={{ marginTop: 24, textAlign: 'center' }}>Top Categories</Text>
        <CategoryGrid />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingBottom: 24,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;
