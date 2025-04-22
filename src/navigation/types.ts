import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Avatar: undefined;
  Equipment: undefined;
  Vehicle: undefined;
  Certificate: undefined;
  FlightMap: undefined;
  CountryIntro: { country: { name: string; flag: string; landmark: string; description: string } };
  ARView: { country: { name: string; flag: string; landmark: string; description: string } };
  CultureQuest: { country: { name: string; flag: string; landmark: string; description: string } };
  LanguageCards: { country: { name: string; flag: string; landmark: string; description: string } };
  ExplorerLog: undefined;
  BadgeShelf: undefined;
}; 