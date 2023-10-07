import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const CardWithname = ({ item, navigation }) => {
  // console.log(item);
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", { item })}>
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
              backgroundColor: 'green',
              // width: width*0.1,
              // backgroundColor:'green'
              justifyContent: "center",
              alignItems: "center",
              color: 'white',
              marginTop: height * 0.008,
              width: width * 0.14,
              marginStart: 8,
              borderRadius: 6,
              paddingStart: 10,
            }}
          >
            <AntDesign name="star" size={14} color='white'/> {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardWithname;
