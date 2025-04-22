import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FlightMap'>;

const cities = [
  {
    name: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    flag: '🇫🇷',
    landmark: 'Eyfel Kulesi',
    description: 'Sanatın, modanın ve romantizmin başkenti Paris, Eyfel Kulesi, Louvre Müzesi ve Notre-Dame Katedrali gibi ikonik yapılarıyla dünyaca ünlüdür.'
  },
  {
    name: 'Roma',
    latitude: 41.9028,
    longitude: 12.4964,
    flag: '🇮🇹',
    landmark: 'Kolezyum',
    description: 'Antik Roma İmparatorluğu\'nun başkenti Roma, zengin tarihi, muhteşem mimarisi ve lezzetli mutfağıyla büyüleyici bir şehirdir.'
  },
  {
    name: 'Londra',
    latitude: 51.5074,
    longitude: -0.1278,
    flag: '🇬🇧',
    landmark: 'Big Ben',
    description: 'Tarihi ve modern yaşamın mükemmel bir karışımı olan Londra, Big Ben, Tower Bridge ve Buckingham Sarayı gibi önemli yapılarıyla ünlüdür.'
  },
  {
    name: 'Tokyo',
    latitude: 35.6762,
    longitude: 139.6503,
    flag: '🇯🇵',
    landmark: 'Tokyo Kulesi',
    description: 'Geleneksel ve modern kültürün harmanlandığı Tokyo, teknoloji, anime ve benzersiz sokak kültürüyle dünyaca tanınır.'
  },
  {
    name: 'İstanbul',
    latitude: 41.0082,
    longitude: 28.9784,
    flag: '🇹🇷',
    landmark: 'Ayasofya',
    description: 'Asya ve Avrupa\'yı birleştiren İstanbul, Ayasofya, Topkapı Sarayı ve Kapalıçarşı gibi tarihi yapılarıyla iki kıtaya yayılan eşsiz bir şehirdir.'
  },
];

const FlightMapScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
      >
        {cities.map((city) => (
          <Marker
            key={city.name}
            coordinate={{
              latitude: city.latitude,
              longitude: city.longitude,
            }}
            title={city.name}
            onPress={() => {
              navigation.navigate('CountryIntro', {
                country: {
                  name: city.name,
                  flag: city.flag,
                  landmark: city.landmark,
                  description: city.description
                }
              });
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default FlightMapScreen; 