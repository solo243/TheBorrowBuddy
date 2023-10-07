import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

// icons for project
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// api calls
import { info } from "../API/api";
import { fetchwatch } from "../API/api";

const Detailscreen = ({ route, navigation }) => {
  const selected = route.params.item;
  const ani = selected.id;

  useEffect(() => {
    getanimeinfo(ani);
  }, [ani]);

  const [loding, setloding] = useState(true);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [data, setdata] = useState();
  const [watch, setwatch] = useState([]);

  const getanimeinfo = async (gg) => {
    let hh = await info(gg);
    const kk = await hh;
    setdata(kk);
    setloding(false);
    // data.episodes.length === 0 ? console.log("non") : console.log("gagag")
    // const gptid = data.map((gogo) => gogo.title);
  };

  const nulldata = () => {
    console.log("data is null ");
  };

  //   handle press to go another screen
  const handlepress = (item) => {
    setloding(true);
    navigation.navigate("Details", { item });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {loding ? (
          <View
            style={{
              height: height,
              width: width,
              justifyContent: "center",
              backgroundColor: "#181a20",
            }}
          >
            {/* <Image
           source={{ uri: randomgif }}
           style={{
             height: height*0.3,
             width: width*0.6,
             alignSelf: "center",
             resizeMode: "cover",
             marginBottom: height * 0.15,
            //  backgroundColor:'red'
           }}
         /> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                bottom: height * 0.1,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  //  fontFamily: "Inter-Black",
                }}
              >
                Loding
              </Text>
              {/* <Image
             source={require("../assets/loding.gif")}
             style={{
               height: height * 0.13,
               resizeMode: "center",
               width: 80,
               bottom: 50,
             }}
           /> */}
            </View>
          </View>
        ) : (
          <View style={{ backgroundColor: "rgba(24, 26, 32, 1)" }}>
            {/* horizontal bar for back and search */}
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: data.image }}
                style={{
                  height: height * 0.6,
                  width: width * 1,
                  opacity: 0.3,
                  marginTop: 0,
                }}
              />

              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(24, 26, 32, 0.4)",
                  "rgba(24, 26, 32, 1)",
                ]}
                style={{
                  width,
                  height: height * 0.5,
                  position: "absolute",
                  bottom: 0,
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <Image
                source={{ uri: data.image }}
                style={{
                  width: width * 0.5,
                  height: height * 0.4,
                  position: "absolute",
                  alignSelf: "center",
                  borderRadius: 15,
                  marginTop: 40,
                  borderColor: "black",
                  borderWidth: 0,
                }}
              />

              <View
                style={{
                  backgroundColor: "#b3b3ff",
                  height: height * 0.05,
                  width: width * 0.1,
                  borderRadius: 13,
                  marginStart: width * 0.03,
                  justifyContent: "center",
                  position: "absolute",
                  marginTop: height * 0.02,
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                  <Ionicons
                    name="ios-chevron-back"
                    size={27}
                    color="white"
                    style={{ alignSelf: "center", end: 1 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ backgroundColor: "rgba(24, 26, 32, 1)" }}>
              <View style={{ height: height * 0.09, width: width * 0.86 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: "white",
                    // fontFamily: "Inter-Black",
                    fontSize: 28,
                    marginStart: width * 0.06,
                    bottom: height * 0.1,
                  }}
                >
                  {data.title?.english || data.title?.romaji}
                </Text>
                <Text
                  style={{
                    color: "grey",
                    marginStart: width * 0.07,
                    bottom: height * 0.09,
                  }}
                >
                  {data.releaseDate + " -" || "NA"} rating - {data.id || "NA"}
                </Text>
              </View>

              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  // fontFamily: "Inter-Black",
                  marginStart: width * 0.07,
                  bottom: height * 0.07,
                  marginTop: height * 0.015,
                }}
              >
                Description
              </Text>
              <Text
                numberOfLines={6}
                style={{
                  color: "white",
                  fontSize: 15,
                  // fontFamily: "Inter-Black",
                  marginStart: width * 0.07,
                  bottom: height * 0.05,
                  width: width * 0.88,
                }}
              >
                {data.description}
              </Text>

              {data &&
              data.recommendations &&
              data.recommendations.length > 0 ? (
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 22,
                      // fontFamily: "Inter-Black",
                      marginStart: width * 0.07,
                      bottom: height * 0.01,
                      width: width * 0.88,
                    }}
                  >
                    Relations
                  </Text>

                  <View style={{ marginBottom: 0 }}>
                    <ScrollView>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={data.relations}
                        renderItem={({ item }) => {
                          return (
                            <TouchableOpacity onPress={() => handlepress(item)}>
                              <View>
                                <Text
                                  style={{ color: "white", marginStart: 20 }}
                                ></Text>
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    height: height * 0.276,
                                    width: width * 0.37,
                                    borderRadius: 14,
                                    margin: 16,
                                    bottom: height * 0.025,
                                    backgroundColor: "grey",
                                  }}
                                />
                                <Text
                                  style={{
                                    alignSelf: "center",
                                    // fontFamily: "Inter-Black",
                                    color: "white",
                                    bottom: height * 0.026,
                                  }}
                                >
                                  {item.title?.english
                                    ? item.title.english.length > 18
                                      ? item.title.english.slice(0, 20) + "..."
                                      : item.title.english
                                    : ""}
                                </Text>

                                <Text
                                  style={{
                                    alignSelf: "center",
                                    color: "grey",
                                    bottom: height * 0.026,
                                  }}
                                >
                                  {item.relationType}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </ScrollView>
                  </View>
                </View>
              ) : (
                <View>
                  <Text></Text>
                </View>
              )}

              {data &&
              data.recommendations &&
              data.recommendations.length > 0 ? (
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 22,
                      // fontFamily: "Inter-Black",
                      marginStart: width * 0.07,
                      marginTop: height * 0.02,
                      marginBottom: height * 0.02,
                      width: width * 0.88,
                    }}
                  >
                    Recommendations
                  </Text>

                  <View style={{ marginBottom: 0 }}>
                    <ScrollView>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={data.recommendations}
                        renderItem={({ item }) => {
                          return (
                            <TouchableOpacity onPress={() => handlepress(item)}>
                              <View>
                                <Text
                                  style={{ color: "white", marginStart: 20 }}
                                ></Text>
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    height: height * 0.276,
                                    width: width * 0.37,
                                    borderRadius: 14,
                                    margin: 16,
                                    bottom: height * 0.025,
                                    backgroundColor: "grey",
                                  }}
                                />
                                <Text
                                  style={{
                                    alignSelf: "center",
                                    // fontFamily: "Inter-Black",
                                    color: "white",
                                    bottom: height * 0.026,
                                  }}
                                >
                                  {item.title?.english
                                    ? item.title.english.length > 18
                                      ? item.title.english.slice(0, 20) + "..."
                                      : item.title.english
                                    : ""}
                                </Text>

                                <Text
                                  style={{
                                    alignSelf: "center",
                                    color: "grey",
                                    bottom: height * 0.026,
                                  }}
                                >
                                  rating -{" " + item.rating || "NA"}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </ScrollView>
                  </View>
                </View>
              ) : (
                <View>
                  <Image source={require('../assets/piga.png')}style={{height: height*0.3,
                        width: width*0.94,
                        alignSelf: 'center',
                        marginTop: height*0.06}} />
                </View>
              )}

              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  // fontFamily: "Inter-Black",
                  marginStart: width * 0.07,
                  marginTop: height * 0.05,
                  marginBottom: height * 0.04,
                  width: width * 0.88,
                }}
              >
                Watch Episodes
              </Text>
              <View>
                {data && data.episodes && data.episodes.length > 0 ? (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={
                      data && data.episodes
                        ? data.episodes.reverse()
                        : nulldata()
                    }
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Link", { item })
                            }
                          >
                            <View
                              style={{
                                height: height * 0.13,
                                alignSelf: "center",
                                flexDirection: "row",
                                borderRadius: 14,
                                backgroundColor: "#12181c",
                                marginBottom: 20,
                                width: width * 0.9,
                              }}
                            >
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  height: height * 0.13,
                                  resizeMode: "cover",
                                  borderRadius: 14,
                                  width: width * 0.42,
                                  opacity: 0.6,
                                }}
                              />
                              <Ionicons
                                name="play-sharp"
                                size={40}
                                color="white"
                                style={{
                                  position: "absolute",
                                  alignSelf: "center",
                                  marginStart: "20%",
                                }}
                              />

                              <View
                                style={{
                                  width: width * 0.4,
                                  marginStart: width * 0.04,
                                  marginTop: height * 0.02,

                                  height: height * 0.065,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 17,
                                    marginTop: height * 0.0,
                                  }}
                                >
                                  Episodes {item.number}
                                </Text>

                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: "white",
                                    fontSize: 13,
                                    color: "grey",
                                    marginTop: height * 0.01,
                                  }}
                                >
                                  {item.title === null ? (
                                    <Text>NotAvailable</Text>
                                  ) : (
                                    item.title
                                  )}
                                </Text>
                                <FlatList />
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                ) : (
                  // print data is not availbale print ohk a
                  <View>
                    <Image source={require('../assets/piga.png')} style={{height: height*0.3,
                        width: width*0.94,
                        alignSelf: 'center',
                        marginTop: height*0.06}}/>
                  </View>
                )}
              </View>

              <View style={{ height: 70, marginTop: 20 }}>
                <Text style={{ color: "white", textAlign: "center" }}>
                  App is under Devlopment Pls Stay on
                </Text>
              </View>
              {/* <View style={{marginBottom: 1000
                  }}>
    
                  </View> */}
            </View>
            {/* <View style={{height: 200}}>
             
              </View> */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detailscreen;
