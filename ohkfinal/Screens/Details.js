import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Touchable,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ProductDetail, ProfilePosts } from "../API/api";
import { SafeAreaView } from "react-native";
import Profile from "./Profile";
import CardWithname from "./components/CardWithName";
import { FlatList } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Details = ({ route, navigation }) => {
  const gg = route.params;
  const rr = gg.item._id;

  useEffect(() => {
    // setloading(true);
    apicall();
  }, []);
  const [userpost, Setuserpost] = useState();

  const [data, setdata] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [loading, setloading] = useState(true);


  const apicall = async () => {
    const call = await ProductDetail(rr);

    setdata(call.post);
    setuserdata(call.profile);
    setloading(false);
  };

  const Profilepost = async () => {
    const newcall = await ProfilePosts(userdata.uid);
    // console.log(newcall);
    Setuserpost(newcall);

  };
  useEffect(() => {
    // Call Profilepost whenever userdata changes
    if (userdata && userdata.uid) {
      Profilepost();
    }
  }, [userdata]);
  const handleUserPostClick = async(uid) => {
    setloading(true); // Set loading to true
    Setuserpost(uid);
    const call = await ProductDetail(uid);

   
  };
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
          source={require("../assets/newld.gif")}
          style={{ height: height * 0.1, width: width * 0.4 }}
        />
      </View>
    );
  }



  const phoneNumber = "123435";
  const opendilar = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: height * 0.07,
          backgroundColor: "white",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            style={{ marginStart: width * 0.036 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            marginStart: width * 0.04,
          }}
        >
          Product
        </Text>
      </View>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View>
            <View
              style={{
                height: height * 0.45,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: data.image }}
                style={{
                  height: height * 0.4,
                  resizeMode: "cover",
                  width: width * 0.6,
                  alignSelf: "center",
                }}
              />
            </View>

            <View
              style={{
                width: width * 0.9,
                // backgroundColor:'red',
                // height: height * 0.6,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginTop: height * 0.02,
                  fontWeight: "400",
                }}
              >
                {data.title}
              </Text>
              <Text
                style={{
                  marginTop: height * 0.02,
                  fontSize: 19,
                  fontWeight: "600",
                }}
              >
                ₹ {data.price} / {data.duration}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "400", marginTop: 10 }}>
                {/* Rating - {data.rating} */}
              </Text>
              <View
                style={{
                  backgroundColor: "grey",
                  height: 1,
                  // marginTop: height * 0.0,
                }}
              />
              <Text
                style={{
                  marginTop: height * 0.03,
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: 16,
                }}
              >
                Description
              </Text>
              <Text style={{ fontSize: 16 }}>{data.description}</Text>
              <View
                style={{
                  height: height * 0.17,
                  backgroundColor: "lightgrey",
                  borderRadius: 12,
                  marginTop: height * 0.03,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: userdata.userprofile }}
                  style={{
                    height: height * 0.1,
                    width: width * 0.2,
                    borderRadius: 100,
                    marginStart: width * 0.06,
                  }}
                />
                <View
                  style={{
                    // backgroundColor: "red",
                    height: height * 0.12,
                    marginStart: width * 0.06,
                    width: width * 0.5,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{userdata.name}</Text>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "grey",
                      marginTop: height * 0.01,
                    }}
                  />
                  <View
                    style={{ flexDirection: "row", marginTop: height * 0.01 }}
                  >
                    <Feather
                      name="phone"
                      size={20}
                      color="green"
                      style={{ marginStart: 6 }}
                    />
                    <Text style={{ marginStart: 7 }}>{userdata.mobile}</Text>

                    <TouchableOpacity
                      onPress={() => opendilar()}
                      style={{
                        position: "absolute",
                        end: 0,
                        width: width * 0.12,
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "black",
                        borderRadius: 7,
                      }}
                    >
                      <Text> Open</Text>
                    </TouchableOpacity>
                    <View style={{ width: width * 0.2 }}>
                      <Text
                        numberOfLines={2}
                        style={{
                          marginTop: height * 0.033,
                          marginStart: -width * 0.2,
                        }}
                      >
                        {userdata.desc}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: height * 0.03 }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "500",
                  marginBottom: height * 0.01,
                  marginStart: width * 0.07,
                }}
              >
                User Posts
              </Text>
              <View
                style={{
                  marginStart: width * 0.04,
                  marginBottom: height * 0.04,
                }}
              >
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={userpost}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                      onPress={() => handleUserPostClick(item.uid)}
                        // onPress={() =>postclick()}
                      >
                        {/* {console.log(userpost)} */}
                        <View
                          style={{
                            width: width * 0.38,
                            height: height * 0.33,
                            backgroundColor: "white",
                            borderRadius: 10,
                            elevation: 5,
                            margin: 10,
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              resizeMode: "cover",
                              backgroundColor: "lightgrey",
                              height: height * 0.2,
                              width: width * 0.32,
                              alignSelf: "center",
                              marginTop: height * 0.02,
                              borderRadius: 6,
                            }}
                          />
                          <View
                            style={{
                              height: height * 0.08,
                              width: width * 0.35,
                              alignSelf: "center",
                            }}
                          >
                            <Text
                              numberOfLines={1}
                              style={{
                                width: width * 0.33,
                                fontSize: 18,
                                fontWeight: "400",
                                marginTop: height * 0.01,
                                alignSelf: "center",
                              }}
                            >
                              {item.title}
                            </Text>

                            <View style={{ flexDirection: "row" }}>
                              <Text
                                style={{
                                  // width: width * 0.,
                                  fontWeight: "500",
                                  fontSize: 15,
                                  marginStart: 6,
                                }}
                              >
                                ₹ {item.price} / {item.duration}
                              </Text>
                            </View>
                            <Text
                              numberOfLines={2}
                              style={{
                                height: height * 0.025,
                                backgroundColor: "green",
                                // width: width*0.1,
                                // backgroundColor:'green'
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                marginTop: height * 0.008,
                                width: width * 0.14,
                                marginStart: 8,
                                borderRadius: 6,
                                paddingStart: 10,
                              }}
                            >
                              <AntDesign name="star" size={14} color="white" />{" "}
                              {item.rating}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />

                
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
  
};



export default Details;
