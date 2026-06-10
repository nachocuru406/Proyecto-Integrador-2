import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { auth, db } from "../Firebase/Config";
import Post from "../Components/Post";
import Usuarios from "./Usuarios";

export default function Home({ navigation }){
    const [posteos, setPosteos] = useState([]);

    useEffect(() => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let postsArray = [];
            docs.forEach(doc => {
                postsArray.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setPosteos(postsArray);
        });
    }, []);

    const logout = () => {
      auth.signOut()
        .then(() => {
          navigation.navigate('Login');
        })
        .catch(error => console.log(error));
    };

    return(
        <View style={styles.container}>
          <Text style={styles.title}>Muro de Posts</Text>
          <View style={styles.navContainer}>
            <Pressable style={styles.navButton} onPress={() => navigation.navigate('NuevoPost')}>
                <Text style={styles.buttonText}> + Nuevo Post </Text>
            </Pressable>
            <Pressable style={styles.navButton} onPress={() => navigation.navigate('Usuarios')}>
                <Text style={styles.buttonText}> Ver Usuarios </Text>
            </Pressable>
          </View>
          <FlatList 
            data={posteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Post postData={item.data} id={item.id} />}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <Pressable style={[styles.button, styles.logoutBtn]} onPress={logout}>
            <Text style={styles.buttonText}> Logout </Text>
          </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  navContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '10%',
  },
  button: {
    width: 250,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  }
});