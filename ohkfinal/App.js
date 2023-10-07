import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./LogInSignUp/SignUp";
import Login from "./LogInSignUp/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Details from "./Screens/Details";
import CatScreen from "./Screens/CatScreen";
import Home from "./Screens/Home";
import Search from "./Screens/Search";
import { SearchBar } from "react-native-screens";
import Save from "./Screens/Save";
import Profile from "./Screens/Profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "./config";
import Reqest from "./Screens/Reqest";

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const LandngScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export const OnlyScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homme" component={BottomTab} />
      <Stack.Screen name="CatScreen" component={CatScreen} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Reqest" component={Reqest} />
    </Stack.Navigator>
  );
};

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: "black" },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 65,
          position: "absolute",
          backgroundColor: "white",
          paddingBottom: 10,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Ionicons name="home" size={28} color="#00113E" />
            ) : (
              <Ionicons name="home-outline" size={28} color="#00113E" />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <FontAwesome name="search" size={30} color="#00113E" />
            ) : (
              <AntDesign name="search1" size={29} color="#00113E" />
            ),
        }}
      />
      <Tab.Screen
        name="Save"
        component={Save}
        options={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <FontAwesome name="plus-square" size={30} color="#00113E" />
            ) : (
              <FontAwesome name="plus-square-o" size={30} color="#00113E" />
            ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <FontAwesome name="user" size={33} color="#00113E" />
            ) : (
              <FontAwesome name="user-o" size={27} color="#00113E" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Atuh = () => {
  const [loading, setloading] = useState(true);
  const [user, SetUser] = useState();

  const auth = getAuth();
  const handlechek = (user) => {
    user ? SetUser(user) : SetUser(null);
    setloading(false);
  };

  useEffect(() => {
    const CheckMode = onAuthStateChanged(auth, (user) => handlechek(user));

    return CheckMode;
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./assets/newld.gif")}
          style={{ height: height * 0.1, width: width * 0.4 }}
        />
      </View>
    );
  }

  return <>{user ? <OnlyScreens /> : <LandngScreens />}</>;
};

// TODO: this is  a main app

export default function App() {
  return (
    <NavigationContainer>
      <Atuh />
    </NavigationContainer>
  );
}
