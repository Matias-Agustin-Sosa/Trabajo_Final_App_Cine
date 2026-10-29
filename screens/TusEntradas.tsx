import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { openDatabase } from '../services/Database';
import { RootTabParamList } from '../types/NavigationTab';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<RootTabParamList, 'Entradas'>;

interface Historial {
  id: number;
  id_user: number;
  titulo: string;
  imagen: number;
  horario: string;
  dia: string;
  formato: string;
  idioma: string;
  asientos: string;
}

const ScreenTusEntradas: React.FC<Props> = ({route}) => {
  const { id_usuario } = route.params;
  const [entradas, setEntradas] = useState<Historial[]>([]);

  useFocusEffect(
    useCallback(() => {
      const cargar = async () => {
        const db = await openDatabase();
        if (!db) return;

        const filas = await db.getAllAsync<Historial>(
          'SELECT * FROM entradas WHERE id_user = ? ORDER BY id DESC',
          id_usuario
        );
        setEntradas(filas);
      };

      cargar();
    }, [id_usuario])
  );

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.centrado}
      data={entradas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.tarjeta}>
          <Image source={item.imagen} style={styles.cartel} resizeMode="cover" />
          <View style={styles.info}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.datos}>Horario: {item.horario}</Text>
            <Text style={styles.datos}>Entradas: {item.asientos}</Text>
            <Text style={styles.datos}>Idioma: {item.idioma}</Text>
            <Text style={styles.datos}>Formato: {item.formato}</Text>
            <Text style={styles.datos}>Dia: {item.dia}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default ScreenTusEntradas;

const styles = StyleSheet.create({
  lista: { backgroundColor: '#000000' },
  centrado: {
    padding: 10,
    paddingBottom: 30,
    alignItems: 'center',
  },
  tarjeta: {
    width: '95%',
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 20,
    overflow: 'hidden',
  },
  cartel: { width: 120, height: 200 },
  info: { flex: 1, padding: 22, justifyContent: 'center', marginLeft: 15},
  titulo: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  datos: { color: '#bbb', marginTop: 4 },
});