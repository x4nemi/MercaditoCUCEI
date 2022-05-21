import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

const ProductScreen = ({ item, visible }) => {
  const [visibility, setVisibility] = useState(true);
  const onClose = () => {
    setVisibility(false);
  };
  return (
    <View style={styles.main}>
      <Modal
        onDismiss={onClose}
        transparent={true}
        visible={visibility}
        onRequestClose={onClose}
        animationType="fade"
      >
        <View style={styles.container}>
          <View style={{marginHorizontal:10}}>
            {/**Image Container */}
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require("../../assets/store.png")}
              />
            </View>
            <Text style={{ paddingLeft: 15 }}>Se encuentra en:</Text>
            <Text style={{ paddingLeft: 30, fontStyle: "italic", fontSize: 20 }}>
              Modulo X
            </Text>
            {/*Information Data */}
            <View style={styles.info}>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#44403c" }}
              >
                Nombre Producto
              </Text>
              <Text style={{ fontSize: 15, color: "black" }}>
                Esta es una descripción de ejemplo lorem iasdfasdfsdfasdfafa a sf
                asdf asd ads asdf asd fasdf asdflasd
                iasdoladsfasdkhfashlasdh lushadfhaslfashflasdhlasdfhasdjkfkasdnkjfasdjfbas
                fas
              </Text>
              <Text
                style={{ fontSize: 40, fontWeight: "bold", color: "#f59e0b" }}
              >
                $19.90
              </Text>
            </View>
            
          </View>
          {/**Disponibility */}
          <View style={styles.footer}>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: "#f1f5f9", paddingHorizontal:50 }}
            >
              Disponibles
            </Text>
          </View>
          
        </View>
        
      </Modal>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    flex: 1,
    marginTop: 22,
  },
  container: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "white",
    marginVertical: 30,
    margin: 20,
    justifyContent:"space-between",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imgContainer: {
    margin: 15,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 5,
    backgroundColor: "green",
    width: 300,
    height: 250,
  },
  img: {
    height: "100%",
    width: "100%",
  },
  info: {
    alignItems: "center",
    marginTop:10,
  },
  footer: {
    backgroundColor: "#f87171",
    width: "100%",
    height: 60,
    alignSelf:"center",
    alignItems: "center",
    borderRadius:20,
  },
});
