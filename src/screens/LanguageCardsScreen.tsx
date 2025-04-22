import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface LanguageCardsScreenProps {
  route: {
    params: {
      country: {
        name: string;
      };
    };
  };
}

const languageCards = [
  { turkish: 'Merhaba', translation: 'Hello', pronunciation: 'heh-loh' },
  { turkish: 'Teşekkür ederim', translation: 'Thank you', pronunciation: 'thenk yoo' },
  { turkish: 'Lütfen', translation: 'Please', pronunciation: 'pleez' },
  { turkish: 'Evet', translation: 'Yes', pronunciation: 'yes' },
  { turkish: 'Hayır', translation: 'No', pronunciation: 'noh' },
];

const LanguageCardsScreen = ({ route }: LanguageCardsScreenProps) => {
  const navigation = useNavigation();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % languageCards.length);
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + languageCards.length) % languageCards.length);
  };

  const handlePlaySound = () => {
    console.log('Ses çalınıyor:', languageCards[currentCardIndex].translation);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setCurrentCardIndex(index);
        }}
      >
        {languageCards.map((card, index) => (
          <View key={index} style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.turkishText}>{card.turkish}</Text>
              <Text style={styles.translationText}>{card.translation}</Text>
              <Text style={styles.pronunciationText}>{card.pronunciation}</Text>
              <TouchableOpacity
                style={styles.soundButton}
                onPress={handlePlaySound}
              >
                <Text style={styles.soundButtonText}>🔊</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handlePreviousCard}
        >
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.cardCounter}>
          {currentCardIndex + 1} / {languageCards.length}
        </Text>

        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNextCard}
        >
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Geri Dön</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    aspectRatio: 1.5,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  turkishText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  translationText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  pronunciationText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  soundButton: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#4a90e2',
  },
  soundButtonText: {
    fontSize: 24,
    color: 'white',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  navButton: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#4a90e2',
    marginHorizontal: 10,
  },
  navButtonText: {
    fontSize: 24,
    color: 'white',
  },
  cardCounter: {
    fontSize: 18,
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LanguageCardsScreen; 