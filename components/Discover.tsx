import React, { FC } from 'react';
import { Text, View } from 'react-native';
import CategoryGrid from './CategoryGrid';
import SwitchSelector from 'react-native-switch-selector';

interface DiscoverProps {
  switchSelectorRef: React.RefObject<SwitchSelector>;
}

const Discover: FC<DiscoverProps> = ({ switchSelectorRef }) => {
  return (
    <View>
      <Text style={{ marginTop: 24, textAlign: 'center' }}>Top Categories</Text>
      <CategoryGrid switchSelectorRef={switchSelectorRef} />
    </View>
  );
};

export default Discover;
