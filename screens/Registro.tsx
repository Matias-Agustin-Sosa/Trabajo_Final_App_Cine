import React, { useState } from 'react';
import { Alert } from 'react-native';
import { openDatabase } from '../services/Database';
import { Formulario } from '../components/FormularioRegistro'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';

type RegistroNavProp = NativeStackNavigationProp<RootStackParamList, 'Registro'>;

type Props = {
  navigation: RegistroNavProp;
};

const ScreenRegistro : React.FC<Props> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pasword, setPasword] = useState('');
  const [dni, setDni] = useState('');


  const Registrate = async () => {
    const db = await openDatabase();
    
    if (!db) return;

    try {
      const existe : any[] =  await db.getAllAsync('SELECT email FROM users WHERE email = ?', email);

      if(existe.length === 0){ 
        const resultado = await db.runAsync(
          'INSERT INTO users (nombre, dni, email, pasword) VALUES (?, ?, ?, ?);',
          nombre, 
          dni,
          email, 
          pasword
        );

        const id_usuario = resultado.lastInsertRowId;
        
        navigation.replace('Coliceo', {
          screen: 'Ticketera',
          params: {
            id_usuario,
            nombre,
            dni,
            email,
            pasword,
          },
        });

        //setNombre('');
        //setDni('');
        //setEmail('');
        //setPasword('');
      }

      else{
        Alert.alert('Error', 'El usuario ya existe');
      }
    } 
    
    catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  const puedeEnviar = 
    nombre.trim() !== '' && dni.length > 3 &&
    dni.trim() !== '' && dni.length > 5 &&
    email.includes('@') && email.length > 6 && email.includes('.com') &&
    pasword.trim() !== '' && pasword.length > 7
  ;

  return (
    <Formulario
      nombre={nombre}
      dni={dni}
      email={email}
      pasword={pasword}
      onChangeNombre={setNombre}
      onChangeDni={setDni}
      onChangeEmail={setEmail}
      onChangePasword={setPasword}
      onRegistrar={Registrate}
      puedeEnviar={puedeEnviar}
    />
  );
}

export default ScreenRegistro;