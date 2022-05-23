import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";

import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert } from "react-native";

//App Settings
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Auth Settings
const auth = getAuth();
const currentUser = auth.currentUser;

export async function updateUser(Nemail, Npassword, name) {
  updateProfile(auth.currentUser, {
    email:Nemail,
    password: Npassword,
  })
    .then(() => { //Editamos el nombre almacenado en la base de datos
      const q = query(collection(db, "usuarios"), where("user_id", "==", currentUser.uid));
      Alert.alert("Se actualizó el usuario")
    })
    .catch((error) => {
      console.log(error)
    });
}
