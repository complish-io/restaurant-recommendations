import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, ReactElement } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import Layout from '../constants/Layout';
import { AppState } from '../redux/appState';
import { Business } from '../services/yelp';
import { white } from '../theme/colors';
import { convertToMiles, mergeCategories } from '../utils';

interface RestaurantCarouselProps {
  activeItemId: string;
  setActiveItemId: React.Dispatch<React.SetStateAction<string>>;
  carouselRef: React.RefObject<Carousel<Business>>;
}

type RenderItem = (item: { item: Business; index: number }) => ReactElement;
const RestaurantCarousel: FC<RestaurantCarouselProps> = ({ activeItemId, setActiveItemId, carouselRef }) => {
  const { restaurants } = useSelector((state: AppState) => ({
    restaurants: state.restaurants,
  }));

  const styles = createStyles(white);

  const renderItem: RenderItem = ({ item }) => {
    const { id, image_url, name, rating, distance, categories } = item;

    const activeGradientColors = [
      ...Array(2).fill('(rgba(43, 43, 43, 0.10)'),
      '(rgba(43, 43, 43, 0.6354)',
      ...Array(10).fill('#2B2B2B'),
    ];

    const inactiveGradientColors = [
      ...Array(2).fill('(rgba(148, 148, 148, 0.10)'),
      '(rgba(148, 148, 148, 0.6354)',
      ...Array(10).fill('#949494'),
    ];

    const isActiveIndex = id === activeItemId;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <ImageBackground source={{ uri: image_url }} style={styles.imageBackground}>
            <LinearGradient
              colors={isActiveIndex ? activeGradientColors : inactiveGradientColors}
              style={{
                padding: 15,
              }}
            >
              <Text style={styles.name}>{name}</Text>
              <Text numberOfLines={1} style={styles.categories}>
                {mergeCategories(categories)}
              </Text>
              <View style={styles.ratingsContainer}>
                <Text style={styles.ratings}>
                  <Ionicons name="md-star-outline" size={12} color="#fff" /> {rating}
                </Text>
                <Text style={styles.distance}>{convertToMiles(distance)} mi</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <LinearGradient colors={['rgba(242, 242, 242, 0.25)', 'rgb(242, 242, 242)', 'rgb(242, 242, 242)']}>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.carouselItems}>
            <Carousel
              onSnapToItem={(index) => {
                const activeItem = restaurants[index];
                setActiveItemId(activeItem.id);
              }}
              ref={carouselRef}
              data={restaurants}
              renderItem={renderItem}
              sliderWidth={Layout.WIDTH - Layout.SCREEN_HORIZONTAL_PADDING}
              itemWidth={136}
              activeSlideAlignment="start"
              layout="default"
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const createStyles = (white: string) =>
  StyleSheet.create({
    imageBackground: { width: 136, height: 168, flex: 1, justifyContent: 'flex-end' },
    name: {
      paddingTop: 10,
      color: white,
      fontSize: 14,
    },
    categories: { paddingTop: 5, color: white, fontSize: 10 },
    ratingsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5,
    },
    ratings: {
      color: white,
      fontSize: 12,
    },
    distance: { color: white, fontSize: 12 },
    carouselContainer: { position: 'absolute', bottom: 0 },
    carouselItems: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 10,
      zIndex: 10,
    },
  });

export default RestaurantCarousel;
