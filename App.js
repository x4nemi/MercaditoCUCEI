import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

//POR HACER
/*  
Screen Perfil Usuarios(Ivan)
CRUD disponible para mobiles (Ximena)
CRUD añade a la lista de productos (Ximena e Ivan)
Avisos de privacidad, politicas de usuario bla bla bla(Herrada)
Screen Detalles Producto(Mockup: Edgar, Implementación: Quien pueda)
CRUD elimina y edita productos de la lista(Ivan)
VER QUE PEDO CON EL CHAT(hacerlo mejor mapa con ubicación? parece mas simple)
VER QUE ONDA CON PEDIDOS
Subir Productos Base de Datos
Eliminar Productos Base de Datos
Editar Productos Base de Datos
Token Inicio de Sesión(IVAN)
Validación
*/
//NOTAS
//Usar Firestore Functions para varias cosas

//Screens

import HomeScreen from "./src/screens/home/HomeScreen";
import LoginScreen from "./src/screens/login/LoginScreen";
import CRUDScreen from "./src/screens/crud/CRUDScreen";
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import StoreScreen from "./src/screens/store/StoreScreen";
import ProductScreen from "./src/screens/product/ProductScreen";
import TermsScreen from "./src/screens/TermsScreen";

//Navigation
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavScreen from "./src/screens/favorites/FavoriteScreen";

//Navigation Creation
const Stack = createNativeStackNavigator();
// const Tab = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//NavBar Panels
function Panels({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      shifting={true}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "CRUD") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (rn === "Tienda") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (rn == "Fav") {
            iconName = focused ? "heart" : "heart-outline";
          } else {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={30} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#2563eb",
        inactiveTintColor: "#6b7280",
        labelStyle: { fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen name={"Home"} component={HomeScreen} />
      <Tab.Screen name={"Fav"} component={FavScreen} />
      <Tab.Screen
        name={"CRUD"}
        component={CRUDScreen}
        options={{ headerShown: true }}
      />
      <Tab.Screen name={"Tienda"} component={StoreScreen} />
      <Tab.Screen name={"Perfil"} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

//Main
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Panels"}
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Panels" component={Panels} />
        <Stack.Screen
          name="Aviso"
          component={TermsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Hola" component={CRUDScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Tienda"
    //       component={StoreScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen name="Creación del Producto" component={CRUDScreen} />
    //     <Stack.Screen
    //       name="Login"
    //       component={CuentaScreen}
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
