import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";

import { collection, query, where, getDocs, setDoc, doc, addDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";

import { getFirestore } from "firebase/firestore";

import { getAuth, updateProfile } from "firebase/auth";

//App Settings
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Auth Settings
const auth = getAuth(app);
const currentUser = auth.currentUser;

export async function createFavorite(userId){
  console.log(userId)
  const docRef = await addDoc(collection(db, "favoritos"), {
    user_id:userId,
    favorites:[],
  });
  console.log(docRef)

}

export async function updateFavorite(productId,exists){
  const userId = auth.currentUser.uid
  const q = query(collection(db, "favoritos"), where("user_id", "==" , userId))
  const querySnap = await getDocs(q)
  querySnap.forEach((i) =>{
    const ref = doc(db, "favoritos",i.id);
    if(exists){
      updateDoc(ref,{
        favorites: arrayRemove(productId)
      })
    }else {
      updateDoc(ref,{
        favorites: arrayUnion(productId)
      })
    }
  })
}

export async function getFavorites(){
  let favs = []
  console.log("fetching favorites")
  const userId = auth.currentUser.uid
  const q = query(collection(db, "favoritos"), where("user_id", "==" , userId))
  const querySnap = await getDocs(q)
  querySnap.forEach((i) =>{
    let obj =  i.data()
    favs = [...obj.favorites]
  })
  return favs
}

