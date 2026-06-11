import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../Firebase/Config';

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection('users').onSnapshot(docs => {
      let usersArray = [];
      docs.forEach(doc => {
        usersArray.push({
          id: doc.id,
          data: doc.data()
        });
      });
      console.log('Usuarios obtenidos:', usersArray);
      setUsers(usersArray);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList 
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.emailText}>Email: {item.data.email}</Text>
            <Text style={styles.userText}>Usuario: {item.data.username}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
    '#fff', 
    alignItems: 'center',
    paddingTop: 40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  userCard: {
    width: 250,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9'
  },
  emailText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  userText: {
    color: '#555',
    marginTop: 5
  },
});