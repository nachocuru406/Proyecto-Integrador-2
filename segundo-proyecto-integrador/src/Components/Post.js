import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { auth, db } from '../Firebase/Config';
import firebase from 'firebase';

export default function Post({ postData, id, navigation }) {
  const [likesCount, setLikesCount] = useState(0);
  const [isMyLike, setIsMyLike] = useState(false);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    let unArray = postData.likes ? postData.likes : [];

    setLikesCount(unArray.length);

    if (unArray.includes(auth.currentUser.email)) {
      setIsMyLike(true);
    } else {
      setIsMyLike(false);
    }
  }, [postData]);

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comentarios")
      .orderBy("createdAt", "desc")
      .limit(2)
      .onSnapshot((docs) => {
        let comentariosArray = [];

        docs.forEach((doc) => {
          comentariosArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setComentarios(comentariosArray);
      });
  }, [id]);

  const likePost = () => {
    db.collection('posts')
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => {
        console.log('Like agregado');
      })
      .catch(err => console.log('Error al dar like:', err));
  };
  const unlikePost = () => {
    db.collection('posts')
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(() => {
        console.log('Like quitado');
      })
      .catch(err => console.log('Error al quitar like:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{postData.email}</Text>
      <Text style={styles.description}>{postData.descripcion}</Text>
      <View style={styles.likesContainer}>
        <Text style={styles.likesCount}>{likesCount} Likes</Text>
        {isMyLike ? (
          <Pressable onPress={unlikePost} style={styles.unlikeBtn}>
            <Text style={styles.btnText}>Quitar Like</Text>
          </Pressable>
        ) : (
          <Pressable onPress={likePost} style={styles.likeBtn}>
            <Text style={styles.btnText}>Like</Text>
          </Pressable>
        )}
        <Pressable onPress={() => navigation.navigate('Comentarios', { id: id })} style={styles.commentBtn}>
          <Text style={styles.btnText}>Comentarios</Text>
        </Pressable>
      </View>
      <View style={styles.commentsContainer}>
        {comentarios.map((comentario) => (
          <View key={comentario.id} style={styles.commentBox}>
            <Text style={styles.commentEmail}>
              {comentario.data.email}
            </Text>
            <Text style={styles.commentText}>
              {comentario.data.texto}
            </Text>
          </View>
        ))}
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
  likesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  likesCount: {
    fontWeight: 'bold',
    color: '#555',
  },
  likeBtn: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  unlikeBtn: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  commentBtn: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentBox: {
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
  },
  commentEmail: {
    fontWeight: "bold",
    color: "#007BFF",
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
});