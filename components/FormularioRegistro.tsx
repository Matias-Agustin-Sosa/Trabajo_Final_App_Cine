import React from 'react';
import { StyleSheet, Text, TextInput, Button, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

type Props = {
  nombre: string;
  dni: string;
  email: string;
  pasword: string;
  onChangeNombre: (texto: string) => void;
  onChangeDni: (texto: string) => void;
  onChangeEmail: (texto: string) => void;
  onChangePasword: (texto: string) => void;
  onRegistrar: () => void;
  puedeEnviar: boolean;
};

export const Formulario: React.FC<Props> = ({
  nombre, dni, email, pasword,
  onChangeNombre, onChangeDni, onChangeEmail, onChangePasword,
  onRegistrar, puedeEnviar,
}) => (
  <KeyboardAvoidingView
    style={styles.view}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Registro de Usuario</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={nombre}
        onChangeText={onChangeNombre}
      />

      <Text style={styles.label}>DNI</Text>
      <TextInput
        style={styles.input}
        placeholder="11111111"
        keyboardType="number-pad"
        value={dni}
        // Evita la inserción de texto que no sea numérico
        onChangeText={(texto) => onChangeDni(texto.replace(/[^0-9]/g, ''))}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={onChangeEmail}
      />

      <Text style={styles.label}>Contraseña (mínimo 8 caracteres)</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={pasword}
        onChangeText={onChangePasword}
      />

      <Button title="Registrarse" color="#f70202" onPress={onRegistrar} disabled={!puedeEnviar} />
    </ScrollView>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: '#000000' },
  container: { flexGrow: 1, padding: 40, justifyContent: 'center', backgroundColor: '#000000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#ffffff' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#ffffff' },
  input: { borderWidth: 1, borderColor: '#fff', padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#f9f9f9' },
});