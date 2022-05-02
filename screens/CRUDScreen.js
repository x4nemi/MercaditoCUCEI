import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  SafeAreaView,
  CheckBox,
  Picker,
} from "react-native";
import React, { useState } from "react";
import ProductosCard from "../components/ProductosCard";

export default function CRUDScreen() {
  //Input para nombre
  const [productName, setName] = useState("");

  //Input para descripción
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const handleInputChange = (precio) => {
    if (/^\d+$/.test(precio)) {
      setPrice({
        price: precio,
      });
    }
  };

  //Input para
  //Checkboxes
  const [isSelectedL, setSelectionL] = useState(false);
  const [isSelectedMa, setSelectionMa] = useState(false);
  const [isSelectedMi, setSelectionMi] = useState(false);
  const [isSelectedJ, setSelectionJ] = useState(false);
  const [isSelectedV, setSelectionV] = useState(false);
  const [isSelectedS, setSelectionS] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Nombre del producto:</Text>
          <TextInput style={styles.input} />
          <Text style={styles.text}>Descripción</Text>
          <TextInput style={styles.input} multiline="true" />

          <Text style={styles.text}>Precio</Text>
          <TextInput
            style={styles.input}
            keyboardType={"numeric"}
            numeric
            onChangeText={(precio) => handleInputChange(precio)}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "white", fontWeight: "600" }}>
              Cargar Imagen
            </Text>
          </TouchableOpacity>
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
            <View style={{ flex: 1, flexDirection: "row", paddingTop: 5 }}>
              <View
                style={{ flex: 1, flexDirection: "column", paddingRight: 5 }}
              >
                <Text style={styles.text}>De</Text>
                <TextInput style={styles.input} />
              </View>
              <View
                style={{ flex: 1, flexDirection: "column", paddingLeft: 5 }}
              >
                <Text style={styles.text}>Hasta</Text>
                <TextInput style={styles.input} />
              </View>
            </View>
            <Text style={styles.text}>Días:</Text>

            {/*Checkboxes para horario */}
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelectedL}
                onValueChange={setSelectionL}
                style={[styles.checkbox, { alignSelf: "center" }]}
              />
              <Text style={{ alignSelf: "center" }}>Lunes</Text>

              <CheckBox
                value={isSelectedMa}
                onValueChange={setSelectionMa}
                style={[styles.checkbox, { alignSelf: "center" }]}
              />
              <Text style={{ alignSelf: "center" }}>Martes</Text>

              <CheckBox
                value={isSelectedMi}
                onValueChange={setSelectionMi}
                style={[styles.checkbox, { alignSelf: "center" }]}
              />
              <Text style={{ alignSelf: "center" }}>Miércoles</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelectedJ}
                onValueChange={setSelectionJ}
                style={[styles.checkbox, { alignSelf: "center" }]}
              />
              <Text style={{ alignSelf: "center" }}>Jueves</Text>

              <CheckBox
                value={isSelectedV}
                onValueChange={setSelectionV}
                style={[styles.checkbox, { alignSelf: "center" }]}
              />
              <Text style={{ alignSelf: "center" }}>Viernes</Text>

              <CheckBox
                value={isSelectedS}
                onValueChange={setSelectionS}
                style={[styles.checkbox, { alignSelf: "center" }]}
              />
              <Text style={{ alignSelf: "center" }}>Sábado</Text>
            </View>
            <Text style={styles.text}>Lugar/es:</Text>
            <TextInput style={styles.input} multiline="true" />
            <TouchableOpacity style={styles.button}>
              <Text style={{ fontWeight: "600" }}>Agregar Horario</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
});
