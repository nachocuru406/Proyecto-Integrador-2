import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { auth, db } from '../Firebase/Config';

export default function PostPerfil({ postData, id }) { 

  const deletePost = () => {
    db.collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Post eliminado exitosamente');
      })
      .catch(err => console.log('Error al eliminar post:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{postData.email}</Text>
      <Text style={styles.description}>{postData.descripcion}</Text>
      <View style={styles.actionContainer}>
        <Pressable onPress={deletePost} style={styles.deleteBtn}>
          <Text style={styles.btnText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 450, 
  },
  email: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  deleteBtn: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  btnText: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 12,
  }
});