import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, Image, Button, Alert, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import { openDatabase } from '../services/Database';
import { RootTabParamList } from '../types/NavigationTab';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ActualizarDatos } from '../components/FormularioPerfil'
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

type Props = BottomTabScreenProps<RootTabParamList, 'Perfil'>;

interface MisDatos {
  nombre: string;
  dni: string;
  email: string;
  foto: string | null;
}

const PantallaInicio: React.FC<Props> = ({ navigation, route }) => {
  const { id_usuario } = route.params;
  const [datos, setDatos] = useState<MisDatos[]>([]);
  const [nuevo_email, setEmail] = useState('');
  const [nuevo_nombre, setNombre] = useState('');
  const [nuevo_dni, setDni] = useState('');

  const existeNombre = nuevo_nombre.trim() !== '' && nuevo_nombre.length > 3;
  const existeEmail = nuevo_email.includes('@') && nuevo_email.length > 6 && nuevo_email.includes('.com')
  const existeDni =  nuevo_dni.length > 6 

  
  const [foto, setFoto] = useState<string | null>(null);

  const abrirCamara = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para sacar la foto');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      setFoto(uri);
      const db = await openDatabase();
      await db.runAsync('UPDATE users SET foto = ? WHERE id_usuario = ?', uri, id_usuario);
    }
  };

  
  async function cargar() {
    const db = await openDatabase();
    
    const misDatos =  await db.getAllAsync<MisDatos>('SELECT * FROM users WHERE id_usuario = ?', id_usuario);
    setDatos(misDatos);
    setFoto(misDatos[0]?.foto ?? null);
  }

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [id_usuario])
  )


  const cambioDato = async () => {
    const db = await openDatabase();
    
    try{
      if (nuevo_nombre !== ''){
        await db.runAsync('UPDATE users SET nombre = ? WHERE id_usuario = ?', nuevo_nombre, id_usuario);
        setNombre('');
      }
      if (nuevo_dni !== ''){
        await db.runAsync('UPDATE users SET dni = ? WHERE id_usuario = ?', nuevo_dni, id_usuario);
        setDni('');
      }
      
      if (nuevo_email !== ''){
        await db.runAsync('UPDATE users SET email = ? WHERE id_usuario = ?', nuevo_email, id_usuario);
        setEmail('');
      }

      cargar();
    }

    catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo hacer el cambio');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: 'center', backgroundColor: '#000' }}>
          <Image source={foto ? { uri: foto } : require('../img/perfil.jpg')} style={styles.cartel} resizeMode="cover" />
          <Button title="Cambiar foto" color="#ff0707" onPress={abrirCamara} />

          <ActualizarDatos 
          dato={nuevo_nombre}
          datoActual={`Nombre actual: ${datos[0]?.nombre}`}
          leyenda='Tu nuevo nombre' 
          onChangeDato={setNombre} 
          onActualizar={cambioDato} 
          puedeEnviar={existeNombre} />
          
          <ActualizarDatos 
          dato={nuevo_email}
          datoActual={`Email actual: ${datos[0]?.email}`}
          leyenda='Tu nuevo email' 
          onChangeDato={setEmail} 
          onActualizar={cambioDato} 
          puedeEnviar={existeEmail} />

          <ActualizarDatos 
          dato={nuevo_dni}
          datoActual={`DNI actual: ${datos[0]?.dni}`}
          leyenda='Tu nuevo dni' 
          onChangeDato={setDni} 
          onActualizar={cambioDato} 
          puedeEnviar={existeDni} />
        </View>

        <View style={styles.view}>
          <Text style={styles.cuenta}>Deseas cerrar cesion?</Text>
          <Button title="Cerrar Sesión" color="#ff0707" onPress={() => navigation.getParent()?.replace('Logeo')} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: '#000000', alignItems: 'center'},
  cuenta: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, marginTop: 40, color: '#ffffff' },
  cartel: {
    width: 100, height: 100,
    marginTop: 25,
    marginBottom: 5,
    borderRadius: 50,
    alignSelf: 'center',
  },
});