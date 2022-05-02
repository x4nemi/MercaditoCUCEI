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
import Home from "./screens/Home";
import CuentaScreen from "./screens/CuentaScreen";
import CRUDScreen from "./screens/CRUDScreen";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Drawer = createNativeStackNavigator();

export function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Creación del Producto">
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={CuentaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Creación del Producto" component={CRUDScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
