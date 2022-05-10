import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";

//Screens
import HomeScreen from "./screens/HomeScreen";
import CuentaScreen from "./screens/CuentaScreen";
import CRUDScreen from "./screens/CRUDScreen";
import StoreScreen from "./screens/StoreScreen";

//Navigation
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./components/NavBar";

//Navigation Creation
const Stack = createNativeStackNavigator();
const Drawer = createNativeStackNavigator();
const Tab = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tienda">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tienda"
          component={StoreScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Creación del Producto" component={CRUDScreen} />
        <Stack.Screen
          name="Login"
          component={CuentaScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
