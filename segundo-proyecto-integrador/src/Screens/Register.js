import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from "../Firebase/Config"; 

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Usuario autenticado:', userCredential.user.email);
        db.collection('users').add({
          email: email,
          username: username,
          createdAt: Date.now()
        })
        .then(() => {
          console.log('Datos guardados en la colección users');
          navigation.navigate('Login');
        })
        .catch(err => console.log('Error al guardar en BD:', err));
        
      })
      .catch((err) => {
        console.log(err);
        setError('Hubo un error al registrar el usuario.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.field}
        keyboardType="email-address"
        placeholder="Ingrese su email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.field}
        keyboardType="default"
        placeholder="Ingrese su nombre de usuario"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.field}
        keyboardType="default"
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Registrate</Text>
      </Pressable>
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
    textAlign: 'center'},
  field: {
    height: 50,
    width: 250,
    paddingVertical:
    15, paddingHorizontal:
    10, borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 10
  },
  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 10,
    width: 250
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontWeight: 'bold',
    width: 250,
    textAlign: 'center'
  }
});