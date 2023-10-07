import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  Modal,
} from "react-native";
import React, { useEffect, useState, useRef,useCallback } from "react";

// for all apis
import {
  fetchpopular,
  fetchrecent,
  fetchtrending,
  fetchwatch,
} from "../API/api";
import { idfetch } from "../API/api";

// for all icons in code
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// other outside library
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";

// import all loding from
import { Skeletant } from "../Loidngfile/loding";
import { Recentanime } from "../Loidngfile/loding";
import { Trendinglo } from "../Loidngfile/loding";
import { Trendingposter } from "../Loidngfile/loding";


// import fonts from out sides 
import {useFonts} from 'expo-font'


// get device all width and height
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
// starting of the code execution

const Homescreen = ({navigation}) => {
  //TODO:  main use effect
  useEffect(() => {
    gettranding();
    getpopular();
    getrecentep();
  }, []);

  const [result, setresults] = useState([]);
  const [tranding, settranding] = useState([]);
  const [recentep, setrecentep] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const indexpages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //TODO: loding check
  const [loadrecent, setloadrecent] = useState(true);
  const [loadforyou, setforyou] = useState(true);
  const [loding, setloding] = useState(true);

  // FIXME: get tranding anime from api
  const gettranding = async () => {
    let data = await fetchtrending();
    const newdata = await data.results;
    setresults(newdata);
    setloding(false);
  };

  // FIXME: get popular anime from api
  const getpopular = async (item) => {
    setforyou(true);
    let gg = await fetchpopular(item);
    let newgg = await gg.results;
    settranding(newgg);
    setforyou(false);
    setCurrentPage(item);
    // importtant topic
    //  const gptid = tranding.map(data => data.trailer);
  };

  // FIXME: get recent anime from api
  const getrecentep = async () => {
    let rr = await fetchrecent();
    let vv = await rr.results;
    setrecentep(vv);
    setloadrecent(false);
  };



// load font from out side 
// const [isLoaded] = useFonts({
//     "gg": require("../assets/fonts/NunitoSans_7pt_Condensed-Black.ttf"),

//   });


  //FIXME:  array of the 10 for bottom page button
  const paginationArray = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar showHideTransition={false} />
      <View style={{ flex: 1, backgroundColor: "#181a20" }}>
        <View
          style={{
            backgroundColor: "#181a20",
            // marginTop: height * 0.03,
            height: height * 0.07,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {/*TODO: main AmnFlix header at the top  */}
          <Text
            style={{
              fontSize: 30,
              color: "white",
              textAlign: "center",
              alignSelf: "center",
            //   fontFamily: "gg",
              fontWeight: '400'
            }}
          >
            Amnitrix
          </Text>

          {/* TODO: hamberger menu icon at the top  */}
          <TouchableOpacity
            onPress={() => console.warn("Under Devlopment ")}
            style={{
              left: width * 0.06,
              top: height * 0.026,
              width: 30,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <Octicons name="three-bars" size={25} color="white" />
          </TouchableOpacity>

          {/* TODO: serach icon at the top  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
            style={{
              left: width * 0.85,
              width: 30,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <Octicons name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View>
              {loding ? (
                <View>
                  <Trendingposter />
                </View>
              ) : (
                <View>
                  <FlatList
                    data={result}
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <Animatable.View
                          key={item}
                          animation="fadeInDown"
                          delay={0.2}
                          useNativeDriver
                        >
                          <View>
                            <Image
                              source={{ uri: item.cover }}
                              style={{
                                height: height * 0.15,
                                width: width * 0.9,
                                margin: width * 0.05,
                                borderRadius: 20,
                                resizeMode: "cover",
                              }}
                            />
                          </View>
                        </Animatable.View>
                      );
                    }}
                  />
                </View>
              )}

              {/* recent anime list  */}
              <View>
                <Text
                  style={{
                    color: "white",
                    marginTop: height * 0.04,
                    fontSize: width * 0.065,
                    margin: width * 0.04,
                    // fontFamily: "Inter-Black",
                    // fontFamily: "gg",
                    // fontWeight: '00'
                  }}
                >
                  Trending Anime
                </Text>

                <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate("SeeAll", {
                  //     source: "recentep",
                  //     data: recentep,
                  //   })
                  // }
                  style={{
                    width: width * 0.3,
                    height: 25,
                    position: "absolute",
                    left: width * 0.84,
                    top: height * 0.07,
                    // backgroundColor: 'red'
                  }}
                >
                  <Text
                    style={{
                      color: "#b3b3ff",
                      //  fontFamily: "Inter-Black"
                    }}
                  >
                    see all
                  </Text>
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={18}
                    color="#b3b3ff"
                    style={{
                      position: "absolute",
                      left: width * 0.1,
                    }}
                  />
                </TouchableOpacity>
              </View>

              {loding ? (
                <View>
                  <Trendinglo />
                </View>
              ) : (
                <View>
                  <FlatList
                    data={result}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <Animatable.View
                          key={item}
                          animation="fadeInRight"
                          useNativeDriver
                        >
                          <View>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("Details", { item })
                              }
                            >
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  height: height * 0.26,
                                  width: width * 0.34,
                                  margin: 10,
                                  borderRadius: 14,
                                  resizeMode: "cover",
                                }}
                              />
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: "white",
                                  fontSize: width * 0.031,
                                  width: width * 0.3,
                                  height: height * 0.025,
                                  marginStart: 15,
                                  textAlign: "center",
                                }}
                              >
                                {item.title.english || item.title.romaji}
                              </Text>
                              <Text style={{ color: "grey", marginStart: 30 }}>
                                {item.releaseDate + " " || "?"}- rating
                                {" " + item.rating || "NA"}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </Animatable.View>
                      );
                    }}
                  />
                </View>
              )}
            </View>

            {/* loding recent ep is true r not  */}
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  color: "white",
                  marginTop: height * 0.04,
                  fontSize: width * 0.065,
                  margin: width * 0.04,
                  // fontFamily: "Inter-Black",
                }}
              >
                Recent Anime
              </Text>

              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate("SeeAll", {
                //     source: "recentep",
                //     data: recentep,
                //   })
                // }
                style={{
                  width: width * 0.3,
                  height: 25,
                  position: "absolute",
                  left: width * 0.84,
                  top: height * 0.07,
                }}
              >
                <Text
                  style={{
                    color: "#b3b3ff",
                    //  fontFamily: "Inter-Black"
                  }}
                >
                  see all
                </Text>
                <Ionicons
                  name="arrow-forward-sharp"
                  size={18}
                  color="#b3b3ff"
                  style={{
                    position: "absolute",
                    left: width * 0.1,
                  }}
                />
              </TouchableOpacity>
            </View>

            {loadrecent ? (
              <View>
                <Recentanime />
              </View>
            ) : (
              <View>
                <FlatList
                  data={recentep}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <Animatable.View
                        key={item}
                        animation="fadeInRight"
                        useNativeDriver
                      >
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Details", { item })
                            }
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={{
                                height: height * 0.26,
                                width: width * 0.34,
                                margin: 10,
                                borderRadius: 14,
                                resizeMode: "cover",
                              }}
                            />
                            <Text
                              numberOfLines={1}
                              style={{
                                color: "white",
                                fontSize: width * 0.031,
                                width: width * 0.3,
                                height: height * 0.025,
                                marginStart: 15,
                                textAlign: "center",
                              }}
                            >
                              {item.title.english || item.title.romaji}
                            </Text>
                            <Text
                              style={{
                                color: "grey",
                                marginStart: 20,
                                textAlign: "center",
                                marginEnd: width * 0.08,
                              }}
                            >
                              rating
                              {" " + item.rating || "NA"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Animatable.View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}

            {/* for you  */}
            <View>
              <Text
                style={{
                  color: "white",
                  marginTop: height * 0.05,
                  fontSize: width * 0.065,
                  margin: width * 0.04,
                  // fontFamily: "Inter-Black",
                }}
              >
                For You
              </Text>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Details')}
                style={{
                  width: 200,
                  height: 25,
                  position: "absolute",
                  left: width * 0.84,

                  top: height * 0.068,
                }}
              >
                <Text
                  style={{
                    color: "#b3b3ff",
                    //  fontFamily: "Inter-Black"
                  }}
                >
                  see all
                </Text>
                <Ionicons
                  name="arrow-forward-sharp"
                  size={18}
                  color="#b3b3ff"
                  style={{
                    position: "absolute",
                    left: width * 0.1,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View>
              {loadforyou ? (
                <View>
                  <Skeletant />
                </View>
              ) : (
                <View>
                  <FlatList
                    data={tranding}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <Animatable.View
                          key={item}
                          animation="fadeInUp"
                          // delay={0.2}
                          useNativeDriver
                        >
                          <ScrollView key={item.id}>
                            <View style={{ flexDirection: "row" }}>
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  height: height * 0.28,
                                  width: width * 0.38,
                                  borderRadius: 15,
                                  margin: 20,
                                }}
                              />
                              <View
                                style={{
                                  height: height * 0.25,
                                  marginTop: height * 0.036,

                                  width: width * 0.47,
                                }}
                              >
                                <View style={{ height: height * 0.063 }}>
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      color: "white",
                                      fontSize: height * 0.023,
                                      marginStart: width * 0.02,
                                      // fontFamily: "Inter-Black",
                                    }}
                                  >
                                    {/* {
                                item.title.english == null ?
                                  item.title.romaji :
                                  item.title.english
                              } */}
                                    {item.title.english || item.title.romaji}
                                  </Text>
                                  <Text
                                    style={{
                                      color: "grey",
                                      marginStart: width * 0.03,
                                      marginTop: height * 0.01,
                                    }}
                                  >
                                    {item.releaseDate + " " || "?"}- rating
                                    {" " + item.rating || "NA"}
                                  </Text>

                                  {/* hr border  */}
                                  <View
                                    style={{
                                      borderBottomWidth: 1,
                                      backgroundColor: "grey",
                                      marginTop: height * 0.011,
                                      borderColor: "grey",
                                      width: width * 0.43,
                                      marginStart: width * 0.021,
                                    }}
                                  />

                                  <Text
                                    numberOfLines={3}
                                    style={{
                                      color: "white",
                                      marginStart: width * 0.02,
                                      marginTop: height * 0.02,
                                      // fontFamily: "Inter-Black",
                                      height: height * 0.1,
                                    }}
                                  >
                                    {item.description}
                                  </Text>

                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("Details", { item })
                                    }
                                  >
                                    <View
                                      style={{
                                        backgroundColor: "#b3b3ff",
                                        width: width * 0.45,
                                        height: height * 0.05,
                                        marginTop: height * 0.003,
                                        borderRadius: 10,
                                        marginStart: width * 0.02,
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Ionicons
                                        name="play-sharp"
                                        size={30}
                                        color="white"
                                        style={{
                                          position: "absolute",
                                          alignSelf: "center",
                                        }}
                                      />
                                      {/* <AntDesign
                                        name="play"
                                        size={26}
                                        color="white"
                                        style={{ alignSelf: "center" }}
                                      /> */}
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </ScrollView>
                        </Animatable.View>
                      );
                    }}
                  />
                </View>
              )}
            </View>

            <View style={{ height: height * 0.4 }}>
              <View
                style={{
                  marginTop: height * 0.03,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <LottieView
                  autoPlay
                  style={{
                    width: 100,
                    height: 100,
                    //   position: 'absolute',
                  }}
                  source={require("../animegirl.json")}
                />
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  numColumns={5}
                  data={paginationArray}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            borderRadius: 14,
                            justifyContent: "center",
                            backgroundColor:
                              currentPage === item ? "white" : "#b3b3ff",
                            width: width * 0.12,
                            height: height * 0.06,
                            margin: 10,
                            borderRadius: 14,
                            justifyContent: "center",
                            alignSelf: "center",
                            borderColor: "white",
                            borderWidth: 2,
                          }}
                          onPress={() => getpopular(item) & console.log()}
                        >
                          <View>
                            <Text
                              style={{
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: "700",
                              }}
                            >
                              {item}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Homescreen;
