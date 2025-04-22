import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type CountryIntroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CountryIntro'>;
type CountryIntroScreenRouteProp = RouteProp<RootStackParamList, 'CountryIntro'>;

const CountryIntroScreen = () => {
  const navigation = useNavigation<CountryIntroScreenNavigationProp>();
  const { params: { country } } = useRoute<CountryIntroScreenRouteProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.flag}>{country.flag}</Text>
        <Text style={styles.title}>{country.name}</Text>
      </View>

      <View style={styles.landmarkContainer}>
        <Text style={styles.landmarkTitle}>Ünlü Yapı</Text>
        <Text style={styles.landmark}>{country.landmark}</Text>
      </View>

      <Text style={styles.description}>{country.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ARView', { country })}
        >
          <Text style={styles.buttonText}>AR ile Keşfet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CultureQuest', { country })}
        >
          <Text style={styles.buttonText}>Kültürel Görev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LanguageCards', { country })}
        >
          <Text style={styles.buttonText}>Dil Kartları</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  flag: {
    fontSize: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  landmarkContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  landmarkTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  landmark: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 30,
    textAlign: 'justify',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CountryIntroScreen; 