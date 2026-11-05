import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { openDatabase } from '../services/Database';
import { ConfirmaCompra } from '../components/CompraTicket';
import { RootTabParamList } from '../navigation/NavigationTab';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


type Props = BottomTabScreenProps<RootTabParamList, 'Ticketera'>;

interface Pelicula {
  id: number;
  titulo: string;
  imagen: string;
}

const misPeliculas = async (): Promise<Pelicula[]> => {
  const db = await openDatabase();
  if (!db) return [];

  return await db.getAllAsync<Pelicula>('SELECT * FROM peliculas');
};

const ScreenTicketera: React.FC<Props> = ({route}) => {

  const { id_usuario } = route.params;
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);

  useEffect(() => {
    misPeliculas().then(setPeliculas);
  }, []);

  return (
    <View style={styles.lista}>
      <FlatList
        data={peliculas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ConfirmaCompra titulo={item.titulo} imagen={item.imagen} id_usuario={id_usuario}/>
        )}
      />
    </View>
  );
};

export default ScreenTicketera;

const styles = StyleSheet.create({
  lista: { flex: 1, backgroundColor: '#000000' },
});