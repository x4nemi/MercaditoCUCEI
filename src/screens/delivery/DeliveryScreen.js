import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import RNPickerSelect from "react-native-picker-select";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const numbers = ["1", "2", "3", "4", "5"];

//database
const app = initializeApp(firebaseConfig);
const database = getFirestore();

const initSchedule = {
  days: ["Lunes"],
  initial_hour: "9:00",
  final_hour: "11:00",
};
// const item = {
//   name: "Gomitas",
//   description: "hello",
//   price: "15",
//   schedule: initSchedule,
//   places: ["Edificio X", "Edificio Y", "Matute"],
// };

const DeliveryScreen = ({ coso }) => {
  const [amount, setAmount] = useState("");
  const [hour, setHour] = useState("");
  const [place, setPlace] = useState("");
  const [comment, setComment] = useState("");

  //Auth
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleDelivery = () => {
    console.log(coso);
    console.log(hour < coso.initial_hour);
    console.log(hour > coso.final_hour);
    var horaAux = hour.split(":");
    var horaAux1 = coso.initial_hour.split(":");
    var horaAux2 = coso.final_hour.split(":");

    if (
      amount == "" ||
      amount == "-1" ||
      hour == "-1" ||
      hour == "-1" ||
      place == "" ||
      place == "-1"
    ) {
      console.log("Se requieren llenar espacios");
    } else if (horaAux[0] < horaAux1[0] && horaAux[0] > horaAux2[0]) {
      console.log("Selecciona el horario entre el rango dado");
    } else {
      console.log("okay");
      const deliveryAux = {
        amount: amount,
        hour: hour,
        place: place,
        comment: comment,
      };
      onSend(deliveryAux);
      alert("Entrega enviada");
    }
  };

  const onSend = async (deli) => {
    await addDoc(collection(database, "delivery"), deli);
  };

  return (
    <SafeAreaView>
      <View
        style={{ flex: 1, padding: 10, margin: 10, backgroundColor: "white" }}
      >
        <View style={styles.container}>
          <Text style={{ fontWeight: "600", paddingRight: 10 }}>Cantidad:</Text>
          <RNPickerSelect
            placeholder={{ label: "Selecciona", value: "-1", key: -1 }}
            onValueChange={(value) => setAmount(value)}
            items={numbers.map((valor, index) => ({
              key: index + 1,
              label: valor,
              value: valor,
            }))}
          />
        </View>
        <Text style={{ fontWeight: "600" }} numberOfLines={1}>
          Horario de {coso.initial_hour} hasta {coso.final_hour}:
        </Text>
        <TextInput style={styles.input} onChangeText={setHour} />

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "600", paddingRight: 10 }}>Lugar:</Text>
          <Text>{coso.location}</Text>
        </View>

        <Text style={{ fontWeight: "600" }}>Comentario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setComment}
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleDelivery}>
        <Text style={{ fontWeight: "600" }}>Comprar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
    fontSize: 17,
  },
  input: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "baseline",
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#00cfeb",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});

export default DeliveryScreen;
