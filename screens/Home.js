import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import HeaderTabs from "../components/HeaderTabs";
import BuscarBar from "../components/SearchBar";
import Categories from "../components/Categories";
import { ScrollView } from "react-native-web";
import ProductosItems from "../components/ProductosItems";
import ProductosCard from "../components/ProductosCard";

export default function Home() {
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        {/* <HeaderTabs /> */}
        <BuscarBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <ProductosCard />
      </ScrollView>
    </SafeAreaView>
  );
}
