import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { gray } from '../theme/colors';
import commonStyles from '../theme/styles';
import { Category, mergeCategories } from '../utils';

interface RestaurantSummaryProps {
  name: string;
  rating: number;
  categories: Category[];
}

export const RestaurantSummary: FC<RestaurantSummaryProps> = ({ name, rating, categories }) => {
  return (
    <View style={[commonStyles.screenWidth, { marginTop: 12, marginBottom: 8 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name} </Text>
          <Ionicons name="md-star" size={12} color={gray} style={{ marginLeft: 5 }} />
          <Text style={commonStyles.gray}> {rating}</Text>
        </Text>
        <Text style={commonStyles.gray}>
          <FontAwesome5 style={commonStyles.gray} name="map-marker-alt" size={12} color={gray} /> 5 mi
        </Text>
      </View>
      <Text numberOfLines={1} style={commonStyles.gray}>
        {mergeCategories(categories)}
      </Text>
      <View
        style={[
          commonStyles.horizontalRule,
          {
            marginTop: 8,
          },
        ]}
      />
    </View>
  );
};

export default RestaurantSummary;
