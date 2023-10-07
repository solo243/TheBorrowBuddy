import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const PostLoad = ({ item, navigation }) => {
  const op = [1, 2, 3, 4, 5, 6];

  return (
    <View style={{ flexDirection: "row" }}>
      <FlatList
        data={op}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: width * 0.38,
                height: height * 0.33,
                backgroundColor: "lightgrey",
                borderRadius: 10,
                elevation: 5,
                margin: 10,
              }}
            >
              <View
                style={{
                  height: height * 0.08,
                  width: width * 0.35,
                  alignSelf: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}></View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PostLoad;
