import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from "../Firebase/Config";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = () => {
    setError('');
    if (!email.includes('@')) {
      setError('Email mal formateado');
      return;
    }
    if (password.length < 6) {
      setError('La password debe tener una longitud mínima de 6 caracteres');
      return;
    }
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        navigation.navigate('NavegacionTab');
      })
      .catch((err) => {
        setError('Credenciales incorrectas');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.field}
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.field}
        keyboardType="default"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {
        error !== "" ?
          <Text style={styles.errorText}>{error}</Text>
          :
          null
      }
      <Pressable style={styles.button} onPress={() => navigation.navigate("NavegacionTab")}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.buttonText}>No tengo cuenta</Text>
      </Pressable>

      <View style={styles.realTimeContainer}>
        <Text style={styles.realTimeTitle}>Visualización en tiempo real:</Text>
        <Text>Email: {email}</Text>
        <Text>Password: {password}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  field: {
    height: 50,
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745',
    marginTop: 10,
    width: 250,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  realTimeContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 250,
  },
  realTimeTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 250,
  }
});