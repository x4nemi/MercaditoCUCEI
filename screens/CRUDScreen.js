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
} from "react-native";
import React from "react";
import ProductosCard from "../components/ProductosCard";

export default function CRUDScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Nombre del producto:</Text>
          <TextInput style={styles.input} />
          <Text style={styles.text}>Descripción</Text>
          <TextInput style={[{ height: 40 }, styles.input]} />

          <Text style={styles.text}>Precio</Text>
          <TextInput style={styles.input} />

          <Text style={[{ flex: 1 }, styles.text]}>Nombre del producto:</Text>
          <TextInput style={styles.input} />
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
});
