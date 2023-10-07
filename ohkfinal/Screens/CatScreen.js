import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Category } from "../API/api";
import ItemCardHori from "./components/ItemCardHori";
import { Ionicons } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const CatScreen = ({ route, navigation }) => {
  const cat = route.params;
  const newcat = cat.cate;
  console.log(newcat);

  const [data, setdata] = useState([]);
  useEffect(() => {
    apicall();
  }, []);
  const apicall = async () => {
    const call = await Category(newcat);
    // console.log(call);
    setdata(call);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            height: height * 0.08,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              style={{ marginStart: width * 0.04 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, marginStart: width * 0.05 }}>
            {newcat}
          </Text>
        </View>

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{ alignSelf: "center" }}
          renderItem={({ item }) => {
            return <ItemCardHori item={item} navigation={navigation} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CatScreen;

export const Card = () => {
  return (
    <View
      style={{
        alignSelf: "center",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: height * 0.3,
          backgroundColor: "red",
          width: width * 0.4,
          alignSelf: "center",
          margin: 10,
        }}
      ></View>
      {/* <View style={{height: height*0.1,back}}> */}

      {/* </View> */}
    </View>
  );
};
