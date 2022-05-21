import React from "react";
//React-Native Componentes
import { View, Text, StyleSheet } from "react-native-web";

//Icon
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

//Navigation
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  return (
    
    <View style={styles.container}>
      <MaterialCommunityIcons name="home-outline" size={30}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <MaterialCommunityIcons name="chatbubble-outline" size={30}
        onPress={() => {
          navigation.push("Creación del Producto");
        }}
      />
      <MaterialCommunityIcons name="briefcase-outline" size={30}
        onPress={() => {
          navigation.navigate("Tienda");
        }}
      />
      <MaterialCommunityIcons name="person-circle-outline" size={30}
        onPress={() => {
          navigation.navigate("Login")}}
      />
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#E9E2DF",
    width: "80%",
    height: "8%",
    alignSelf: "center",
    position: "fixed",
    bottom: 0,
  },
});
