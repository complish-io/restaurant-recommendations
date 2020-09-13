import React, { FC } from 'react';
import { Text, View } from 'react-native';
import CategoryGrid from './CategoryGrid';

const Discover: FC = () => {
  return (
    <View>
      <Text style={{ marginTop: 24, textAlign: 'center' }}>Top Categories</Text>
      <CategoryGrid />
    </View>
  );
};

export default Discover;
