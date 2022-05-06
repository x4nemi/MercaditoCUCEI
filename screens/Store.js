import { View, StyleSheet, SafeAreaView, Text, FlatList, ScrollView} from "react-native";
import React from "react";
import BuscarBar from "../components/SearchBar";
import ProductosCard, {
  productosInventados,
} from "../components/ProductosCard";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
//Imports de Prueba
import HeaderTabs from "../components/HeaderTabs";
import Categories from "../components/Categories";
import { Button } from "react-native-elements";
import ProductoCard from "../components/ProductoCard";

const Store = () =>{
  const [productosData, setProductoData] = React.useState(productosInventados);
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      {/* Header */}
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <BuscarBar />
      </View>
      {/*Botones Añadir y Eliminar*/}
      <View style={{marginBottom:30}}>
      </View>
      {/*Card List*/}
      <View >
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <FlatList
          data={productosData}
          renderItem={({item}) => (
            <ProductoCard item={item}/>
          )}
        />
      </ScrollView>
      </View>
      
      
      {/* NavBar */}
    </SafeAreaView>
  );
}

Store.defaultProps = {
  title:"Dashboard",
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width:"100%",
    
  },
  main: {
    backgroundColor: "white",
  }
});

export default Store;
