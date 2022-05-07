import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { ScrollView } from "react-native-web";

const items = [
  {
    image: require("../assets/healthy_food.png"),
    text: "Comida",
  },
  {
    image: require("../assets/magic_box.png"),
    text: "Miscelanea",
  },
  {
    image: require("../assets/tutor.png"),
    text: "Asesorías",
  },
];

export default function Categories() {
  return (
    <View
      style={{
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignSelf: "center",
        flexDirection: "row",
      }}
    >
      {/* <ScrollView horizontal showHorizontalScrollView={false}> */}
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            alignItems: "center",
            backgroundColor: "white",
            width: 90,
            height: 70,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 20,
          }}
        >
          <Image
            source={item.image}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={{ fontSize: 13, fontWeight: "600" }}>{item.text}</Text>
        </View>
      ))}
      {/* </ScrollView> */}
    </View>
  );
}
