import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import HomeScreen from '../screens/Home';
import { RootStackParamList } from '../types';
import RestaurantDetailsScreen from '../screens/RestaurantDetails';
import SearchScreen from '../screens/Search';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="restaurantDetails" component={RestaurantDetailsScreen} />
        <Stack.Screen name="search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
