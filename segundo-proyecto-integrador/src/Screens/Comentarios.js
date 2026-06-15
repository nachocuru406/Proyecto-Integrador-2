import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../Firebase/Config";

export default function Comentarios({ route, navigation }) {
  const { id } = route.params;

  const [comentario, setComentario] = useState("");

  const publicarComentario = () => {
    if (comentario === "") return;

    db.collection("posts")
      .doc(id)
      .collection("comentarios")
      .add({
        texto: comentario,
        email: auth.currentUser.email,
        createdAt: Date.now(),
      })
      .then(() => {
        setComentario("");
        navigation.navigate("Home");
      })
      .catch((err) => console.log("Error al comentar:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí tu comentario..."
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setComentario(text)}
        value={comentario}
      />

      <Pressable style={styles.button} onPress={publicarComentario}>
        <Text style={styles.buttonText}>Publicar comentario</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 200,
    width: 450,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});