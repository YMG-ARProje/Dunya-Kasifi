import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import AvatarScreen from '../screens/AvatarScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import VehicleScreen from '../screens/VehicleScreen';
import CertificateScreen from '../screens/CertificateScreen';
import FlightMapScreen from '../screens/FlightMapScreen';
import CountryIntroScreen from '../screens/CountryIntroScreen';
import ARViewScreen from '../screens/ARViewScreen';
import CultureQuestScreen from '../screens/CultureQuestScreen';
import LanguageCardsScreen from '../screens/LanguageCardsScreen';
import ExplorerLogScreen from '../screens/ExplorerLogScreen';
import BadgeShelfScreen from '../screens/BadgeShelfScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Avatar" component={AvatarScreen} />
        <Stack.Screen name="Equipment" component={EquipmentScreen} />
        <Stack.Screen name="Vehicle" component={VehicleScreen} />
        <Stack.Screen name="Certificate" component={CertificateScreen} />
        <Stack.Screen name="FlightMap" component={FlightMapScreen} />
        <Stack.Screen name="CountryIntro" component={CountryIntroScreen} />
        <Stack.Screen name="ARView" component={ARViewScreen} />
        <Stack.Screen name="CultureQuest" component={CultureQuestScreen} />
        <Stack.Screen name="LanguageCards" component={LanguageCardsScreen} />
        <Stack.Screen name="ExplorerLog" component={ExplorerLogScreen} />
        <Stack.Screen name="BadgeShelf" component={BadgeShelfScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 