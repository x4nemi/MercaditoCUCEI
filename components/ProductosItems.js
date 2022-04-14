import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-web";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

export default function ProductosItems() {
  return (
    <View>
      <ProductoImage />
      <ProductoInfo />
    </View>
  );
}

const ProductoImage = () => (
  <>
    <Image
      source={{
        uri: "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
      }}
      style={{
        width: "100%",
        height: 180,
      }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="black" />
    </TouchableOpacity>
  </>
);

const ProductoInfo = () => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <Text>Hola</Text>
    <Text>fkjlsd</Text>
    <Text>3</Text>
  </View>
);
