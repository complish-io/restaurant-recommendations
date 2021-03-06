import React, { FC, ReactElement } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import ChinesePng from '../assets/images/chinese.png';
import GreekPng from '../assets/images/greek.png';
import PizzaPng from '../assets/images/pizza.png';
import BurgersPng from '../assets/images/burgers.png';
import IndianPng from '../assets/images/indian.png';
import MexicanPng from '../assets/images/mexican.png';
import JapanesePng from '../assets/images/japanese.png';
import VegetarianPng from '../assets/images/vegetarian.png';
import KoreanPng from '../assets/images/korean.png';
import VietnamesePng from '../assets/images/vietnamese.png';
import { white } from '../theme/colors';
import { isLeft, inLastRow } from '../utils';

interface Item {
  item: {
    name: string;
    image: any;
  };
  index: number;
}

type RenderItem = (item: Item) => ReactElement;

const categories = [
  { name: 'Chinese', image: ChinesePng },
  { name: 'Greek', image: GreekPng },
  { name: 'Pizza', image: PizzaPng },
  { name: 'Burgers', image: BurgersPng },
  { name: 'Indian', image: IndianPng },
  { name: 'Mexican', image: MexicanPng },
  { name: 'Japanese', image: JapanesePng },
  { name: 'Vegetarian', image: VegetarianPng },
  { name: 'Korean', image: KoreanPng },
  { name: 'Vietnamese', image: VietnamesePng },
];

const CategoryGrid: FC = () => {
  const renderItem: RenderItem = ({ item: { name, image }, index }) => {
    const marginProps = {
      marginRight: isLeft(index) ? 8 : 0,
      marginBottom: inLastRow(index) ? 0 : 8,
    };
    return (
      <View>
        <View style={{ ...marginProps }}>
          <Image source={image} height={136} width={168} borderRadius={8} />
          <View style={styles.imageOverlay}></View>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: white }}>{name}</Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      style={{ marginTop: 16 }}
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    backgroundColor: '#2B2B2B',
    opacity: 0.55,
    height: 136,
    width: 168,
  },
  textContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryGrid;
