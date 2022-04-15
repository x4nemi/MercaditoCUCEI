import { View, Text, Image } from "react-native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native-web";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

export const productosInventados = [
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito... también de klfjflksdjfl dkfljsdfldsnl y kjklvjdklsfjsdlkljflfkdjflksdjfklsdjkfldsjklfdsjkslf",
    disponible: true,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: true,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: true,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: false,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: false,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: false,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: false,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: false,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: false,
  },
  {
    image:
      "https://www.hola.com/imagenes/mascotas/20220228205371/medusas-como-mascotas-en-casa-dn/1-56-52/medusas-como-mascotas-en-casa-t.jpg",
    titulo: "Gomitas",
    price: "25.00",
    descripcion:
      "Vendo gomitas de distintos sabores, como fresa, mango, chilito...",
    disponible: false,
  },
];

export default function ProductosCard(props) {
  return (
    <View style={{ paddingTop: 10, alignSelf: "center" }}>
      {props.productoData.map((producto, index) => (
        <TouchableOpacity
          activeOpacity={1}
          // style={{ marginBottom: 10 }}
        >
          <View
            key={index}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderColor: "white",
              borderTopColor: "#eee",
              borderWidth: 1,
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <ProductoImage image={producto.image} />
              <ProductoInfo
                titulo={producto.titulo}
                price={producto.price}
                disponible={producto.disponible}
                descripcion={producto.descripcion}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* <ProductoInfo /> */}
    </View>
  );
}

const ProductoImage = (props) => (
  <Image
    source={props.image}
    style={{
      width: 60,
      height: 60,
      borderRadius: 10,
    }}
  />
);

const ProductoInfo = (props) => (
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
        {props.titulo}
      </Text>
      <View style={boxes.container}>
        <Text style={boxes.price}>${props.price}</Text>
      </View>
      <View style={boxes.container}>
        <Text style={boxes.disponibility}>
          {props.disponible == true ? "Disponible" : "Agotado"}
        </Text>
      </View>
      <View style={boxes.container}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="heart-outline"
            size={15}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
    <View
      style={{
        paddingHorizontal: 6,
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Text style={boxes.description}>{props.descripcion}</Text>
    </View>
  </View>
);

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
