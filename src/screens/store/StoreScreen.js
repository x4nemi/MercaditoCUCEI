import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  Button,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import { useState, useEffect } from "react";
import BuscarBar from "../../components/SearchBar";

//Productos
import ProductoCard from "../../components/ProductCard";

//Product Service
import { getProducts } from "../../services/product/ProductServices";
import CRUDModal from "../../components/CRUDModal";
import { getAuth} from "firebase/auth";

const initProduct = {
  name: "",
  location: "",
  description: "",
  image: "",
  available: false,
  price: 0,
  days: [],
  final_hour: "",
  initial_hour: "",
};

const Store = ({ navigation }) => {
  const auth = getAuth()
  const userId = auth.currentUser.uid
  async function fetchProducts() {
    setProductos(await getProducts());
    setRefresh(false);
  }

  const [productosData, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState();
  const [openCRUD, setOpenCRUD] = useState(false);
  const[refresh,setRefresh] = useState(false);

  //Render Card(Cambiar onPress a Editar Producto)
  const renderCard = ({ item }) => {
    if(item.user_id == userId){
      return (
        <ProductoCard
          item={{...item,id:item.id}}
          onPress={() => {
            setSelectedProduct(item);
            onCardPress();
          }}
          backgroundColor={{ backgroundColor:"#d1d5db" }}
          onStore={true}
        />
      );
    }
  };

  const onCardPress = () => {
    setOpenCRUD(true);
  };

  const onCRUDClose = () =>{
    setOpenCRUD(false)
  }

  const onRefresh = async () =>{
    setRefresh(true);
    await fetchProducts();
  }

  useEffect(async () => {
    await fetchProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={{ backgroundColor: "white", padding: 15 }}>
      </View>
      {/*Botones Añadir y Eliminar*/}
      <View style={{ marginBottom: 10 }}>
        <TouchableHighlight style={styles.button} onPress={() => navigation.navigate("Creación")}>
          <View>
            <Text style={{ fontSize: 18 }}>Añadir Producto</Text>
          </View>
        </TouchableHighlight>

        {/* <Button
          style={{alignItems:"center",borderRadius: 20,alignSelf: "baseline",}}
          title="Añadir Producto"
          color="##15803d"
          onPress={() => Alert.alert('Button with adjusted color pressed')}
          /> */}
      </View>
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
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
      {openCRUD &&
        <CRUDModal
          item={selectedProduct}
          visible={openCRUD}
          onClose={onCRUDClose}
        />
      }
      
    </ScrollView>
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
  button: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#4ade80",
    padding: 20,
    paddingHorizontal: 75,
    borderRadius: 20,
    alignSelf: "center",
  },
});

export default Store;
