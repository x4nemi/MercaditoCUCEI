import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
//Iinitalize app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Snapshot
export async function getProducts(){
  let products = []
  try{
    //Snapshot
    const querySnapshot = await getDocs(collection(db, "productos"));
    console.log("Fetching")
    querySnapshot.forEach((doc) => {
      let obj = doc.data()
      products.push({...obj, id:doc.id})
    });
    return products
  }catch(error){
    console.log("[ERROR]")
    console.log(error);
  }
  
}