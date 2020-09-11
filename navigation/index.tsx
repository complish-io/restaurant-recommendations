import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import Discover from '../screens/Discover';

interface Props {
  colorScheme: ColorSchemeName;
}

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation: FC<Props> = ({ colorScheme }) => {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="discover" component={Discover} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
