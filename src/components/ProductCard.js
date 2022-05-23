import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import React from "react";

const ProductoCard = ({ item, onPress, backgroundColor }) => {

  return (
    <View style={boxes.main}>
      {/*Card*/}
      <TouchableOpacity activeOpacity={1}  onPress={onPress}>
        <View
          style={[boxes.container, backgroundColor]}
        >
          {/*Card Info*/}
          <View style={{ flexDirection: "row", flex: 1 }}>
            {/*Imagen*/}
            <Image source={item.image}
              style={boxes.image}
            />
            {/*Info del Producto */}
            <View style={{ flexDirection: "column", flex: 1 }}>
              {/*Iconos e Info */}
              <View style={{flexDirection: "row",alignItems: "baseline"}}>
                <Text style={{paddingHorizontal: 6, fontSize: 14, textTransform: "uppercase",}}>
                  {item.name}
                </Text>
                <View style={{paddingHorizontal:5}}>
                  <Text style={boxes.price}>${item.price}</Text>
                </View>
                <View style={{paddingHorizontal:5}}>
                  <Text style={boxes.disponibility}>
                    {item.available == true ? "Disponible" : "Agotado"}
                  </Text>
                </View>
                <View style={{paddingHorizontal:5}}>
                  <TouchableOpacity>
                    {/*Agregar onPress para añadir productos a favoritos*/}
                    <MaterialCommunityIcons
                      name="heart-outline"
                      size={15}
                      color="black"
                      
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/*Descripción del Producto */}
              <View style={boxes.description}>
                <Text style={{fontSize: 9, color: "grey",}}>{item.description}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const boxes = StyleSheet.create({
  main:{ 
    padding: 5, 
    alignSelf: "center", 
    borderBottomWidth: 2, 
    borderColor: '#f8f8f8',
    width: Platform.OS == "web" ? "70%" :"90%"
  },
  container:{
    backgroundColor: "white",
    padding: 10,
    borderColor: "white",
    borderTopColor: "#eee",
    borderWidth: 1, 
    borderRadius:10,
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
    paddingHorizontal: 6,
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});

export default ProductoCard;
