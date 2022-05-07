import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import React from "react";
import BuscarBar from "../components/SearchBar";
import Categories from "../components/Categories";
import { productosInventados} from "../components/ProductosCard";
import ProductoCard from "../components/ProductoCard";
import NavBar from "../components/NavBar";

export default function Home() {
  const [productosData, setProductoData] = React.useState(productosInventados);
  const [selectedId, setSelectedId] = React.useState(null);

  //Render Card(Cambiar on Press a Detalles del producto)
  const renderCard = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#d1d5db" : "white";

    return (
      <ProductoCard
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  //Render Home
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        {/* <HeaderTabs /> */}
        <BuscarBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#eee"}}>
        <Categories />
        <FlatList
          data={productosData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </ScrollView>
      <NavBar/>
    </SafeAreaView>
  );
}
