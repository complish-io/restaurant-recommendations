import React, { FC, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SwitchSelector from 'react-native-switch-selector';
import { useDispatch, useSelector } from 'react-redux';
import Discover from '../components/Discover';
import Nearby from '../components/Nearby';
import StatusBar from '../components/StatusBar';
import { getRestaurants } from '../redux/actions/restaurantsActions';
import { getUserCoordinates, getUserLocation } from '../redux/actions/userDetailsActions';
import { AppState, Coordinates } from '../redux/appState';
import { darkGray, gray, white } from '../theme/colors';
import commonStyles from '../theme/styles';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

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

type ToggleStates = 'Discover' | 'Nearby';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;

const HomeScreen: FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const switchSelectorRef = useRef<SwitchSelector>(null);
  const [toggleState, changeToggleState] = useState<ToggleStates>('Discover');
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
    <View style={commonStyles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <TouchableOpacity
          onPress={() => navigation.navigate('search')}
          style={{ borderColor: 'black', borderWidth: 1 }}
        >
          <Text>Go to Search</Text>
        </TouchableOpacity>
        <Text style={{ width: 105, textAlign: 'center' }}>You are in</Text>
        <Text>{location.neighborhood || location.locality}</Text>
        <SwitchSelector
          ref={switchSelectorRef}
          textColor={white}
          selectedColor={darkGray}
          buttonColor={white}
          options={options}
          initial={0}
          backgroundColor={gray}
          hasPadding
          onPress={(value) => {
            setTimeout(() => {
              changeToggleState(value as ToggleStates);
            }, 225);
          }}
          fontSize={12}
          valuePadding={4}
          bold
          style={{ marginTop: 23, width: 225 }}
        />
        {toggleState == 'Discover' && <Discover switchSelectorRef={switchSelectorRef} />}
        <Nearby isVisible={toggleState === 'Nearby'} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
