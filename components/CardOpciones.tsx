import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SelectorProps {
  titulo: string;
  valor: string;
  opciones: string[];
  onCambio: (valor: string) => void;
}

export const SelectorOpciones: React.FC<SelectorProps> = ({ titulo, valor, opciones, onCambio }) => (
  <>
    <Text style={styles.datos}>{titulo}</Text>
    <Picker
      selectedValue={valor}
      onValueChange={onCambio}
      style={styles.selecionable}
      dropdownIconColor="#ff0101"
    >
      {opciones.map((op) => (
        <Picker.Item key={op} label={op} value={op} />
      ))}
    </Picker>
  </>
);

const styles = StyleSheet.create({
  datos: {
    color: '#f8f8f8', 
    fontSize: 15, 
    fontWeight: 'bold',  
    marginLeft: 10, 
    marginTop: 3, 
    fontFamily: 'serif', 
  },
  selecionable: {
    color: '#f8f8f8', 
    backgroundColor: '#000',
    marginLeft: 10,  
    marginBottom: 12,
    width: 120,
    height: 50
  },
});