import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Camera, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';

type ARViewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ARView'>;
type ARViewScreenRouteProp = RouteProp<RootStackParamList, 'ARView'>;

const ARViewScreen = () => {
  const navigation = useNavigation<ARViewScreenNavigationProp>();
  const route = useRoute<ARViewScreenRouteProp>();
  const { country } = route.params;
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Kamera izni gerekli</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Kamera bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.landmarkName}>{country.landmark}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {country.name} ülkesinin {country.landmark} yapısını keşfediyorsunuz
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    padding: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  landmarkName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  infoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    minWidth: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ARViewScreen; 