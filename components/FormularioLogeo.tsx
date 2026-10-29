import React from 'react';
import {
  StyleSheet, Text, TextInput, Button,
  KeyboardAvoidingView, ScrollView, Platform
} from 'react-native';

type Props = {
  email: string;
  pasword: string;
  onChangeEmail: (texto: string) => void;
  onChangePasword: (texto: string) => void;
  onIngresar: () => void;
  onRegistrar: () => void;
  puedeEnviar: boolean;
};

export const Formulario: React.FC<Props> = ({
  email, pasword, onChangeEmail, onChangePasword,
  onIngresar, onRegistrar, puedeEnviar,
}) => (
  <KeyboardAvoidingView
    style={styles.view}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Inicio de Sesión</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={onChangeEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={pasword}
        onChangeText={onChangePasword}
      />

      <Button title="Ingresar" color="#f70202" onPress={onIngresar} disabled={!puedeEnviar} />

      <Text style={styles.cuenta}>No tengo una cuenta</Text>
      <Button title="Registrate" color="#8b050a"onPress={onRegistrar} />
    </ScrollView>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: '#000000' },
  container: { flexGrow: 1, padding: 40, justifyContent: 'center', backgroundColor: '#000000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#ffffff' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#ffffff' },
  cuenta: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, marginTop: 40, color: '#ffffff' },
  input: { borderWidth: 1, borderColor: '#fff', padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#f9f9f9' },
});