import { Feather } from '@expo/vector-icons';
import React, { FC, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import RestaurantAddress from '../components/RestaurantAddress';
import RestaurantHours from '../components/RestaurantHours';
import RestaurantSummary from '../components/RestaurantSummary';
import StatusBar from '../components/StatusBar';
import Layout from '../constants/Layout';
import { AppState } from '../redux/appState';
import { RestaurantDetails, yelpApiClient } from '../services/yelp';
import { gray } from '../theme/colors';
import { RouteProp } from '@react-navigation/core';
import { RootStackParamList } from '../types';
import commonStyles from '../theme/styles';

/**
 * Update calculateTime to account for multiple edge cases
 */

interface RestaurantDetailsProps {
  route: RouteProp<RootStackParamList, 'restaurantDetails'>;
}

const RestaurantDetailsScreen: FC<RestaurantDetailsProps> = ({ route }) => {
  const { restaurantId } = route.params;
  const [restaurantDetails, saveRestaurantDetails] = useState<RestaurantDetails>();
  const location = useSelector((state: AppState) => state.userDetails.location);

  useEffect(() => {
    yelpApiClient.getRestaurantDetails(restaurantId).then(({ data }) => saveRestaurantDetails({ ...data }));
  }, []);

  const {
    image_url: imageUrl,
    name,
    rating,
    categories = [],
    coordinates,
    location: address = {},
    hours = [],
    display_phone: phoneNumber,
  } = (restaurantDetails || {}) as RestaurantDetails;

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <Text style={{ width: 105, textAlign: 'center' }}>You are in</Text>
        <Text>{location.neighborhood || location.locality}</Text>
        <Image source={{ uri: imageUrl }} style={{ width: Layout.WIDTH, height: 215, marginTop: 13 }} />
        <RestaurantSummary name={name} rating={rating} categories={categories} />
        <RestaurantAddress address={address} coordinates={coordinates} />
        <RestaurantHours hours={hours} />
        <View style={[commonStyles.screenWidth, { marginTop: 8 }]}>
          <View style={commonStyles.horizontalRule} />
          <Text style={{ marginTop: 10, color: gray }}>
            <Feather name="phone-call" size={12} color={gray} /> {phoneNumber}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantDetailsScreen;
