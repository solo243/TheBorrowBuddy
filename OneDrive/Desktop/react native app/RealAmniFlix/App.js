import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// for all navigation import librarys
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// impotined all screen  from code
import Homescreen from "./Screens/Homescreen";
import Detailscreen from "./Screens/Detailscreen";
import Searchscreen from "./Screens/Searchscreen";
import Linkpage from "./Screens/Linkpage";
// import SeeAll from "./Screens/Seeall";
import StreamingPage from "./Screens/StreamingPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={Homescreen} />
        <Stack.Screen name="Details" component={Detailscreen} />
        <Stack.Screen name="Search" component={Searchscreen} />
        <Stack.Screen name="Link" component={Linkpage} />
        {/* <Stack.Screen name ="Seeall" component={SeeAll}/> */}
       <Stack.Screen name="Stream" component={StreamingPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
