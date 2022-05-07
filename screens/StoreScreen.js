import { View, StyleSheet, SafeAreaView, Text, FlatList, ScrollView} from "react-native";
import React from "react";
import { StatusBar } from "react-native-web";
import BuscarBar from "../components/SearchBar";
import { productosInventados } from "../components/ProductosCard";
import ProductoCard from "../components/ProductoCard";
import NavBar from "../components/NavBar";

const Store = () =>{
  const [productosData, setProductoData] = React.useState(productosInventados);
  const [selectedId, setSelectedId] = React.useState(null);

  //Render Card(Cambiar onPress a Editar Producto)
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
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <BuscarBar />
      </View>
      {/*Botones Añadir y Eliminar*/}
      <View style={{marginBottom:30}}>
      </View>
      {/*Card List*/}
      <View >
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#eee"}}>
        <FlatList
          data={productosData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </ScrollView>
      </View>
      {/* NavBar */}
      <NavBar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee", 
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: "row",
    width:"100%",
    
  },
});

export default Store;
