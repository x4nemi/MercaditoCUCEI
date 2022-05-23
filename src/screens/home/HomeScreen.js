//Si posición es fixed, se requiere react-native-web
//Ver como hacerle para que la navbar se coloque bien
import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import {useState, useEffect} from "react";
import BuscarBar from "../../components/SearchBar";
import Categories from "../../components/Categories";
import { productosInventados } from "../../components/ProductosCard";
import ProductoCard from "../../components/ProductCard";

//Product Service
import { getProducts } from "../../services/product/ProductServices";

export default function Home({ navigation }) {
  const [productosData, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  async function fetchProducts() {
    console.log("Fetching Products")
    setProductos(await getProducts())
  }

  //Render Card(Cambiar on Press a Detalles wdel producto)
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

  useEffect(async () => {
    await fetchProducts();
  },[]);
  //Render Home
  return (
    <View style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        {/* <HeaderTabs /> */}
        <BuscarBar />
      </View>
      {/*Listas no deben estar denro de un scroll view */}
      <View
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#eee" }}
      >
        <Categories />
        <FlatList
          data={productosData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          extraData={getProducts()}
        />
      </View>
    </View>
  );
}
