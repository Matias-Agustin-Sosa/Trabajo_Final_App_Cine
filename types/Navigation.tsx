// types/Navigation.tsx
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { RootTabParamList } from './NavigationTab';

export type RootStackParamList = {
  Logeo: undefined;
  Registro: undefined;
  Coliceo: NavigatorScreenParams<RootTabParamList>;
};