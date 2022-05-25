import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import {useState, useEffect, useCallback} from "react";
  
  //Productos
  import ProductCard from "../../components/ProductCard";
  import BuscarBar from "../../components/SearchBar"
  import ProductScreen from "../product/ProductScreen";
  
  //Product Service
  import { getProducts } from "../../services/product/ProductServices";
  import { getFavorites } from "../../services/favorites/FavoriteServices";
  
  const initProduct = {
    name: "",
    location: "",
    description: "",
    available: false,
    price: 0,
  };
  const initFavorites = [
    ""
  ]
const FavScreen = ({ navigation }) => {
    const [productosData, setProductos] = useState([]);
    const [favorites, setFavorites] = useState(initFavorites);
  
    const [product, setProduct] = useState(initProduct);
  
    const [openModal, setOpenModal] = useState(false);
  
    async function fetchProducts() {
      setProductos(await getProducts());
      setFavorites(await getFavorites());
    }
  
    //Render Card(Cambiar on Press a Detalles wdel producto)
    const renderCard = ({ item }) => {
      if(favorites.lastIndexOf(item.id) != -1){
        return (
          <ProductCard
            item={{ ...item, id: item.id }}
            onPress={async () => {
              setProduct(item);
              onCardPress();
              console.log(favorites)
            }}
            backgroundColor={ {backgroundColor:"#d1d5db" }}
            isFav={true}
            onStore={false}
          />
        );
      }
    };
  
    //Card Press
    const onCardPress = () => {
      setOpenModal(true);
    };
  
    //Modal Close
    const onModalClose = () => {
      setOpenModal(false);
    };

    useEffect(async () => {
      await fetchProducts(); 
    }, []);

    
    //Render Home
    return (
      <ScrollView style={{ backgroundColor: "#eee", flex: 1 }}>
        <View style={{ backgroundColor: "white", padding: 15 }}>
        </View>
        {/*Listas no deben estar denro de un scroll view */}
        <View
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#eee" }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#44403c",
              alignSelf: "center",
            }}
          >
            Favoritos
          </Text>
          <FlatList
            data={productosData}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
          />
        </View>
        {openModal && (
          <ProductScreen
            item={product}
            visible={openModal}
            onClose={onModalClose}
          />
        )}
      </ScrollView>
    );
  }
  export default FavScreen;