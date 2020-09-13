import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants } from '../redux/actions/restaurantsActions';
import { AppState, Coordinates } from '../redux/appState';
import { Business } from '../services/yelp';
import RestaurantCarousel from './RestaurantsCarousel';
import { darkGray, gray, white } from '../theme/colors';
import { findIndex } from '../utils';
import Layout from '../constants/Layout';

/**
 * TODOs:
 * Fix Nearby Render Performance
 */

interface NearbyProps {
  isVisible: boolean;
}

const Nearby: FC<NearbyProps> = ({ isVisible }) => {
  const carouselRef = useRef<Carousel<Business>>(null);
  const dispatch = useDispatch();
  const [shouldRedoSearch, setShouldRedoSearch] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<Coordinates>({
    latitude: undefined,
    longitude: undefined,
  });
  const [activeItemId, setActiveItemId] = useState('');
  const { coordinates, restaurants } = useSelector((state: AppState) => ({
    coordinates: state.userDetails.coordinates,
    restaurants: state.restaurants,
  }));
  useEffect(() => {
    setActiveItemId(restaurants[0]?.id);
  }, [restaurants]);

  const handleOnRegionChangeComplete = (region: Region) => {
    const { latitude, longitude } = region;
    setMapCoordinates({ latitude, longitude });
    setShouldRedoSearch(true);
  };

  const redoSearch = () => {
    dispatch(getRestaurants(mapCoordinates as Required<Coordinates>));
    setShouldRedoSearch(false);
  };

  const styles = createStyles(isVisible);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={[{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }]}
        initialRegion={{
          ...(coordinates as Required<Coordinates>),
          latitudeDelta: Layout.LATITUDE_DELTA,
          longitudeDelta: Layout.LONGITUDE_DELTA,
        }}
        onRegionChangeComplete={handleOnRegionChangeComplete}
        style={styles.googleMap}
      >
        {restaurants.map(({ id, coordinates }) => {
          const activeIcon = id === activeItemId;
          return (
            <Marker
              key={id}
              coordinate={coordinates}
              onPress={() => {
                const restaurantIndex = findIndex(restaurants, id);
                carouselRef.current?.snapToItem(restaurantIndex);
                setActiveItemId(id);
              }}
            >
              <MaterialCommunityIcons name="map-marker-circle" size={24} color={activeIcon ? darkGray : gray} />
            </Marker>
          );
        })}
      </MapView>
      {shouldRedoSearch && (
        <View style={styles.redoSearchContainer}>
          <TouchableOpacity onPress={redoSearch} style={styles.redoSearchButton}>
            <Text style={{ textAlign: 'center', color: white }}>Redo Search</Text>
          </TouchableOpacity>
        </View>
      )}
      <RestaurantCarousel carouselRef={carouselRef} activeItemId={activeItemId} setActiveItemId={setActiveItemId} />
    </View>
  );
};

const createStyles = (isVisible: boolean) =>
  StyleSheet.create({
    container: {
      display: isVisible ? 'flex' : 'none',
      height: 500,
    },
    googleMap: {
      marginTop: 10,
      alignSelf: 'stretch',
      width: Layout.WIDTH,
      height: 450,
    },
    redoSearchContainer: {
      position: 'absolute',
      left: '50%',
      marginLeft: -83.5,
      bottom: 185,
      marginHorizontal: 'auto',
    },
    redoSearchButton: {
      width: 167,
      height: 28,
      backgroundColor: '#2B2B2B',
      borderRadius: 45,
      justifyContent: 'center',
    },
  });

export default Nearby;
