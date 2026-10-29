import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, Button, Alert,
  KeyboardAvoidingView, ScrollView, Platform
} from 'react-native';
import { openDatabase } from '../services/Database';
import { RootTabParamList } from '../types/NavigationTab';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<RootTabParamList, 'Perfil'>;


const PantallaInicio: React.FC<Props> = ({ navigation, route }) => {
  const { id_usuario, nombre,  dni, email, pasword} = route.params;
  const [nuevo_email, setEmail] = useState('');
  const [nuevo_nombre, setNombre] = useState('');
  const [nuevo_dni, setDni] = useState('');
  const [nuevo_pasword, setNuevoPasword] = useState('');
  const [viejo_pasword, setPaswordViejo] = useState('');
  

  const cambioDato = async () => {
    const db = await openDatabase();
    
    try{
      if (nombre !== nuevo_nombre && nuevo_nombre !== ''){
        await db.runAsync('UPDATE users SET nombre = ? WHERE id_usuario = ?', nuevo_nombre, id_usuario);
      }

      if (nuevo_dni !== dni && nuevo_dni !== ''){
        await db.runAsync('UPDATE users SET dni = ? WHERE id_usuario = ?', nuevo_dni, id_usuario);
      }
      
      if (nuevo_email !== email && nuevo_email !== ''){
        await db.runAsync('UPDATE users SET email = ? WHERE id_usuario = ?', nuevo_email, id_usuario);
      }

      setDni('');
      setNombre('');
      setEmail('');

      Alert.alert('Éxito', 'Cambios guardados');
    }
    catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo hacer el cambio');
    }
  };

  const puedeEnviar = 
    nuevo_nombre.trim() !== '' ||
    nuevo_dni !== '' ||
    nuevo_email.includes('@')
  ;

  return (
    <KeyboardAvoidingView
      style={styles.view}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Nombre y Apellido: {nuevo_nombre}</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          autoCapitalize="none"
          value={nuevo_nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>DNI: {dni}</Text>
        <TextInput
          style={styles.input}
          placeholder="11111111"
          keyboardType="number-pad"
          value={nuevo_dni}
          // Evita la incercion de texto
          onChangeText={(texto) => setDni(texto.replace(/[^0-9]/g, ''))}
        />
        

        <Text style={styles.label}>Email: {nuevo_email}</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={nuevo_email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña Actual</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={viejo_pasword}
          secureTextEntry
          onChangeText={setPaswordViejo}
        />
        
        <Button title="Guardar cambios" color="#08fbfb" onPress={cambioDato} disabled={!puedeEnviar}/>

        <Text style={styles.cuenta}>Deseas cerrar cesion?</Text>
        <Button title="Cerrar Sesión" color="#ff0707" onPress={() => navigation.getParent()?.replace('Logeo')}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: '#000000' },
  container: { flexGrow: 1, padding: 40, justifyContent: 'center', backgroundColor: '#000000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#ffffff' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#ffffff' },
  cuenta: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, marginTop: 40, color: '#ffffff' },
  input: { borderWidth: 1, borderColor: '#fff', padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#f9f9f9' }
});