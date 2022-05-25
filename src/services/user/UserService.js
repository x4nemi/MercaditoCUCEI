import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";

import { collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { getAuth, updateProfile } from "firebase/auth";



//App Settings
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Auth Settings
const auth = getAuth();
const currentUser = auth.currentUser;
//photoURL
export async function updateU(Nemail, Npassword, name,image,currUser) {
  let newUser = {};
  if (Nemail != "") newUser = { ...newUser, email: Nemail };
  if (Npassword != "") newUser = { ...newUser, password: Npassword };
  if (name != "") newUser = { ...newUser, displayName: name };
  if(image != "") newUser= {...newUser, photoURL:image};
  updateProfile(currUser, newUser)
    .then(() => {
      //Editamos el nombre almacenado en la base de datos
      // querySnapshot.forEach((doc) =>{
      //   await setDoc(doc()){}
      // })
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(auth.currentUser.displayName);
  // const q = query(collection(db, "usuarios"), where("user_id", "==", uid));
  // console.log("After query")
  // const querySnapshot = await getDocs(q)
  // querySnapshot.forEach((doc) =>{
  //   console.log("On Snapshot")
  //   setDoc(doc,{"name":name},{merge:true})
  // })
  // Alert.alert("Se actualizó el usuario")
}

