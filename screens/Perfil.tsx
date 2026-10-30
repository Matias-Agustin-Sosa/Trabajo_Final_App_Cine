import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, Button, Alert, KeyboardAvoidingView, ScrollView, Platform, View } from 'react-native';
import { openDatabase } from '../services/Database';
import { RootTabParamList } from '../types/NavigationTab';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ActualizarDatos } from '../components/FormularioPerfil'

type Props = BottomTabScreenProps<RootTabParamList, 'Perfil'>;

interface MisDatos {
  nombre: string;
  dni: string;
  email: string;
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

  
  async function cargar() {
    const db = await openDatabase();
    
    const misDatos =  await db.getAllAsync<MisDatos>('SELECT * FROM users WHERE id_usuario = ?', id_usuario);
    setDatos(misDatos);
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

  return ( //Cambio Prefil
    <>
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

      <View style={styles.view}>
        <Text style={styles.cuenta}>Deseas cerrar cesion?</Text>
        <Button title="Cerrar Sesión" color="#ff0707" onPress={() => navigation.getParent()?.replace('Logeo')}/>
      </View>
    </>

  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: '#000000', alignItems: 'center'},
  container: { flexGrow: 1, padding: 40, justifyContent: 'center', backgroundColor: '#000000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#ffffff' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#ffffff' },
  cuenta: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, marginTop: 40, color: '#ffffff' },
  input: { borderWidth: 1, borderColor: '#fff', padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#f9f9f9' }
});


/*
*/