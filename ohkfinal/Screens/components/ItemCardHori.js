import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ItemCardHori = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", { item })}>
      <View
        style={{
          height: height * 0.2,
          margin: 10,
          backgroundColor: "white",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          elevation: 2,
        }}
      >
        <Image
          source={{
            uri:
              item.image ||
              "https://png.pngtree.com/element_pic/16/11/14/4810d7467c24879d43006148e3c0c73a.jpg",
          }}
          style={{
            resizeMode: "center",
            height: "75%",
            marginStart: 20,
            width: "40%",
            backgroundColor: "white",
          }}
        />

        <View
          style={{
            height: height * 0.15,
            width: "47%",
            marginEnd: width * 0.05,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "400",
              fontSize: 16.5,
              marginTop: height * 0.01,
            }}
          >
            {item.title}{" "}
          </Text>
          <Text
            style={{
              marginTop: height * 0.01,
              fontSize: 15,
              fontWeight: "400",
            }}
          >
            ₹ {item.price} / {item.duration}
          </Text>
          <Text
            numberOfLines={2}
            style={{ color: "grey", marginTop: height * 0.01 }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCardHori;
