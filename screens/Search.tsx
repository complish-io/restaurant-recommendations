import { RouteProp, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { PlaceAutocompleteResult } from 'google__maps';
import { debounce } from 'lodash';
import React, { FC, ReactElement, useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantSummary from '../components/RestaurantSummary';
import StatusBar from '../components/StatusBar';
import Layout from '../constants/Layout';
import { getRestaurants } from '../redux/actions/restaurantsActions';
import { AppState, Coordinates } from '../redux/appState';
import { googlePlacesApiClient } from '../services/googlePlaces';
import { Business } from '../services/yelp';
import { gray } from '../theme/colors';
import commonStyles from '../theme/styles';
import { RootStackParamList } from '../types';

interface SearchProps {
  route: RouteProp<RootStackParamList, 'search'>;
}

interface Item {
  item: Business | PlaceAutocompleteResult;
  index: number;
}

type RenderItem = (item: Item) => ReactElement | null;

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'search'>;

const SearchScreen: FC<SearchProps> = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(0);
  const [restaurantText, changeRestaurantText] = useState('');
  const [locationText, changeLocationText] = useState('');
  const [places, setPlaces] = useState<PlaceAutocompleteResult[]>();

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
      googlePlacesApiClient.getCities(locationText).then(({ data: { predictions } }) => {
        const cities = predictions.filter(({ types }) => types.includes('locality'));
        setPlaces(cities);
      });
    }, 250),
    [locationText],
  );

  // Fix choppiness
  const handleRestaurantTextChange = (text: string) => {
    changeRestaurantText(text);
    updateRestaurantResults();
  };

  // Localities only!
  const handleLocationTextChange = (text: string) => {
    changeLocationText(text);
    updateCityResults();
  };

  const renderItem: RenderItem = ({ item }) => {
    if (item?.categories) {
      const { id, name, rating, categories, distance } = item;
      return (
        <TouchableOpacity onPress={() => navigation.navigate('home', { restaurantId: id })}>
          <RestaurantSummary name={name} rating={rating} categories={categories} distance={distance} />
        </TouchableOpacity>
      );
    }
    const { description } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          googlePlacesApiClient
            .getPlaceCoordinates(description)
            .then(({ results }) => {
              const location = results[0].geometry.location;
              dispatch(
                getRestaurants({
                  latitude: location.lat,
                  longitude: location.lng,
                  term: restaurantText,
                }),
              );
            })
            .catch((error) => console.log({ error: JSON.stringify(error) }));
          setTimeout(() => setActive(0), 500);
        }}
      >
        <View style={[commonStyles.screenWidth, { marginTop: 12, marginBottom: 8 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, color: gray }}>{description}</Text>
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
      </TouchableOpacity>
    );
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
          style={styles.container}
        />
        <TextInput
          placeholder="Location"
          onFocus={() => setActive(1)}
          onChangeText={debounce(handleLocationTextChange, 250)}
          value={locationText}
          style={styles.container}
        />
        <FlatList data={data} renderItem={renderItem} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.WIDTH - 32,
    marginTop: 8,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
});

export default SearchScreen;
