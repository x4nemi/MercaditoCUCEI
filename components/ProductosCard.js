import { View, Text, Image } from "react-native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native-web";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

const productos = [
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    diponible: true,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    diponible: true,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    diponible: true,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    diponible: false,
  },
];

export default function ProductosCard() {
  return (
    <View style={{ padding: 10, alignSelf: "center" }}>
      <ScrollView>
        {productos.map((producto, index) => (
          <View key={index}>
            <View style={{ flexDirection: "row", padding: 20 }}>
              <Image
                source={producto.image}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 30,
                }}
              />
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ padding: 3, fontSize: 10, fontWeight: "700" }}>
                    {producto.titulo}
                  </Text>
                  <View style={{ paddingHorizontal: 3 }}>
                    <Text style={boxes.price}>${producto.price}</Text>
                  </View>
                  <View style={{ paddingHorizontal: 3 }}>
                    <Text style={boxes.disponibility}>
                      {producto.diponible == true ? "Disponible" : "Agotado"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: 200,
                    paddingHorizontal: 6,
                  }}
                >
                  <Text style={boxes.description}>{producto.descripcion}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* <ProductoInfo /> */}
    </View>
  );
}

const boxes = StyleSheet.create({
  container: {
    padding: 20,
  },
  price: {
    fontSize: 8,
    color: "white",
    backgroundColor: "black",
    borderRadius: 30,
    padding: 5,
  },
  disponibility: {
    fontSize: 8,
    color: "white",
    backgroundColor: "#bdbcde",
    borderRadius: 30,
    padding: 5,
  },
  description: {
    fontSize: 9,
    color: "grey",
  },
});
