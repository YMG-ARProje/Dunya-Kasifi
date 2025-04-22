import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useExplorer } from '../context/ExplorerContext';

type EquipmentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Equipment'>;

const equipmentList = [
  { id: 'binoculars', name: 'Dürbün' },
  { id: 'compass', name: 'Pusula' },
  { id: 'notebook', name: 'Not Defteri' },
  { id: 'camera', name: 'Fotoğraf Makinesi' },
];

const EquipmentScreen = () => {
  const navigation = useNavigation<EquipmentScreenNavigationProp>();
  const { updateEquipment } = useExplorer();
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const handleSelect = (equipmentId: string) => {
    setSelectedEquipment((prev) => {
      const newSelection = prev.includes(equipmentId)
        ? prev.filter((id) => id !== equipmentId)
        : [...prev, equipmentId];
      updateEquipment(newSelection);
      return newSelection;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Keşif Ekipmanlarını Seç</Text>
      
      <View style={styles.equipmentGrid}>
        {equipmentList.map((equipment) => (
          <TouchableOpacity
            key={equipment.id}
            style={[
              styles.equipmentCard,
              selectedEquipment.includes(equipment.id) && styles.selectedCard,
            ]}
            onPress={() => handleSelect(equipment.id)}
          >
            <Text style={styles.equipmentName}>{equipment.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, selectedEquipment.length === 0 && styles.disabledButton]}
        onPress={() => {
          if (selectedEquipment.length > 0) {
            navigation.navigate('Vehicle');
          }
        }}
        disabled={selectedEquipment.length === 0}
      >
        <Text style={styles.buttonText}>Keşif Aracını Seç</Text>
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
  equipmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  equipmentCard: {
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
  equipmentName: {
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

export default EquipmentScreen; 