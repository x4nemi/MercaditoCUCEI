import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Platform,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

const ProductScreen = ({ item, visible }) => {
  const [visibility, setVisibility] = useState(true);


  const onClose = () => {
    setVisibility(false);
  };


  
  return (
    <View style={styles.main}>
      <GestureRecognizer
        style={{flex:1}}
        onSwipeRight={onClose}
        onSwipeLeft={onClose}>
        <Modal
          transparent={true}
          visible={visibility}
          onRequestClose={onClose}
          presentationStyle="formSheet"
          animationType="slide"
        >
          <View style={styles.container}>
            <View style={{ marginHorizontal: 10 }}>
              {/**Image Container */}
              <View style={styles.imgContainer}>
                <Image
                  style={styles.img}
                  source={require("../../assets/store.png")}
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <View>
                  <Text style={{ paddingLeft: 15 }}>Se encuentra en:</Text>
                  <Text
                    style={{ paddingLeft: 30, fontStyle: "italic", fontSize: 20 }}>
                    Modulo X
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={{fontSize:20}}>11:00</Text>
                  <Text style={{fontSize:17}}> a </Text>
                  <Text style={{fontSize:20}}>17:00</Text>
                </View>
              </View>

              {/*Information Data */}
              <View style={styles.info}>
                <Text
                  style={{ fontSize: 30, fontWeight: "bold", color: "#44403c" }}
                >
                  Nombre Producto
                </Text>
                <Text style={{ fontSize: 15, color: "black" }}>
                  Esta es una descripción de ejemplo lorem iasdfasdfsdfasdfafa a
                  sf asdf asd ads asdf asd fasdf asdflasd iasdoladsfasdkhfashlasdh
                  lushadfhaslfashflasdhlasdfhasdjkfkasdnkjfasdjfbas fas
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
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#f1f5f9",
                  paddingHorizontal: 50,
                }}
              >
                Disponible
              </Text>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
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
    justifyContent: "space-between",
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
    width: 300,
    height: 250,
  },
  img: {
    height: "100%",
    width: "100%",
  },
  info: {
    alignItems: "center",
    marginTop: 10,
  },
  timeContainer:{
    backgroundColor: "#60a5fa", 
    flexDirection:"row",
    borderRadius:20,
    padding:2,
    alignItems:"center",
  },
  footer: {
    backgroundColor: "#059669",
    // backgroundColor: "#f87171",
    height: 60,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
    width: Platform.OS == "web" ? "100%" : 300,
  },
});
