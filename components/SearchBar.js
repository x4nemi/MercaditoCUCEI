import { View, Text } from "react-native";
import React from "react";
import { SearchBar } from "react-native-elements";

export default function BuscarBar() {
  return (
    <View style={{ marginTop: 15, backgroundColor: "white" }}>
      <SearchBar
        placeholder="Buscar"
        containerStyle={{
          backgroundColor: "white",
          borderColor: "white",
        }}
        inputContainerStyle={{
          backgroundColor: "#eee",
          borderRadius: 21,
        }}
      />
    </View>
  );
}
