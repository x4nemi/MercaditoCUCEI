import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

//Screens
import HomeScreen from "./screens/HomeScreen";
import CuentaScreen from "./screens/CuentaScreen";
import CRUDScreen from "./screens/CRUDScreen";
import StoreScreen from "./screens/StoreScreen";

//Navigation
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Navigation Creation
const Stack = createNativeStackNavigator();
const Drawer = createNativeStackNavigator();
// const Tab = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//NavBar Panels
function Panels ({navigation}){
  return(
    <Tab.Navigator
      initialRouteName={"Home"}
      shifting={true}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color}) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === "CRUD") {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';

          } else if (rn === "Tienda") {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }else {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        
        activeTintColor: '#22d3ee',
        inactiveTintColor: '#6b7280',
        labelStyle: { paddingBottom: 10, fontSize: 0 },
        style: { padding: 10, height: 70}
      }}>

      <Tab.Screen name={"Home"} component={HomeScreen} />
      <Tab.Screen name={"CRUD"} component={CRUDScreen} options={{ headerShown: true }}/>
      <Tab.Screen name={"Tienda"} component={StoreScreen}  />
      <Tab.Screen name={"Login"} component={CuentaScreen} />

    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,})}>
        <Stack.Screen
          name="Login"
          component={CuentaScreen}
          
        />
        <Stack.Screen name="Panels" component={Panels}/>
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
