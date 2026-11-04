import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Alert, TextInput, Button } from 'react-native';
import { SelectorOpciones } from './CardOpciones';
import { openDatabase } from '../services/Database';
import { imagenes } from '../services/RutasImagenes'

const horarios = ['18:00', '20:30', '22:45'];
const dias = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];


interface Props {
  titulo: string;
  imagen: string;
  id_usuario: number;
}

export const ConfirmaCompra: React.FC<Props> = ({ titulo, imagen, id_usuario }) => {
  const [horario, setHorario] = useState('20:30');
  const [dia, setDia] = useState('Lun');
  const [formato, setFormato] = useState('2D');
  const [idioma, setIdioma] = useState('ES');
  const [asientos, setAsientos] = useState('1');

  const Comprar = async () => {
    const db = await openDatabase();
    
    try {
      await db.runAsync(
        'INSERT INTO entradas (id_user, titulo, imagen, horario, dia, formato, idioma, asientos) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        id_usuario, 
        titulo,
        imagen, 
        horario,
        dia,
        formato,
        idioma,
        asientos
      );

      Alert.alert('Compra Realizada con exito', 'Podes consultar los datos de tu compra en la pestaña Entradas')
    }
    catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo confirmar la compra');
    }
  }

    
  return (
  <>
      <View style={styles.tarjeta}>
          <Text style={styles.titulo}>{titulo}</Text>
          <View style={{flexDirection: 'row'}}>
              <Image source={imagenes[imagen]} style={styles.cartel} resizeMode="cover" />

              <View>
              <SelectorOpciones titulo="Horario:" valor={horario} opciones={horarios} onCambio={setHorario} />
              <SelectorOpciones titulo="Día:" valor={dia} opciones={dias} onCambio={setDia} />
              <SelectorOpciones titulo="Formato:" valor={formato} opciones={['2D', '3D']} onCambio={setFormato} />
              <SelectorOpciones titulo="Idioma:" valor={idioma} opciones={['ES', 'EN']} onCambio={setIdioma} />
              <SelectorOpciones titulo="Asientos:" valor={asientos} opciones={['1','2','3','4','5']} onCambio={setAsientos} />
              </View>
          </View>
          <Button title="Confirmar Comprar" color="#ff0101" onPress={Comprar} />
          <Text style={styles.marca}>Exlusivo Coliceo</Text>
      </View>
  </>
  );
}


const styles = StyleSheet.create({
  lista: { flex: 1, backgroundColor: '#000000', alignItems: 'center' },
  contenido: { padding: 16 },
  tarjeta: {
    width: '100%',
    backgroundColor: '#2b2b2d',
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cartel: {
    width: 230, height: 430,
    marginTop: 3, 
    marginBottom: 20,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    fontFamily: 'serif',
  },
  marca: {color: '#ff0101', fontSize: 10, marginTop: 10, marginBottom:10, fontStyle: 'italic'}
});