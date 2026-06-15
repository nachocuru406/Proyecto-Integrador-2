import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/Config";
import PostPerfil from "../Components/PostPerfil";

export default function Perfil(props) {
  const [misPosts, setMisPosts] = useState([]);
  const [username, setUsername] = useState("");

  const email = auth.currentUser.email;

  useEffect(() => {
    db.collection("users")
      .where("email", "==", email)
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          setUsername(doc.data().username);
        });
      });

    db.collection("posts")
      .where("email", "==", email)
      .onSnapshot(
        (docs) => {
          let posts = [];

          docs.forEach((doc) => {
            posts.push({
              id: doc.id,
              data: doc.data(),
            });
          });

          setMisPosts(posts);
        },
        (error) => {
          console.log("Error trayendo los posts: ", error);
        }
      );
  }, []);

  function logout() {
    auth
      .signOut()
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{username}</Text>
      <Text style={styles.email}>{email}</Text>

      <Text style={styles.subtitulo}>Últimos posteos</Text>

      <FlatList
        data={misPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostPerfil
            postData={item.data}
            id={item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Pressable
        style={[styles.button, styles.logoutBtn]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  nombre: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  email: {
    color: "gray",
    fontSize: 16,
    marginBottom: 25,
  },
  subtitulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  button: {
    width: 250,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});