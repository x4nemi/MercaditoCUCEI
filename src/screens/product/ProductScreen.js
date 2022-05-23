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

const ProductScreen = ({ item, visible, onClose }) => {
  const [visibility, setVisibility] = useState(visible);

  console.log(item)
  const closeRequest = () => {
    setVisibility(!visibility);
    onClose()
  };
  
  return (
    <View style={styles.main}>
      <GestureRecognizer
        style={{flex:1}}
        onSwipeRight={closeRequest}
        onSwipeLeft={closeRequest}>
        <Modal
          transparent={true}
          visible={visibility}
          onRequestClose={closeRequest}
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
                    {item.location}
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
                  {item.name}
                </Text>
                <Text style={{ fontSize: 15, color: "black" }}>
                  {item.description}
                </Text>

                <View style={{flexDirection:"row"}}>
                  <Text
                    style={{ fontSize: 40, fontWeight: "bold", color: "#f59e0b" }}
                  >
                    $
                  </Text>
                  <Text
                    style={{ fontSize: 40, fontWeight: "bold", color: "#f59e0b" }}
                  >
                    {item.price}
                  </Text>
                </View>

              </View>
            </View>
            {/**Disponibility */}
            <View style={[styles.footer, {backgroundColor: item.available == true ? "#059669" : "#f87171"}]}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#f1f5f9",
                  paddingHorizontal: 50,
                }}
              >
                {item.available == true ? "Disponible" : "No disponible"}
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
    // backgroundColor: item.available == true ? "#059669" : "#f87171",
    backgroundColor: "#f87171",
    height: 60,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
    width: Platform.OS == "web" ? "100%" : 300,
  },
});
