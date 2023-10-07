import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  ScrollView,
  Button,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfilePosts, ProfilePreview } from "../API/api";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");
const Profile = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      profile();
      // Profilepost();
      PostMap();
    }
  }, []);

  // useIsFocused()

  // useFocusEffect(
  //   useCallback(()=>{
  // PostMap();

  // Profile();
  //   },[])
  // )

  const profile = async () => {
    setRefreshing(true);
    const gg = getAuth();
    const ll = gg.currentUser.uid;
    let view = await ProfilePreview(ll);
    setdata(view);
    setloading(false);
    setRefreshing(false);
  };

  const [posts, setposts] = useState([]);

  const PostMap = async () => {
    const gg = getAuth().currentUser.uid;
    const call = await ProfilePosts(gg);
    console.log(call);
    setposts(call);
  };

  const [deleteload, setdeleteload] = useState(false);
  const [componentKey, setComponentKey] = useState(0);

  const deletepost = async (item) => {
    // console.log(item)
    setdeleteload(true);
    const auth = getAuth().currentUser.uid;
    const url = `https://server7-wb1d.onrender.com/v6/postdelete/${auth}/${item._id}`;
    console.log(url);
    try {
      const call = await fetch(url, {
        method: "DELETE",
      });
      setRefreshing(true);
      PostMap();
      console.log(call);
      console.log(alert("Post is deleted..."));
      setdeleteload(false);
      setRefreshing(false);
      setComponentKey((prevKey) => prevKey + 1);
    } catch (e) {
      console.log(e);
      console.log(alert("Error while deleteing a post.. please try again"));
      setdeleteload(false);
    }
  };

  const signout = () => {
    const ll = getAuth();
    const signout = ll.signOut();
    console.log("your log out brooo....... ", signout);
  };

  const refreshapp = () => {
    setRefreshing(true);
    PostMap()
      .then(() => setRefreshing(false))
      .catch((error) => {
        console.error(error);
        setRefreshing(false);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }} key={componentKey}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshapp} />
        }
      >
        <View style={{ flex: 1 }}>
          {loading ? (
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                height: height,
              }}
            >
              <ActivityIndicator size={70} color={"#00113E"} />
            </View>
          ) : (
            <View>
              <View style={{ height: 12 }} />
              <View>
                <TouchableOpacity onPress={() => signout()}>
                  <Text
                    style={{
                      borderColor: "black",
                      borderWidth: 1.5,
                      color: "red",
                      marginTop: height * 0.01,
                      right: 20,
                      width: 70,
                      height: 30,
                      textAlign: "center",
                      fontWeight: "500",
                      paddingTop: 5,
                      alignSelf: "center",
                      position: "absolute",
                    }}
                  >
                    Log Out
                  </Text>
                </TouchableOpacity>

                <Image
                  source={{
                    uri:
                      data.userprofile ||
                      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
                  }}
                  style={{
                    resizeMode: "cover",
                    height: 120,
                    width: 120,
                    alignSelf: "center",
                    borderRadius: 100,
                    marginTop: 10,
                  }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    alignSelf: "center",
                    marginTop: 20,
                    fontWeight: "500",
                  }}
                >
                  {data.name || "Not Available"}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 18,
                    marginStart: 20,
                    marginTop: 25,
                    fontWeight: "500",
                  }}
                >
                  About me
                </Text>
                <Text
                  style={{
                    width: width * 0.9,
                    // backgroundColor: "red",
                    alignSelf: "center",
                    marginTop: 7,
                  }}
                >
                  {data.desc || "Not Available"}
                </Text>
                <View
                  style={{
                    // flexWrap: ''
                    flexDirection: "row",
                    marginTop: 25,
                  }}
                >
                  <Feather
                    name="phone"
                    size={24}
                    color="green"
                    style={{ marginStart: 20 }}
                  />
                  <Text style={{ marginStart: 10, fontSize: 18 }}>
                    {" "}
                    {data.mobile || "NA"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    marginStart: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color="black"
                  />
                  <Text style={{ marginStart: 18, fontSize: 18 }}>
                    {data.email || "NA"}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: "grey",
                    width: "95%",
                    alignSelf: "center",
                    height: 1,
                    marginTop: 20,
                    marginBottom: height * 0.04,
                  }}
                />

                <View
                  style={{
                    marginBottom: 100,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    // alignContent: "center",
                    // alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {posts.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate("Details", { item }) &&
                        console.log("Press e")
                      }
                    >
                      <View
                        style={{
                          backgroundColor: "#fffF",
                          elevation: 10,
                          height: height * 0.33,
                          width: 170,
                          borderRadius: 10,
                          margin: 10,
                          // marginTop: height*0.06
                        }}
                      >
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={{
                            resizeMode: "cover",
                            height: 180,
                            width: 150,
                            borderRadius: 10,
                            alignSelf: "center",
                            marginTop: 8,
                          }}
                        />
                        <TouchableOpacity onPress={() => deletepost(item)}>
                          <View
                            style={{
                              // backgroundColor: "wh",
                              borderColor: "red",
                              borderWidth: 2,
                              height: height * 0.05,
                              width: width * 0.1,
                              position: "absolute",
                              end: 0,
                              top: -height * 0.21,
                              marginEnd: width * 0.02,
                              borderRadius: 10,
                              justifyContent: "center",
                              // marginTop: height
                            }}
                          >
                            <Ionicons
                              name="md-trash-sharp"
                              size={30}
                              color="red"
                              style={{ alignSelf: "center" }}
                            />
                          </View>
                        </TouchableOpacity>
                        <View>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 17,
                              fontWeight: "400",
                              alignSelf: "center",
                              marginTop: 10,
                              // backgroundColor:'red',
                              width: width * 0.34,
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={{ alignSelf: "center", fontWeight: "500" }}
                          >
                            ₹ {item.price} / {item.duration}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{
                              color: "grey",
                              textAlign: "center",
                              // backgroundColor: "red",
                              width: width * 0.34,
                              alignSelf: "center",
                            }}
                          >
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
        <StatusBar hidden={false} translucent={false} style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
