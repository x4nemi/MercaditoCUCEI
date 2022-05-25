import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Linking,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { updateU } from "../../services/user/UserService";
import { createFavorite } from "../../services/favorites/FavoriteServices";

//FireBase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";

//Navigation
import { useNavigation } from "@react-navigation/native";

const wallpaper =
  "https://media.discordapp.net/attachments/935321362891948034/966202380435718195/backgroud.png?width=311&height=670";

export default function LoginScreen() {
  //States
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //Navigation
  const navigation = useNavigation();

  //FireBase Config
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  //Sign Up
  const handleCreateAccount = async () => {
    let userId;
    const correo = email;
    if (/^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!alumnos.udg)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/.test(correo)){
      alert("Sólo correo institucional!");
    }
    else{
      // Código de que sí está bien
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Se ha creado la cuenta (-:");
        alert("Se ha creado la cuenta con exito!");
        navigation.navigate("Login");
        userId = userCredential.user.uid;
        createFavorite(userId);
        let at = email.lastIndexOf("@");
        let aux = email.slice(0, at);
        updateU(email, password, aux, userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  //Sign In
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Se ha Iniciado Sesión (-:");
        const user = userCredential.user;
        console.log(user.displayName);
        navigation.navigate("Panels");
      })
      .catch((error) => {
        alert("Datos invalidos");
        console.log(error);
      });
  };

  const toAviso = () => {
    navigation.push("Aviso de privacidad");
  };

  //CuentaScreen
  return (
    <View style={styles.container}>
      <Image
        backgroundColor
        blu
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
            <Text
              style={{ color: "blue", justifyContent: "space-between" }}
              onPress={() => Linking.openURL("mailto:mercaditocucei@gmail.com")}
            >
              ¿Necesitas ayuda?
            </Text>
            <Image
              source={require("../../assets/logo2.png")}
              style={styles.profilePicture}
            />

            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                E-mail
              </Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="nombre@alumnos.udg.mx"
              />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Contraseña
              </Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="contraseña"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Entrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreateAccount}
              style={[styles.button, { backgroundColor: "#34d399" }]}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Crear Cuenta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toAviso}>
              <Text style={{ textDecorationLine: "underline" }}>
                Aviso de Privacidad
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

//Styles Login Screen
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
    marginVertical: 10,
    resizeMode: "center",
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
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
