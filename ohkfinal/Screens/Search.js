import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SearchQ } from "../API/api";
import ItemCardHori from "./components/ItemCardHori";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Search = ({ navigation }) => {
  const [item, setitem] = useState("");
  const [data, setdata] = useState([]);
  const [jkjk, setjkjk] = useState();

  useEffect(() => {}, []);

  const handleSearch = async (value) => {
    const { text } = value.nativeEvent;
    const al = await SearchQ(text);
    setdata(al);
    console.log(data);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "lightgrey",
            height: height * 0.065,
            marginTop: height * 0.03,
            flexDirection: "row",
            width: width * 0.93,
            borderRadius: 10,
            alignSelf: "center",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Feather
            name="search"
            size={30}
            color="black"
            style={{ marginStart: width * 0.04 }}
          />
          <TextInput
            onChange={handleSearch}
            value={jkjk}
            placeholder="search"
            style={{
              marginStart: width * 0.04,
              color: "black",
              fontSize: 17,
              height: "100%",
              width: "76%",
            }}
          ></TextInput>
        </View>

        <View style={{ flex: 1, marginBottom: height * 0.1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              return <ItemCardHori item={item} navigation={navigation} />;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
