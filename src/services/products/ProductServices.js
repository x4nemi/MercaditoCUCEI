import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from "../../../firebase-config";

//Iinitalize app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Snapshot
const querySnapshot = await getDocs(collection(db, "productos"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

