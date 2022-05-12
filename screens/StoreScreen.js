import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import BuscarBar from "../components/SearchBar";
import { productosInventados } from "../components/ProductosCard";
import ProductoCard from "../components/ProductoCard";

const Store = ({ navigation }) => {
  const [productosData, setProductoData] = React.useState(productosInventados);
  const [selectedId, setSelectedId] = React.useState(null);

  
  //Render Card(Cambiar onPress a Editar Producto)
  const renderCard = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#d1d5db" : "white";
    console.log(item)
    console.log("\n")
    return (
      <ProductoCard
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <BuscarBar />
      </View>
      {/*Botones Añadir y Eliminar*/}
      <View style={{ marginBottom: 30 }}></View>
      {/*Card List*/}
      <View
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#eee" }}
      >
        <FlatList
          data={productosData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>
      {/* NavBar */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: "row",
    width: "100%",
  },
});

export default Store;
