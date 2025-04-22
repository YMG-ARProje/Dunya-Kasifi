import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useExplorer } from '../context/ExplorerContext';

interface CultureQuestScreenProps {
  route: {
    params: {
      country: {
        name: string;
      };
    };
  };
}

const CultureQuestScreen = ({ route }: CultureQuestScreenProps) => {
  const navigation = useNavigation();
  const { addBadge } = useExplorer();
  const { country } = route.params;
  const [selectedOutfit, setSelectedOutfit] = useState<string>('');

  const traditionalOutfits = [
    { id: 'outfit1', name: 'Geleneksel Kıyafet 1' },
    { id: 'outfit2', name: 'Geleneksel Kıyafet 2' },
    { id: 'outfit3', name: 'Geleneksel Kıyafet 3' },
  ];

  const handleOutfitSelect = (outfitId: string) => {
    setSelectedOutfit(outfitId);
  };

  const handleFoodMatch = () => {
    console.log('Yöresel yemek eşleştirme yapıldı');
  };

  const handleSymbolMatch = () => {
    console.log('Kültürel sembol eşleştirme yapıldı');
  };

  const handleCompleteQuest = () => {
    addBadge(`${country.name.toLowerCase()}-culture`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kültürel Görevler</Text>

      <View style={styles.questSection}>
        <Text style={styles.sectionTitle}>Geleneksel Kıyafet Giydir</Text>
        <View style={styles.outfitContainer}>
          {traditionalOutfits.map((outfit) => (
            <TouchableOpacity
              key={outfit.id}
              style={[
                styles.outfitButton,
                selectedOutfit === outfit.id && styles.selectedOutfit,
              ]}
              onPress={() => handleOutfitSelect(outfit.id)}
            >
              <Text style={styles.outfitText}>{outfit.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.questSection}>
        <Text style={styles.sectionTitle}>Yöresel Yemek Eşleştir</Text>
        <TouchableOpacity
          style={styles.matchButton}
          onPress={handleFoodMatch}
        >
          <Text style={styles.buttonText}>Eşleştirmeyi Başlat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.questSection}>
        <Text style={styles.sectionTitle}>Kültürel Sembol Eşleştir</Text>
        <TouchableOpacity
          style={styles.matchButton}
          onPress={handleSymbolMatch}
        >
          <Text style={styles.buttonText}>Eşleştirmeyi Başlat</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleCompleteQuest}
      >
        <Text style={styles.buttonText}>Görevi Tamamla</Text>
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
  questSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  outfitContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  outfitButton: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedOutfit: {
    borderColor: '#4a90e2',
    backgroundColor: '#e8f0fe',
  },
  outfitText: {
    fontSize: 16,
    color: '#333',
  },
  matchButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CultureQuestScreen; 