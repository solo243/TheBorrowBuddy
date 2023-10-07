import { View, Text, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { Checkreqest, ProductDetail, ProfilePreview } from "../API/api";
import Profile from "./Profile";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Reqest = ({ navigation }) => {
  useEffect(() => {
    Checkreq();

    // datafetch();
  }, []);

  const [acceptedPosts, setAcceptedPosts] = useState([]);

  const [data, setdata] = useState();
  // console.log(data);
  const [senderuser, setsenderuser] = useState([]);
  const Checkreq = async () => {
    const auth = getAuth().currentUser.uid;
    const url = `https://server7-wb1d.onrender.com/r3/checkrequest/${auth}`;

       
    const check = await fetch(url);
    const ll = await check.json();
    setdata(ll);

    const acceptedPostIds = ll
      .filter((item) => item.status === "accepted")
      .map((item) => item._id);
    setAcceptedPosts(acceptedPostIds);

    const Sneders = data
      .filter((item) => auth === item.sender)
      .map((item) => item._id);
    setsenderuser(Sneders);
  };

  const eventthis = async (item) => {
    try {
      const gg = item._id;
      const serverUrl = "https://server7-wb1d.onrender.com";
      const url = `${serverUrl}/r2/accept-request/${gg}/accepted`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setAcceptedPosts([...acceptedPosts, item._id]);
      } else {
        console.error("Request not successful");
      }
    } catch (error) {
      console.error("Error making network request:", error);
    }
  };

  const Ignore = async (item) => {
    const gg = item._id;
    const serverUrl = "https://server7-wb1d.onrender.com"; // Replace with your actual server URL
    const url = `${serverUrl}/r2/accept-request/${gg}/ignore`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fgk = await response.json();
    // console.log(fgk);
    Checkreq();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: height * 0.08,
            backgroundColor: "white",
            width: width,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              style={{ marginStart: width * 0.06 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 19,
              alignItems: "center",
              marginStart: height * 0.02,
            }}
          >
            Home
          </Text>
        </View>

        <View style={{ marginTop: height * 0.02 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              const match = senderuser.includes(item._id);
              //  {console.log(item._id)}
              const isAccepted = acceptedPosts.includes(item._id);
              return (

                <View
                  style={{
                    height: height * 0.14,
                    backgroundColor: "red",
                    margin: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                >
                  <View>    
                    <Image
                      source={{
                        uri: "https://apollo-singapore.akamaized.net/v1/files/s7cq1u3pi4pt1-IN/image;s=272x0",
                      }}
                      style={{
                        height: height * 0.08,
                        marginStart: width * 0.05,
                        width: width * 0.17,
                        borderRadius: 50,
                      }}
                    />
                  </View>
                  {match ? (
                    <View>
                      <Text>Pending </Text>
                    </View>
                  ) : isAccepted ? (
                    <View style={{ backgroundColor: "green" }}>
                      <Text>{item.mobile}</Text>
                      {/* {console.log(item)} */}
                    </View>
                  ) : (
                    <View
                      style={{
                        // backgroundColor:,
                        height: height * 0.06,
                        width: width * 0.3,
                      }}
                    >
                      <View>
                        <TouchableOpacity
                          onPress={() => eventthis(item)}
                          style={{
                            // margin: 5,
                            backgroundColor: "green",
                            height: height * 0.04,
                          }}
                        >
                          <Text>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Ignore(item)}
                          style={{
                            backgroundColor: "green",
                            margin: 5,
                            height: height * 0.04,
                          }}
                        >
                          <Text>ignore</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Reqest;
