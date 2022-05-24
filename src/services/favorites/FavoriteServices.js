import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";

import { collection, query, where, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { getAuth, updateProfile } from "firebase/auth";
import { async } from "@firebase/util";

//App Settings
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Auth Settings
const auth = getAuth();
const currentUser = auth.currentUser;

export async function createFavorite(userId){
  console.log(userId)
  const docRef = await addDoc(collection(db, "favoritos"), {
    user_id:userId
  });
  console.log(docRef)

}

export async function updateFavorite(product_id){
  const userId = auth.currentUser.uid
}

