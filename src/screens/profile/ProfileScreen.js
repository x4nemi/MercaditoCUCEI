import { useState, Alert } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateU } from "../../services/user/UserService";

function ProfileScreen() {
  //Auth
  const auth = getAuth();
  const currentUser = auth.currentUser;

  //States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [existChanges, setExistChanges] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const navigation = useNavigation();

  //On Press Cancel Button
  const onCancel = () => {
    setShowCancel(false);
    setEmail("");
    setName("");
    setPassword("");
  };

  // Logout user and sent to login screen
  const LogOut = () => {
    auth.signOut();
    navigation.navigate("Login");
  };
  
  // Should upload a picture PENDING*****
  const UploadPicture = () => {
    console.log("Upload Profile Picture");
    // alert.apply("Upload Profile Picture");
    // auth.signOut();
    // navigation.navigate("Login");
  };
  

  return (
    <ScrollView style={styles.main}>
      {/*Header*/}
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginLeft: 10}}>
            <TouchableOpacity style={[styles.button, { marginRight: 10 }]}>
              <Text onPress={UploadPicture} style={styles.buttonText}>
                Sube tu Foto
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={[styles.button, { marginRight: 10 }]}>
              <Text onPress={LogOut} style={styles.buttonText}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*Profile Pic */}
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
            }}
            style={styles.profilePicture}
          />
          <Text style={{ fontWeight: "600", fontSize: 30 }}>
            {currentUser.displayName ?? "Usuario"}
          </Text>
        </View>
      </View>
      {/**Form*/}
      <View style={styles.form}>
        {/**Nombre */}
        <View>
          <Text style={styles.formText}>Nombre</Text>
          <TextInput
            onChangeText={(text) => {
              setName(text);
              setExistChanges(true);
              if (text != "") setShowCancel(true);
            }}
            value={name}
            style={styles.input}
            placeholder={currentUser.displayName ?? "Nombre del Usuario"}
            autoComplete={"name"}
          />
        </View>
        {/**Email */}
        <View>
          <Text style={styles.formText}>E-mail</Text>
          <TextInput
            onChangeText={(text) => {
              setEmail(text);
              if (text != "") setShowCancel(true);
              setExistChanges(true);
            }}
            value={email}
            style={styles.input}
            placeholder={currentUser.email ?? "Correo Electronico"}
            autoComplete={"email"}
          />
        </View>
        {/**Password */}
        <View>
          <Text style={styles.formText}>Contraseña</Text>
          <TextInput
            onChangeText={(text) => {
              setPassword(text);
              if (text != "") setShowCancel(true);
              setExistChanges(true);
            }}
            value={password}
            style={styles.input}
            placeholder="******"
            secureTextEntry={true}
          />
        </View>
        {/**Button Submit */}
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          {showCancel && (
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={!existChanges}
            onPress={() => {
              updateU(email, password, name, auth.currentUser);
              LogOut();
              navigation.navigate("Login");
            }}
            style={[
              styles.button,
              {
                backgroundColor: existChanges == false ? "#a7f3d0" : "#4ade80",
              },
            ]}
          >
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    borderRadius: 10,
    backgroundColor: "white",
    margin: 10,
  },
  header: {
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight + 15 || 15,
  },
  button: {
    backgroundColor: "#4ade80",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 8,
    alignItems: "center",
  },
  form: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: "#dcdcdc",
    paddingBottom: 100,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  formText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1,
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    backgroundColor: "#ffffff90",
  },
});
