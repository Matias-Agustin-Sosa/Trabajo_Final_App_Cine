import React from 'react';
import { StyleSheet, View, Image, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenRegistro from './screens/Registro'
import ScreenLogeo from './screens/Logeo'
import ScreenPerfil from './screens/Perfil'
import ScreenEntradas from './screens/Ticketera';
import ScreenTusEntradas from './screens/TusEntradas';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './types/Navigation';
import { RootTabParamList } from './types/NavigationTab';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'Coliceo'>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function Tabs({ route }: PrincipalProps) {
  const datos = route.params?.params as RootTabParamList['Ticketera'];

  return (
    <Tab.Navigator
      screenOptions={({route}, ) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case 'Ticketera':
            iconName = 'ticket-sharp';
            break;
          case 'Perfil':
            iconName = 'person-sharp';
            break;
          case 'Entradas':
            iconName = 'film-outline';
            break;
          default:
            iconName = 'help-sharp';
        }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}>
      <Tab.Screen name="Entradas" component={ScreenTusEntradas} initialParams={datos} />
      <Tab.Screen name="Ticketera" component={ScreenEntradas} initialParams={datos} />
      <Tab.Screen name="Perfil" component={ScreenPerfil} initialParams={datos} />
    </Tab.Navigator>
  );
}

const App : React.FC = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Logeo'>
          <Stack.Screen name='Logeo' component={ScreenLogeo} options={{ headerShown: false }}></Stack.Screen>

          <Stack.Screen name='Registro' component={ScreenRegistro} options={{    
            title: 'Volver al Inicio',
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#ff0101',
            headerTitleStyle: { fontSize: 20, fontWeight: 'bold', fontFamily: 'serif',},
          }}></Stack.Screen>
          
          <Stack.Screen name='Coliceo' component={Tabs} options={{
            headerTitle: () => (
            <>
              <Image
                source={require('./img/Logo.png')}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
              <Text style={styles.titulo}>Cine Coliseo</Text>
            </>
            ), 
            headerStyle: { backgroundColor: '#000' },
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: { flex: 1,  justifyContent: 'center', backgroundColor: '#000000' },
  titulo: {color: '#ff0101',  fontSize: 35, fontFamily: 'serif'}
});