import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useExplorer } from '../context/ExplorerContext';

type VehicleScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Vehicle'>;

const vehicles = [
  { id: 'magic_carpet', name: 'Sihirli Halı' },
  { id: 'small_plane', name: 'Küçük Uçak' },
  { id: 'rocket', name: 'Roket' },
  { id: 'balloon', name: 'Balon' },
];

const VehicleScreen = () => {
  const navigation = useNavigation<VehicleScreenNavigationProp>();
  const { updateVehicle } = useExplorer();
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  const handleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    updateVehicle(vehicleId);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Keşif Aracını Seç</Text>
      
      <View style={styles.vehicleGrid}>
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleCard,
              selectedVehicle === vehicle.id && styles.selectedCard,
            ]}
            onPress={() => handleSelect(vehicle.id)}
          >
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, !selectedVehicle && styles.disabledButton]}
        onPress={() => {
          if (selectedVehicle) {
            navigation.navigate('Certificate');
          }
        }}
        disabled={!selectedVehicle}
      >
        <Text style={styles.buttonText}>Kaşif Sertifikasını Al</Text>
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
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  vehicleCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedCard: {
    borderColor: '#4a90e2',
    backgroundColor: '#e8f0fe',
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    marginTop: 30,
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

export default VehicleScreen; 