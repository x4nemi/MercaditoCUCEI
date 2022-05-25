import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Checkbox } from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

import { firebaseConfig } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { updateP, deleteP } from "../services/product/ProductServices";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

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

export default function CRUDModal({ item, visible, onClose }) {
  const navigation = useNavigation();
  //Inputs
  const [product, setProduct] = useState(item);
  const [productName, setProductName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [location, setLocation] = useState(item.location);
  const [isAvailable, setAvailable] = useState(item.available);

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

  const [visibility, setVisibility] = useState(visible);

  const [flag, setFlag] = useState(true);
  const [image, setImage] = useState("");

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
      location == ""
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

      const p = location;

      const productAux = {
        name: productName,
        description: description,
        price: price,
        location: p,
        available: isAvailable,
        days: selectionedDays,
        initial_hour: hourInitial + ":" + initialMinute,
        final_hour: hourFinal + ":" + finalMinute,
        id: item.id,
        user_id: auth.currentUser.uid,
        user_name: auth.currentUser.displayName,
        image:image
      };
      if (flag) {
        onSubmit(productAux);
        alert("Se han enviado los cambios al producto");
        closeRequest();
        navigation.navigate("Home");
      } else {
        setFlag(true);
      }
    }
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

      const direction = "images/" + auth.currentUser.displayName + parseInt(Math.floor(Math.random() * 50));
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
    }
  };

  const handleDayCheck = (item) => {
    let d = item.days;
    d.forEach((day) => {
      if (day == "Lunes") setSelectionL(true);
      if (day == "Martes") setSelectionMa(true);
      if (day == "Miercoles") setSelectionMi(true);
      if (day == "Jueves") setSelectionJ(true);
      if (day == "Viernes") setSelectionV(true);
      if (day == "Sabado") setSelectionS(true);
    });
    //Initial Hour
    let auxTime = item.initial_hour;
    setInitialMinute(auxTime.slice(-2));
    setHourInitial(auxTime.slice(0, 2));
    auxTime = item.final_hour;
    setFinalMinute(auxTime.slice(-2));
    setHourFinal(auxTime.slice(0, 2));
  };

  const onSubmit = async (product) => {
    await updateP(product);
  };

  const onDelete = async () =>{
    await deleteP(item)
  }

  const closeRequest = () => {
    setVisibility(!visibility);
    onClose();
  };

  useEffect(() => {
    handleDayCheck(item);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeRight={closeRequest}
        onSwipeLeft={closeRequest}
      >
        <Modal
          transparent={true}
          visible={visibility}
          onRequestClose={closeRequest}
          presentationStyle="pageSheet"
          animationType="slide"
        >
          <View style={styles.container}>
            {/*Nombre, descripción y precio del producto*/}
            <Text style={styles.text}>Nombre del producto:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setProductName}
              value={productName}
            />
            <Text style={styles.text}>Descripción</Text>
            <TextInput
              style={[
                styles.input,
                { paddingVertical: 15, textAlignVertical: "top" },
              ]}
              onChangeText={setDescription}
              value={description}
            />

            <Text style={styles.text}>Precio</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={[styles.input, { width: "50%" }]}
                // keyboardType={"numeric"}
                value={price}
                onChangeText={setPrice}
              />
              <View
                style={{ flex: 2, flexDirection: "row", alignSelf: "center" }}
              >
                <Checkbox
                  status={isAvailable ? "checked" : "unchecked"}
                  onPress={() => {
                    setAvailable(!isAvailable);
                  }}
                  color="#4ade80"
                />
                <Text style={{ alignSelf: "center" }}>Disponible</Text>
              </View>
            </View>
            {/* <Text>
                {productName} {price} {description}
              </Text> */}
            {/*Cargar imagen */}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={{ color: "black", fontWeight: "600" }}>
                Cargar Imagen
              </Text>
            </TouchableOpacity>
            {/*Contenedor para horario*/}
            <View
              style={{
                borderColor: "#4ade80",
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
                    value={hourInitial}
                    onValueChange={(value) => setHourInitial(value)}
                    items={hourList.map((hora, index) => ({
                      key: index,
                      label: hora,
                      value: hora,
                    }))}
                  />
                  <Text style={styles.text}>:</Text>
                  <RNPickerSelect
                    value={initialMinute}
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
                    value={hourFinal}
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
                    value={finalMinute}
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
              <View
                style={{ flex: 1, flexDirection: "column", paddingLeft: 5 }}
              >
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
                  color="#4ade80"
                />
                <Text style={{ alignSelf: "center" }}>Lunes</Text>
                <Checkbox
                  status={isSelectedMa ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectionMa(!isSelectedMa);
                  }}
                  color="#4ade80"
                />
                <Text style={{ alignSelf: "center" }}>Martes</Text>
                <Checkbox
                  status={isSelectedMi ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectionMi(!isSelectedMi);
                  }}
                  color="#4ade80"
                />
                <Text style={{ alignSelf: "center" }}>Miércoles</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={isSelectedJ ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectionJ(!isSelectedJ);
                  }}
                  color="#4ade80"
                />
                <Text style={{ alignSelf: "center" }}>Jueves</Text>
                <Checkbox
                  status={isSelectedV ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectionV(!isSelectedV);
                  }}
                  color="#4ade80"
                />
                <Text style={{ alignSelf: "center" }}>Viernes</Text>
                <Checkbox
                  status={isSelectedS ? "checked" : "unchecked"}
                  onPress={() => {
                    setSelectionS(!isSelectedS);
                  }}
                  color="#4ade80"
                />
                <Text style={{ alignSelf: "center" }}>Sábado</Text>
              </View>
              {/*Lugares*/}
              <Text style={styles.text}>Lugar/es:</Text>
              <TextInput
                value={location}
                onChangeText={(places) => setLocation(places)}
                style={styles.input}
                placeholder="Separa lugares por comas"
              />
              {/*Botón para agregar horario*/}
            </View>
            <View style={{flex:2, flexDirection:"row", justifyContent:"space-evenly"}}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleValidationProduct}
              >
                <Text style={{ fontWeight: "600" }}>Editar Producto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={onDelete}
              >
                <Text style={{ fontWeight: "600" }}>Eliminar Producto</Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
                style={{
                  width: 250,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: flag ? "4ade80" : "#86efac",
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
        </Modal>
      </GestureRecognizer>
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
    marginVertical: 3,
    borderWidth: 2,
    borderColor: "grey",
    padding: 5,
    borderRadius: 10,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#4ade80",
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
