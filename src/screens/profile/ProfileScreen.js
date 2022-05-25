import { useState, useEffect } from "react";
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
  Platform,
} from "react-native";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateU } from "../../services/user/UserService";

import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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
  const [image, setImage] = useState("");

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
  
  
   //Image-----------------------
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Requerimos los permisos para hacer esto funcionar");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      const storage = getStorage(); //Storage itself

      const direction = "images/" + auth.currentUser.displayName + parseInt(Math.floor(Math.random() * 500));
      const refe = ref(storage, direction); //how the image will be addressed inside the storage

      const img = await fetch(result.uri);
      const bytes = await img.blob();

      await uploadBytes(refe, bytes); // upload image
      getDownloadURL(ref(storage,direction))
        .then((url) =>{
          setImage(url)
        })
        .catch((err) =>{
          console.log(err)
        })
      setExistChanges(true)
    }
  };


  return (
    <ScrollView style={styles.main}>
      {/*Header*/}
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',padding:20,}}>
          <View style={{marginLeft: 10}}>
            <TouchableOpacity style={[styles.button, { marginRight: 10 }]}>
              <Text onPress={pickImage} style={styles.buttonText}>
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
            defaultSource={{uri: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" }}
            source={{
              uri: auth.currentUser.photoURL,
            }}
            style={styles.profilePicture}
          />
          <Text style={{ fontWeight: "600", fontSize: 30, padding: 5 }}>
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
              updateU(email, password, name, image,auth.currentUser);
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
