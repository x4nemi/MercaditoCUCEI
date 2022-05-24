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
const FavScreen = ({ navigation }) => {
    const [productosData, setProductos] = useState([]);
    const [favorites, setFavorites] = useState([]);
  
    const [selectedId, setSelectedId] = useState(null);
    const [product, setProduct] = useState(initProduct);
  
    const [openModal, setOpenModal] = useState(false);
  
    async function fetchProducts() {
      console.log("Fetching Products");
      setProductos(await getProducts());
      setFavorites(await getFavorites());
      setTimeout(await filterProducts,4000);
    }
  
    //Render Card(Cambiar on Press a Detalles wdel producto)
    const renderCard = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#d1d5db" : "white";
      return (
        <ProductCard
          item={{ ...item, id: item.id }}
          onPress={async () => {
            setProduct(item);
            onCardPress();
            console.log(favorites)
          }}
          backgroundColor={{ backgroundColor }}
          isFav={true}
        />
      );
    };
  
    //Card Press
    const onCardPress = () => {
      setOpenModal(true);
    };
  
    //Modal Close
    const onModalClose = () => {
      setOpenModal(false);
    };
  
    //Filter Favorites
    const filterProducts = ()=>{
      // setProductos([productosData.filter((i) => {
      //   console.log(i)
      //   if(favorites.lastIndexOf(i.id) != -1 )
      //     return true
      //   return false
      // })])
    }
    useEffect(async () => {
      await fetchProducts(); 
    }, []);
    //Render Home
    return (
      <ScrollView style={{ backgroundColor: "#eee", flex: 1 }}>
        <View style={{ backgroundColor: "white", padding: 15 }}>
          {/* <HeaderTabs /> */}
          <BuscarBar />
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