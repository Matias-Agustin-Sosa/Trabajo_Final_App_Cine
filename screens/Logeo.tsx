import React, { useState } from 'react';
import { Alert } from 'react-native';
import { openDatabase} from '../services/Database';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { Formulario } from '../components/FormularioLogeo'

type LogeoNavProp = NativeStackNavigationProp<RootStackParamList, 'Logeo'>;

type Props = {
  navigation: LogeoNavProp;
};

const ScreenLogeo : React.FC<Props> = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [pasword, setPasword] = useState('');


  // Función para registrar el usuario en SQLite
  const inicioSecion = async () => {
    const db = await openDatabase();
    
    if (!db) return;

    try {

      const existe : any[] =  await db.getAllAsync('SELECT * FROM users WHERE email = ?', email);


      if (existe.length !== 0 && existe[0].pasword === pasword) {
        const nombre = existe[0].nombre;
        const id_usuario = existe[0].id_usuario;
        const dni = existe[0].dni;

        
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

        // Limpiar formulario
        //setEmail('');
        //setPasword('');
      }

      else{
        Alert.alert('Email o contraseña incorrecta');
      }
    } 
    
    catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error de la app.');
    }
  };

  const puedeEnviar = 
    email.includes('@') && 
    pasword.trim() !== '';

  return (
    <Formulario
      email={email}
      pasword={pasword}
      onChangeEmail={setEmail}
      onChangePasword={setPasword}
      onIngresar={inicioSecion}
      onRegistrar={() => navigation.navigate('Registro')}
      puedeEnviar={puedeEnviar}
    />
  );
}

export default ScreenLogeo;