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
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito... también de klfjflksdjfl dkfljsdfldsnl y kjklvjdklsfjsdlkljflfkdjflksdjfklsdjkfldsjklfdsjkslf",
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
            <View style={{ flexDirection: "row", padding: 20, flex: 1 }}>
              <Image
                source={producto.image}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                }}
              />
              <View style={{ flexDirection: "column", flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 6,
                      fontSize: 14,
                      textTransform: "uppercase",
                    }}
                  >
                    {producto.titulo}
                  </Text>
                  <View style={boxes.container}>
                    <Text style={boxes.price}>${producto.price}</Text>
                  </View>
                  <View style={boxes.container}>
                    <Text style={boxes.disponibility}>
                      {producto.diponible == true ? "Disponible" : "Agotado"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: 6,
                    flex: 1,
                    flexDirection: "row",
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
    paddingHorizontal: 5,
  },
  price: {
    fontSize: 12,
    color: "white",
    backgroundColor: "black",
    borderRadius: 30,
    paddingHorizontal: 5,
    alignSelf: "baseline",
  },
  disponibility: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#bdbcde",
    borderRadius: 30,
    paddingHorizontal: 5,
  },
  description: {
    fontSize: 9,
    color: "grey",
  },
});
