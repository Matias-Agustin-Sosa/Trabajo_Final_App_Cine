import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet, Text, TextInput, Button,
  KeyboardAvoidingView, ScrollView, Platform,
  TouchableOpacity,
  View
} from 'react-native';

type Props = {
  dato: string;
  datoActual: string;
  leyenda: string;
  onChangeDato: (texto: string) => void;
  onActualizar: () => void;
  puedeEnviar: boolean;
};

export const ActualizarDatos: React.FC<Props> = ({ dato, onActualizar, onChangeDato, puedeEnviar, leyenda, datoActual}) => (
  <View style={styles.view}>
      <Text style={styles.label}>{datoActual}</Text>

      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          placeholder={leyenda}
          value={dato}
          onChangeText={onChangeDato}
        />

        <TouchableOpacity
          style={[styles.boton, !puedeEnviar && styles.botonDeshabilitado]}
          onPress={onActualizar}
          disabled={!puedeEnviar}
          accessibilityRole="button"
          accessibilityLabel="Actualizar datos"
        >
          <MaterialIcons name="check" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
  </View>
);

const styles = StyleSheet.create({
  view: {padding: 20, backgroundColor: '#000000' },
  container: { flexGrow: 1, padding: 40, justifyContent: 'center', backgroundColor: '#000000' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#ffffff' },
  input: { width:'80%', borderWidth: 1, borderColor: '#fff', padding: 10, borderRadius: 5, backgroundColor: '#f9f9f9' },
  boton: {
    backgroundColor: '#f70202',
    width: 48,
    height: 48,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: '#000'
  },
});