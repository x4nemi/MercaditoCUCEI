//Ver hora y disponibilidad acorde al dia
//Dia ver si esta mejor el dia
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";

import { updateFavorite } from "../services/favorites/FavoriteServices";

const ProductCard = ({ item, onPress, backgroundColor, isFav, onStore }) => {
  const[fav,setFav] = useState(isFav)
  
  

  const checkDay = () => {
    let days = item.days
    let today =  new Date().getDay()
    if(days.lastIndexOf("Lunes") != -1 && today == 1)
      return true
    if(days.lastIndexOf("Martes") != -1 && today == 2)
      return true
    if(days.lastIndexOf("Miercoles") != -1 && today == 3)
      return true
    if(days.lastIndexOf("Jueves") != -1 && today == 4)
      return true
    if(days.lastIndexOf("Viernes") != -1 && today == 5)
      return true
    if(days.lastIndexOf("Sabado") != -1 && today == 6)
      return true
    return false
  }

  const isDay = checkDay()
  return (
    <View style={boxes.main}>
      {/*Card*/}
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <View style={[boxes.container, backgroundColor]}>
          {/*Card Info*/}
          <View style={{ flexDirection: "row", flex: 1 }}>
            {/*Imagen*/}
            <Image source={item.image} style={boxes.image} />
            {/*Info del Producto */}
            <View style={{ flexDirection: "column", flex: 1 }}>
              {/*Iconos e Info */}
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text
                  style={{
                    paddingHorizontal: 6,
                    fontSize: 14,
                    textTransform: "uppercase",
                  }}
                >
                  {item.name}
                </Text>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={boxes.price}>${item.price}</Text>
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={boxes.disponibility}>
                    {(item.available == true && isDay) ? "Disponible" : "No Disponible"}
                  </Text>
                </View>
                {!onStore && <View style={{ paddingHorizontal: 5 }}>
                  <TouchableOpacity onPress={() => {
                      console.log("Icon Pressed")
                      updateFavorite(item.id,fav)
                      setFav(!fav)
                    }
                  }>
                    {/*Agregar onPress para añadir productos a favoritos*/}
                    <MaterialCommunityIcons
                      name={fav? "heart" :"heart-outline"}
                      size={15}
                      color={fav? "red" :"black"}
                    />
                  </TouchableOpacity>
                </View>}
              </View>
              {/*Descripción del Producto */}
              <View style={boxes.description}>
                <Text style={{ fontSize: 9, color: "gray" }}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const boxes = StyleSheet.create({
  main: {
    padding: 5,
    alignSelf: "center",
    borderBottomWidth: 2,
    borderColor: "#f8f8f8",
    width: Platform.OS == "web" ? "70%" : "90%",
  },
  container: {
    backgroundColor: "white",
    padding: 10,
    borderColor: "white",
    borderTopColor: "#eee",
    borderWidth: 1,
    borderRadius: 10,
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

export default ProductCard;
