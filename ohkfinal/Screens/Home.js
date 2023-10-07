import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Caticons from "./components/Caticons";
import { Category, Deals, popularfetch } from "../API/api";
import CardWithname from "./components/CardWithName";
import PostLoad from "./components/POstLoad";
const height = Dimensions.get("window").height;
// import { AntDesign } from '@expo/vector-icons';
const width = Dimensions.get("window").width;

const Home = ({ navigation }) => {
  const uu = getAuth();

  useEffect(() => {
    PopularFetch();
  }, []);

  const [dealdata, setdealdata] = useState([]);
  const [popular, setpopular] = useState([]);

  const [dealload, setdealload] = useState(true);
  const [postload, setpostload] = useState(true);

  const PopularFetch = async () => {
    const pop = await popularfetch();
    const deals = await Deals();
    setdealdata(deals);
    setdealload(false);
    // console.log(deals);
    setpopular(pop.posts);
    setpostload(false);
    // console.log(popular);
  };

  const Allcategories = [
    {
      lable: "Books",
      icon: require("../assets/book100.png"),
      categori: "books",
    },
    {
      lable: "Video",
      icon: require("../assets/camera.png"),
      categori: "video",
    },
    {
      lable: "Tools",
      icon: require("../assets/tools.png"),
      categori: "tools",
    },
    {
      lable: "Cloths",
      icon: require("../assets/dress.png"),
      categori: "cloths",
    },
  ];

  const Allcategories1 = [
    {
      lable: "Music",
      icon: require("../assets/Music.png"),
      categori: "music",
    },
    {
      lable: "Automobile",
      icon: require("../assets/Automobile.png"),
      categori: "automobile",
    },
    {
      lable: "Home",
      icon: require("../assets/Homedeco.png"),
      categori: "home-decoration",
    },
    {
      lable: "Sports",
      icon: require("../assets/Sport.png"),
      categori: "sport-game",
    },
  ];

  const [data, setdata] = useState([]);
  useEffect(() => {
    // apicall();
  }, []);
  const apicall = async () => {
    try {
      const call = await Category("automobile");
      setdata(call);
      // console.log(call);
    } catch (e) {
      console.log(e);
    }
  };

  const og = [1, 2, 3, 4, 5];
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: height * 0.32,
              backgroundColor: "#00113E",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                paddingStart: 20,
                paddingEnd: 20,
                width: width,
                marginTop: height * 0.03,
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                {" "}
                Hello User
              </Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Reqest")}>
                <FontAwesome5 name="bell" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Search")}
              style={{
                backgroundColor: "white",
                height: 50,
                width: "90%",
                alignSelf: "center",
                marginTop: height * 0.03,
                borderRadius: 14,
                justifyContent: "center",
                paddingStart: 20,
              }}
            >
              <View
                style={{
                  // justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <AntDesign
                  name="search1"
                  size={30}
                  color="black"
                  style={{ justifyContent: "center" }}
                />
                <Text
                  style={{
                    marginStart: width * 0.04,
                    fontSize: 17,
                    marginTop: 4,
                    color: "grey",
                  }}
                >
                  Search Product here...
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: height * 0.22,
              alignSelf: "center",
              justifyContent: "center",
              alignContent: "center",
              width: width,
              marginTop: -height * 0.13,
            }}
          >
            {dealload ? (
              <View
                style={{
                  width: width,
                  height: height * 0.28,
                }}
              >
                <View
                  style={{
                    height: height * 0.2,
                    backgroundColor: "lightgrey",
                    borderRadius: 10,
                    margin: 14,
                    width: width * 0.9,
                    alignSelf: "center",
                  }}
                ></View>
              </View>
            ) : (
              <FlatList
                horizontal
                data={dealdata}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    // <TouchableOpacity onPress={()=>navigation.navigate("Details",{item})}>
                    <View
                      style={{
                        width: width,
                        height: height * 0.28,
                      }}
                    >
                      <View
                        style={{
                          height: height * 0.2,
                          // backgroundColor: "red",
                          borderRadius: 10,
                          margin: 14,
                          width: width * 0.9,
                          alignSelf: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.photo }}
                          style={{
                            resizeMode: "cover",
                            height: height * 0.2,
                            borderRadius: 13,
                            width: width * 0.9,
                          }}
                        />
                      </View>
                    </View>
                    //   </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>

          <View>
            <Text
              style={{
                fontSize: 20,
                marginStart: width * 0.05,
                marginTop: 23,
                fontWeight: "600",
              }}
            >
              Products
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: height * 0.01,
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {Allcategories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("CatScreen", { cate: item.categori })
                }
              >
                <View key={index}>
                  <Caticons
                    iconSource={item.icon}
                    Textlable={item.lable}
                    size={35}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: height * 0.01,
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {Allcategories1.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("CatScreen", { cate: item.categori })
                }
              >
                <View key={index}>
                  <Caticons
                    iconSource={item.icon}
                    Textlable={item.lable}
                    size={35}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={{
              fontSize: 20,
              marginStart: width * 0.05,
              marginTop: 37,
              fontWeight: "600",
              marginBottom: height * 0.013,
            }}
          >
            Popular items
          </Text>
          <View style={{ marginBottom: 100 }}>
            {postload ? (
              <PostLoad />
            ) : (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                // data={[1, 2, 3, 4, 5]}
                data={popular}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Detils", { item })}
                    >
                      <CardWithname item={item} navigation={navigation} />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
        <StatusBar style="light" hidden={false} translucent={false} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
