import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Layout from '../constants/Layout';
import { Coordinates, Location } from '../services/yelp';
import { gray } from '../theme/colors';
import commonStyles from '../theme/styles';
import { getFormattedAddress } from '../utils';

interface RestaurantAddressProps {
  address: Partial<Location>;
  coordinates: Coordinates;
}

export const RestaurantAddress: FC<RestaurantAddressProps> = ({ address, coordinates }) => {
  const [streetAddress, cityZip] = getFormattedAddress(address);
  return (
    <>
      <View style={commonStyles.screenWidth}>
        <Text style={commonStyles.gray}>{streetAddress}</Text>
        <Text style={commonStyles.gray}>{cityZip}</Text>
      </View>
      {coordinates && (
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={[{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }]}
          initialRegion={{
            ...(coordinates as Required<Coordinates>),
            latitudeDelta: Layout.LATITUDE_DELTA,
            longitudeDelta: Layout.LONGITUDE_DELTA,
          }}
          style={{ width: Layout.WIDTH, height: 176, marginTop: 8 }}
        >
          <Marker coordinate={coordinates}>
            <MaterialCommunityIcons name="map-marker-circle" size={24} color={gray} />
          </Marker>
        </MapView>
      )}
    </>
  );
};

export default RestaurantAddress;
