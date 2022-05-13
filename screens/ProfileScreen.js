import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, ScrollView } from "react-native";

function ProfileScreen() {
  //States
  const [email, setEmail] = React.useState("ejemplo@alumnos.udg.mx");
  const [name, setName] = React.useState("Invitado");
  const [password, setPassword] = React.useState("");

  const[showCancel,setShowCancel] = React.useState(false)

  return( 
    <ScrollView style={{backgroundColor:"white"}}>
      {/*Header*/}
      <View style={styles.header}>
        <View style = {{flexDirection:"row-reverse"}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        {/*Profile Pic */}
        <View style= {styles.container}>
          <Image source= {{uri: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"}}
          style={styles.profilePicture}/>
          <Text style= {{fontWeight: "600", fontSize: 30}}>{name}</Text>
        </View>
      </View>
      {/**Form*/}
      <View style={{paddingHorizontal:10, paddingTop:5, backgroundColor:"#dcdcdc", paddingBottom:100}}>
        {/**Nombre */}
        <View>
          <Text style={styles.formText}>
            Nombre
          </Text>
          <TextInput
            onChangeText={(text) => {
              setName(text);
              if(text != "") 
                setShowCancel(true)}}
            style={styles.input}
            placeholder={"Nombre del Usuario"}
            autoComplete={"name"}
          />
        </View>
        {/**Email */}
        <View>
          <Text style={styles.formText}>
            E-mail
          </Text>
          <TextInput
            onChangeText={(text) => {setEmail(text); setShowCancel(true)}}
            style={styles.input}
            placeholder={email}
            autoComplete={"email"}
          />
        </View>
        {/**Password */}
        <View>
          <Text style={styles.formText}>
            Contraseña
          </Text>
          <TextInput
            onChangeText={(text) => {setPassword(text); setShowCancel(true)}}
            style={styles.input}
            placeholder="contraseña"
            secureTextEntry={true}
          />
        </View>
        {/**Button Submit */}
        <View style = {{flexDirection:"row-reverse", justifyContent:"space-between"}}>
          {showCancel && 
            <TouchableOpacity style={styles.button}
              onPress={() =>{console.log("pressed")}}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>);
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor:"white",
    marginTop: StatusBar.currentHeight + 15 || 15,
  },
  button: {
    backgroundColor:"#22D3EE" ,
    borderRadius:10 ,
    padding:5,
    paddingVertical:8,
    alignItems:"center",
  },
  buttonText: {
    fontSize: 17, 
    fontWeight:"600", 
    color: "black"
  },
  formText:{
    fontSize: 17, 
    fontWeight: "bold", 
    color: "black",
  },
  container: {
    flex:1, 
    alignItems:"center", 
    marginTop:10,
    marginBottom:10,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1,
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
  },
});
