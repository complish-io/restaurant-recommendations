import { RouteProp } from '@react-navigation/core';
import { debounce } from 'lodash';
import React, { FC, ReactElement, useCallback, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantSummary from '../components/RestaurantSummary';
import StatusBar from '../components/StatusBar';
import Layout from '../constants/Layout';
import { getRestaurants } from '../redux/actions/restaurantsActions';
import { AppState } from '../redux/appState';
import { Business } from '../services/yelp';
import { googlePlacesApiClient } from '../services/googlePlaces';
import commonStyles from '../theme/styles';
import { RootStackParamList } from '../types';

interface SearchProps {
  route: RouteProp<RootStackParamList, 'search'>;
}

interface Item {
  item:
    | Business
    | {
        formatted_address: string;
      };
  index: number;
}

type RenderItem = (item: Item) => ReactElement | null;

const renderItem: RenderItem = ({ item, index }) => {
  if (item?.categories) {
    const { name, rating, categories, distance } = item;
    return <RestaurantSummary name={name} rating={rating} categories={categories} distance={distance} />;
  }
  const { formatted_address } = item;
  return (
    <View style={[commonStyles.screenWidth, { marginTop: 12, marginBottom: 8 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={commonStyles.gray}>{formatted_address}</Text>
        <View
          style={[
            commonStyles.horizontalRule,
            {
              marginTop: 8,
            },
          ]}
        />
      </View>
    </View>
  );
};

const SearchScreen: FC<SearchProps> = () => {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(0);
  const [restaurantText, changeRestaurantText] = useState('');
  const [locationText, changeLocationText] = useState('');
  const [places, setPlaces] = useState();

  const { restaurants, coordinates } = useSelector((state: AppState) => ({
    restaurants: state.restaurants,
    coordinates: state.userDetails.coordinates,
  }));

  const updateRestaurantResults = useCallback(
    debounce(() => {
      dispatch(
        getRestaurants({
          ...(coordinates as Required<Coordinates>),
          term: restaurantText,
        }),
      );
    }, 250),
    [restaurantText],
  );

  const updateCityResults = useCallback(
    debounce(() => {
      googlePlacesApiClient.getCities(locationText).then((response) => {
        const {
          data: { candidates },
        } = response;
        setPlaces(candidates);
      });
    }, 250),
    [locationText],
  );

  const handleRestaurantTextChange = (text: string) => {
    changeRestaurantText(text);
    updateRestaurantResults();
  };

  // Localities only!
  const handleLocationTextChange = (text: string) => {
    changeLocationText(text);
    updateCityResults();
  };

  const data = isActive === 0 ? restaurants : places;

  console.log({ restaurants, places });

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <TextInput
          placeholder="Search restaurants"
          onFocus={() => setActive(0)}
          onChangeText={handleRestaurantTextChange}
          value={restaurantText}
          style={{ width: Layout.WIDTH - 32 }}
        />
        <TextInput
          placeholder="Location"
          onFocus={() => setActive(1)}
          onChangeText={debounce(handleLocationTextChange, 250)}
          style={{ width: Layout.WIDTH - 32, marginTop: 8 }}
        />
        <FlatList data={data} renderItem={renderItem} />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
