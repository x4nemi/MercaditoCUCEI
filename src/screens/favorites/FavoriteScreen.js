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
  } from "react-native";
  import {useState, useEffect} from "react";
  import BuscarBar from "../../components/SearchBar";
  
  //Productos
  import { productosInventados } from "../../components/ProductosCard";
  import ProductoCard from "../../components/ProductCard";
  
  //Product Service
  import { getProducts } from "../../services/product/ProductServices";
  
  const FavScreen = ({ navigation }) => {
    async function fetchProducts() {
      setProductos(await getProducts())
    }
    
    const [productosData, setProductos] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
  
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
  
    useEffect(async () => {
      await fetchProducts();
    },[]);
  
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={{ backgroundColor: "white", padding: 15 }}>
          <BuscarBar />
        </View>
        {/*Botones Añadir y Eliminar*/}
        <View style={{ marginBottom: 10 }}>
          
          <TouchableHighlight style={styles.button} >
            <View >
              <Text style={{fontSize:18}}>Añadir Producto</Text>
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
  
  export default FavScreen;
  