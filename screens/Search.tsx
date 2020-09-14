import { RouteProp } from '@react-navigation/core';
import React, { FC } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StatusBar from '../components/StatusBar';
import commonStyles from '../theme/styles';
import { RootStackParamList } from '../types';

interface SearchProps {
  route: RouteProp<RootStackParamList, 'search'>;
}

const SearchScreen: FC<SearchProps> = () => {
  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
