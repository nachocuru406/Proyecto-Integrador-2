import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { auth, db } from "../Firebase/Config";
import Post from "../Components/Post";

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
          <FlatList 
            data={posteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Post postData={item.data} id={item.id} navigation={navigation} />}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
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
  list: {
    flex: 1,
    paddingHorizontal: '10%',
  },
});