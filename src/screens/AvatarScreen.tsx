import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useExplorer } from '../context/ExplorerContext';

type AvatarScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Avatar'>;

const options = {
  hair: ['Kısa', 'Uzun', 'Kıvırcık', 'Düz'],
  eyes: ['Mavi', 'Yeşil', 'Kahverengi', 'Siyah'],
  outfit: ['Klasik', 'Spor', 'Gezgin', 'Macera'],
  accessory: ['Şapka', 'Gözlük', 'Çanta', 'Kolye'],
};

const AvatarScreen = () => {
  const navigation = useNavigation<AvatarScreenNavigationProp>();
  const { updateAvatar } = useExplorer();
  const [selected, setSelected] = useState({
    hair: '',
    eyes: '',
    outfit: '',
    accessory: '',
  });

  const handleSelect = (category: keyof typeof selected, value: string) => {
    setSelected((prev) => ({ ...prev, [category]: value }));
    updateAvatar({ [category]: value });
  };

  const isComplete = Object.values(selected).every((value) => value !== '');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Avatarını Oluştur</Text>
      
      {Object.entries(options).map(([category, items]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          <View style={styles.optionsContainer}>
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  selected[category as keyof typeof selected] === item && styles.selectedOption,
                ]}
                onPress={() => handleSelect(category as keyof typeof selected, item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, !isComplete && styles.disabledButton]}
        onPress={() => {
          if (isComplete) {
            console.log('Keşfe Devam Et');
            navigation.navigate('Equipment');
          }
        }}
        disabled={!isComplete}
      >
        <Text style={styles.buttonText}>Keşfe Devam Et</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: '#4a90e2',
    backgroundColor: '#e8f0fe',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AvatarScreen; 