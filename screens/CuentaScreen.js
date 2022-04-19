import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const wallpaper =
  "https://cdn.ipadizate.com/2020/08/iOS-14-promotional-gradients-iphone-wallpaper-ar72014-idownloadblog-1.jpeg";

export default function CuentaScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: wallpaper }}
        style={[styles.image, StyleSheet.absoluteFill]}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlurView intensity={40}>
          <View style={styles.login}>
            <Image source={{ uri: wallpaper }} style={styles.profilePicture} />
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                E-mail
              </Text>
              <TextInput style={styles.input} placeholder="nombre@correo.com" />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Contraseña
              </Text>
              <TextInput
                style={styles.input}
                placeholder="contraseña"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Entrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#6792F090" }]}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Crear Cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1c4ec0",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  login: {
    width: 350,
    height: 500,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1,
    marginVertical: 10,
  },

  input: {
    width: 250,
    height: 40,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#00cfeb90",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
