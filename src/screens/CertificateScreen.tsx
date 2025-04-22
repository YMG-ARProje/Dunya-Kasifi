import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useExplorer } from '../context/ExplorerContext';

type CertificateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Certificate'>;

const CertificateScreen = () => {
  const navigation = useNavigation<CertificateScreenNavigationProp>();
  const { avatar, equipment, vehicle } = useExplorer();

  const explorerOath = `
    Ben, bir Dünya Kaşifi olarak,
    her yeni keşifte meraklı,
    her yeni kültürde saygılı,
    her yeni deneyimde öğrenmeye açık olacağıma,
    dünyayı keşfederken çevreyi koruyacağıma,
    farklı kültürleri anlayıp saygı göstereceğime,
    bilgiyi paylaşacağıma söz veriyorum.
  `;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kaşif Sertifikası</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Avatar Seçimleri:</Text>
        <Text style={styles.summaryText}>Saç: {avatar.hair}</Text>
        <Text style={styles.summaryText}>Göz: {avatar.eyes}</Text>
        <Text style={styles.summaryText}>Kıyafet: {avatar.outfit}</Text>
        <Text style={styles.summaryText}>Aksesuar: {avatar.accessory}</Text>

        <Text style={styles.sectionTitle}>Ekipmanlar:</Text>
        {equipment.map((item, index) => (
          <Text key={index} style={styles.summaryText}>• {item}</Text>
        ))}

        <Text style={styles.sectionTitle}>Keşif Aracı:</Text>
        <Text style={styles.summaryText}>{vehicle}</Text>
      </View>

      <View style={styles.oathContainer}>
        <Text style={styles.oathTitle}>Kaşif Yemini</Text>
        <Text style={styles.oathText}>{explorerOath}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FlightMap')}
      >
        <Text style={styles.buttonText}>Bir Sonraki Maceraya Hazırım</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  summaryText: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    color: '#555',
  },
  oathContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  oathTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  oathText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
  },
  button: {
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

export default CertificateScreen; 