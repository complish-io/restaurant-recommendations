import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Hours } from '../services/yelp';
import commonStyles from '../theme/styles';
import { calculateTime, Days, DaysProperties } from '../utils';

interface RestaurantHoursProps {
  hours: Hours;
}

const RestaurantHours: FC<RestaurantHoursProps> = ({ hours }) => {
  const daysOfWeek = hours[0]?.open || [];

  return (
    <View style={commonStyles.screenWidth}>
      {daysOfWeek.map((dayOfWeek) => {
        const day = dayOfWeek?.day as DaysProperties;
        const start = dayOfWeek?.start;
        const end = dayOfWeek?.end;
        <View key={day} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
          <Text style={commonStyles.gray}>{Days[day]}</Text>
          <Text style={commonStyles.gray}>
            {calculateTime(start)} - {calculateTime(end)}
          </Text>
        </View>;
      })}
    </View>
  );
};

export default RestaurantHours;
