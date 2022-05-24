import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase-config";
import { getAuth } from "firebase/auth";


const app = initializeApp(firebaseConfig);
const database = getFirestore();
const auth = getAuth();

let hourList = [
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
];
let minuteList = ["00", "10", "20", "30", "40", "50"];


const initProduct = {
  name: "",
  description: "",
  price: "",
  location: "",
};

export default function CRUDScreen({navigation}) {
  
  //Inputs
  const [product, setProduct] = useState(initProduct);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [places, setPlaces] = useState("");


  const selectionedDays = [];
  //Hours
  const [hourInitial, setHourInitial] = useState("");
  const [initialMinute, setInitialMinute] = useState("");
  const [hourFinal, setHourFinal] = useState("");
  const [finalMinute, setFinalMinute] = useState("");
  //CheckBox
  const [isSelectedL, setSelectionL] = useState(false);
  const [isSelectedMa, setSelectionMa] = useState(false);
  const [isSelectedMi, setSelectionMi] = useState(false);
  const [isSelectedJ, setSelectionJ] = useState(false);
  const [isSelectedV, setSelectionV] = useState(false);
  const [isSelectedS, setSelectionS] = useState(false);

  const[isAvailable, setAvailable] = useState(false)

  const [flag, setFlag] = useState(true);

  const handleValidationProduct = () => {
    if (
      hourInitial == "" ||
      hourFinal == "" ||
      initialMinute == "" ||
      finalMinute == "" ||
      hourInitial == "-1" ||
      hourFinal == "-1" ||
      initialMinute == "-1" ||
      finalMinute == "-1" ||
      productName == "" ||
      description == "" ||
      price == "" ||
      places == ""
    ) {
      alert("No puedes dejar vacío");
      console.log("No puedes dejar vacío");
      setFlag(false);
    } else if (hourFinal == hourInitial && initialMinute >= finalMinute) {
      alert("Los minutos están mal /-:");
      setFlag(false);
      console.log("Los minutos están mal /-:");
    } else if (hourInitial > hourFinal) {
      alert("Las horas están mal /-:");
      setFlag(false);
      console.log("Las horas están mal");
    } else if (
      !(
        isSelectedL ||
        isSelectedMa ||
        isSelectedMi ||
        isSelectedJ ||
        isSelectedV ||
        isSelectedS
      )
    ) {
      alert("No has seleccionado días");
      console.log("No has seleccionado días");
      setFlag(false);
    } else {
      console.log("okay");

      if (isSelectedL) {
        selectionedDays.push("Lunes");
      }
      if (isSelectedMa) {
        selectionedDays.push("Martes");
      }
      if (isSelectedMi) {
        selectionedDays.push("Miercoles");
      }
      if (isSelectedJ) {
        selectionedDays.push("Jueves");
      }
      if (isSelectedV) {
        selectionedDays.push("Viernes");
      }
      if (isSelectedS) {
        selectionedDays.push("Sábado");
      }

      const p = places

      const productAux = {
        name: productName,
        description: description,
        price: price,
        location: p,
        available: isAvailable,
        days: selectionedDays,
        initial_hour: hourInitial + ":" + initialMinute,
        final_hour: hourFinal + ":" + finalMinute,
        user_id: auth.currentUser.uid,
      };
      
      console.log(productAux);
      if(flag){
        onSend(productAux);
        alert("Se ha enviado el producto!");
        navigation.navigate("Home");
      }else {
        setFlag(true);
      }
    }
  };

  const onSend = async (product) => {
    await addDoc(collection(database, "productos"), product);
  };
  

  return (
    <ScrollView style={{backgroundColor:"white"}}>
        <View style={styles.container}>
          {/*Nombre, descripción y precio del producto*/}
          <Text style={styles.text}>Nombre del producto:</Text>
          <TextInput style={styles.input} onChangeText={setProductName} />
          <Text style={styles.text}>Descripción</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
          />

          <Text style={styles.text}>Precio</Text>
          <TextInput
            style={styles.input}
            keyboardType={"numeric"}
            numeric
            value={price}
            onChangeText={setPrice}
          />
          <View style={{flex:2, flexDirection:"row", alignSelf:"center"}}>
            <Checkbox
              status={isAvailable ? "checked" : "unchecked"}
              onPress={() => {
                setAvailable(!isAvailable);
              }}
              color="#00cfeb"
                />
            <Text style={{ alignSelf: "center" }}>Disponible</Text>
          </View>
          {/* <Text>
            {productName} {price} {description}
          </Text> */}
          {/*Cargar imagen en proceso */}
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "black", fontWeight: "600" }}>
              Cargar Imagen
            </Text>
          </TouchableOpacity>
          {/*Contenedor para horario*/}
          <View
            style={{
              borderColor: "#00cfeb60",
              borderWidth: 2,
              borderRadius: 7,
              padding: 3,
              flexDirection: "column",
            }}
          >
            <Text style={styles.text}>Horario de entrega</Text>
            {/*Horas*/}
            <View style={{ flexDirection: "column", paddingTop: 5 }}>
              <Text style={styles.text}>De</Text>
              <View style={styles.hourContainer}>
                <RNPickerSelect
                  placeholder={{ label: "Horas", value: "-1" }}
                  onValueChange={(value) => setHourInitial(value)}
                  items={hourList.map((hora, index) => ({
                    key: index,
                    label: hora,
                    value: hora,
                  }))}
                />
                <Text style={styles.text}>:</Text>
                <RNPickerSelect
                  placeholder={{ label: "Minutos", value: "-1" }}
                  onValueChange={(value) => setInitialMinute(value)}
                  items={minuteList.map((minutos, index) => ({
                    key: index,
                    label: minutos,
                    value: minutos,
                  }))}
                />
              </View>
              <Text style={styles.text}>Hasta</Text>
              <View style={styles.hourContainer}>
                <RNPickerSelect
                  placeholder={{ label: "Horas", value: "-1" }}
                  onValueChange={(value) => setHourFinal(value)}
                  items={hourList.map((hora, index) => ({
                    key: index,
                    label: hora,
                    value: hora,
                  }))}
                />
                <Text style={styles.text}>:</Text>
                <RNPickerSelect
                  placeholder={{ label: "Minutos", value: "-1" }}
                  onValueChange={(value) => setFinalMinute(value)}
                  items={minuteList.map((minutos, index) => ({
                    key: index,
                    label: minutos,
                    value: minutos,
                  }))}
                />
              </View>
            </View>
            {/* <Text>
              {hourInitial}:{initialMinute}
            </Text>
            <Text>
              {hourFinal}:{finalMinute}
            </Text> */}
            {/* <TextInput
                  onChangeText={(hourIni) => setHourIni(hourIni)}
                  style={styles.input}
                /> */}
            <View style={{ flex: 1, flexDirection: "column", paddingLeft: 5 }}>
              {/* <TextInput
                  onChangeText={(hourFin) => setHourFin(hourFin)}
                  style={styles.input}
                /> */}
            </View>
            <Text style={styles.text}>Días:</Text>
            {/*Checkboxes para días */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isSelectedL ? "checked" : "unchecked"}
                onPress={() => {
                  setSelectionL(!isSelectedL);
                }}
                color="#00cfeb"
              />
              <Text style={{ alignSelf: "center" }}>Lunes</Text>
              <Checkbox
                status={isSelectedMa ? "checked" : "unchecked"}
                onPress={() => {
                  setSelectionMa(!isSelectedMa);
                }}
                color="#00cfeb"
              />
              <Text style={{ alignSelf: "center" }}>Martes</Text>
              <Checkbox
                status={isSelectedMi ? "checked" : "unchecked"}
                onPress={() => {
                  setSelectionMi(!isSelectedMi);
                }}
                color="#00cfeb"
              />
              <Text style={{ alignSelf: "center" }}>Miércoles</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isSelectedJ ? "checked" : "unchecked"}
                onPress={() => {
                  setSelectionJ(!isSelectedJ);
                }}
                color="#00cfeb"
              />
              <Text style={{ alignSelf: "center" }}>Jueves</Text>
              <Checkbox
                status={isSelectedV ? "checked" : "unchecked"}
                onPress={() => {
                  setSelectionV(!isSelectedV);
                }}
                color="#00cfeb"
              />
              <Text style={{ alignSelf: "center" }}>Viernes</Text>
              <Checkbox
                status={isSelectedS ? "checked" : "unchecked"}
                onPress={() => {
                  setSelectionS(!isSelectedS);
                }}
                color="#00cfeb"
              />
              <Text style={{ alignSelf: "center" }}>Sábado</Text>
            </View>
            {/*Lugares*/}
            <Text style={styles.text}>Lugar/es:</Text>
            <TextInput
              onChangeText={(places) => setPlaces(places)}
              style={styles.input}
              placeholder="Separa lugares por comas"
            />
            {/*Botón para agregar horario*/}
            <Text>{product.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleValidationProduct}
          >
            <Text style={{ fontWeight: "600" }}>Publicar Producto</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              width: 250,
              height: 40,
              borderRadius: 10,
              backgroundColor: flag ? "#00cfeb" : "#00cfeb20",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
              borderColor: "#fff",
              borderWidth: 1,
            }}
            onPress={onSend}
            disabled={!flag}
          >
            <Text style={{ fontWeight: "600", color: flag ? "black" : "#999" }}>
              Publicar Producto
            </Text>
          </TouchableOpacity> */}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
  },
  text: {
    fontWeight: "600",
  },
  input: {
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
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
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 5,
  },
  hourContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    borderRadius: 10,
    alignContent: "center",
    paddingVertical: 5,
    marginHorizontal: 2,
  },
});
