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
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import React, { useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
//Me quedé en que no puedo guardar en una string

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
export default function CRUDScreen() {
  //Input para nombre
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [places, setPlaces] = useState("");
  const [initialHour, setInitialHour] = useState("");
  const [finalHour, setFinalHour] = useState("");
  const [hours, setHours] = useState([]);

  /**
   * hours =
   */

  const [schedule, setSchedule] = useState([]);
  const [days, setDays] = useState([]);
  const selectionedDays = [];
  const [hourInitial, setHourInitial] = useState("");
  const [initialMinute, setInitialMinute] = useState("");
  const [hourFinal, setHourFinal] = useState("");
  const [finalMinute, setFinalMinute] = useState("");

  const pickerInitialHour = useRef();
  const pickerInitialMinute = useRef();
  const pickerFinalHour = useRef();
  const pickerFinalMinute = useRef();

  const handleValidationSchedule = () => {
    console.log("Entro");

    if (
      hourInitial == "" ||
      hourFinal == "" ||
      initialMinute == "" ||
      finalMinute == "" ||
      places == "" ||
      hourInitial == "-1" ||
      hourFinal == "-1"
    ) {
      alert("No puedes dejar vacío");
      console.log("No puedes dejar vacío");
    } else if (hourFinal == hourInitial && initialMinute >= finalMinute) {
      alert("Los minutos están mal /-:");
      console.log("Los minutos están mal /-:");
    } else if (hourInitial > hourFinal) {
      alert("Las horas están mal /-:");
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
      Alert.alert("No has seleccionado días");
      console.log("No has seleccionado días");
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

      const scheduleAux = {
        dayss: selectionedDays,
        initial_hour: hourInitial + ":" + initialMinute,
        final_hour: hourFinal + ":" + finalMinute,
      };
      console.log(scheduleAux);
      addSchedule(scheduleAux);
      console.log(schedule);

      alert("Se ha agregado correctamente el horario (-:");
    }
  };

  const addSchedule = (s) => {
    setSchedule((s) => [...s]);
    console.log(s);
  };

  //Vista del horario
  // const lista = () => {
  //   return schedule.map((horario, index) => {
  //     console.log(horario)
  //     return (
  //       <View key={horario.key}>
  //         <Text style={{ borderWidth: 2, borderColor: "green" }}>
  //           Dias: {horario.days}
  //         </Text>
  //       </View>
  //     );
  //   });
  // };

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
          {/*Nombre, descripción y precio del producto*/}
          <Text style={styles.text}>Nombre del producto:</Text>
          <TextInput style={styles.input} onChangeText={setProductName} />
          <Text style={styles.text}>Descripción</Text>
          <TextInput
            style={styles.input}
            multiline="true"
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
          <Text>
            {productName} {price} {description}
          </Text>
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
                <Picker
                  style={styles.picker}
                  ref={pickerInitialHour}
                  selectedValue={hourInitial}
                  onValueChange={(itemValue, itemIndex) =>
                    setHourInitial(itemValue)
                  }
                >
                  <Picker.Item label="Hora" value="-1" key="-1" />
                  {hourList.map((hour_initial, index) => (
                    <Picker.Item
                      label={hour_initial}
                      key={index}
                      value={hour_initial}
                    />
                  ))}
                </Picker>
                <Text>:</Text>
                <Picker
                  style={styles.picker}
                  ref={pickerInitialMinute}
                  selectedValue={initialMinute}
                  onValueChange={(itemValue, itemIndex) =>
                    setInitialMinute(itemValue)
                  }
                >
                  <Picker.Item label="Minutos" value="-1" key="-1" />
                  {minuteList.map((minute_initial, index) => (
                    <Picker.Item
                      label={minute_initial}
                      key={index}
                      value={minute_initial}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={styles.text}>Hasta</Text>
              <View style={styles.hourContainer}>
                <Picker
                  style={styles.picker}
                  ref={pickerFinalHour}
                  selectedValue={hourFinal}
                  onValueChange={(itemValue, itemIndex) =>
                    setHourFinal(itemValue)
                  }
                >
                  <Picker.Item label="Hora" value="-1" key="-1" />
                  {hourList.map((hour_final, index) => (
                    <Picker.Item
                      label={hour_final}
                      key={index}
                      value={hour_final}
                    />
                  ))}
                </Picker>
                <Text style={styles.text}>:</Text>
                <Picker
                  style={styles.picker}
                  ref={pickerFinalMinute}
                  selectedValue={finalMinute}
                  onValueChange={(itemValue, itemIndex) =>
                    setFinalMinute(itemValue)
                  }
                >
                  <Picker.Item label="Minutos" value="-1" key="-1" />
                  {minuteList.map((minute_final, index) => (
                    <Picker.Item
                      label={minute_final}
                      key={index}
                      value={minute_final}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <Text>
              {hourInitial}:{initialMinute}
            </Text>
            <Text>
              {hourFinal}:{finalMinute}
            </Text>
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
              multiline="true"
              placeholder="Separa lugares por comas"
            />
            {/*Botón para agregar horario*/}
            <TouchableOpacity
              style={styles.button}
              onPress={handleValidationSchedule}
            >
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
