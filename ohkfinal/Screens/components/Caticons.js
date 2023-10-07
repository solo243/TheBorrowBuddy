import { View, Text, Dimensions, Image } from "react-native";
import React from "react";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Caticons = ({ Textlable, size, iconSource }) => {
  return (
    <View>
      <View
        style={{
          height: height * 0.085,
          width: width * 0.17,
          borderColor: "#00113E",
          borderWidth: 1,
          borderRadius: 16,
          justifyContent: "center",
          margin: 8,
        }}
      >
        <Image
          source={iconSource}
          style={{ height: size, width: size, alignSelf: "center" }}
        />
      </View>
      <Text
        style={{
          alignSelf: "center",
          marginTop: -5,
          fontSize: 15,
        }}
      >
        {Textlable}
      </Text>
    </View>
  );
};

export default Caticons;
