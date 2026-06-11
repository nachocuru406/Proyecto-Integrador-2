import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../Firebase/Config';

export default function NuevoPost({ navigation }) {
  const [descripcion, setDescripcion] = useState('');

  const onSubmit = () => {
    db.collection('posts').add({
      email: auth.currentUser.email,
      descripcion: descripcion,
      createdAt: Date.now(),
      likes: []
    })
    .then(() => {
      console.log('Post creado exitosamente');
      setDescripcion('');
      navigation.navigate('Home'); 
    })
    .catch(err => console.log('Error al crear el post:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu mensaje aquí..."
        keyboardType="default"
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setDescripcion(text)}
        value={descripcion}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Publicar Post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 200,
    width: 450,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});