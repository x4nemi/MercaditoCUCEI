import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import HeaderTabs from "../components/HeaderTabs";
import BuscarBar from "../components/SearchBar";
import Categories from "../components/Categories";
import ProductosCard, {
  productosInventados,
} from "../components/ProductosCard";

export default function Home() {
  const [productosData, setProductoData] = React.useState(productosInventados);
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        {/* <HeaderTabs /> */}
        <BuscarBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <ProductosCard productoData={productosData} />
      </ScrollView>
    </SafeAreaView>
  );
}
