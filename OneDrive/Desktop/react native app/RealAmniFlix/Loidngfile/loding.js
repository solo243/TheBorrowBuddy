import { View, Text, FlatList, Dimensions } from "react-native";
import React from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const paginationArray = Array.from({ length: 10 }, (_, index) => index + 1);

export const Skeletant = () => {
  return (
    <View>
      <FlatList
        data={paginationArray}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: height * 0.28,
                  backgroundColor: "grey",
                  width: width * 0.38,
                  borderRadius: 15,
                  margin: 20,
                }}
              ></View>
              <View
                style={{
                  height: height * 0.25,
                  marginTop: height * 0.036,
                  width: width * 0.47,
                }}
              >
                <View
                  style={{ height: height * 0.063, backgroundColor: "grey" }}
                ></View>
                <View
                  style={{
                    backgroundColor: "grey",
                    height: height * 0.02,
                    marginTop: height * 0.03,
                  }}
                ></View>
                <View
                  style={{
                    backgroundColor: "grey",
                    height: height * 0.02,
                    width: width * 0.2,
                    marginTop: height * 0.01,
                  }}
                ></View>
                <View
                  style={{
                    backgroundColor: "grey",
                    height: height * 0.02,
                    width: width * 0.33,
                    marginTop: height * 0.01,
                  }}
                ></View>
                <View
                  style={{
                    backgroundColor: "grey",
                    height: height * 0.06,
                    width: width * 0.46,
                    marginTop: height * 0.03,
                  }}
                ></View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export const Recentanime = () => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={paginationArray}
        renderItem={({ item }) => {
          return (
            <View style={{ borderRadius: 10 }}>
              <View
                style={{
                  height: height * 0.26,
                  width: width * 0.34,
                  margin: 10,
                  borderRadius: 16,
                  backgroundColor: "grey",
                }}
              ></View>
              <View
                style={{
                  color: "white",
                  fontSize: width * 0.031,
                  width: width * 0.3,
                  height: height * 0.02,
                  alignSelf: "center",
                  backgroundColor: "grey",
                }}
              ></View>
            </View>
          );
        }}
      />
    </View>
  );
};

export const Trendinglo = () => {
  return (
    <FlatList
      data={paginationArray}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <View style={{ borderRadius: 10 }}>
            <View
              style={{
                height: height * 0.26,
                width: width * 0.34,
                margin: 10,
                borderRadius: 16,
                backgroundColor: "grey",
              }}
            ></View>
            <View
              style={{
                color: "white",
                fontSize: width * 0.031,
                width: width * 0.3,
                height: height * 0.02,
                alignSelf: "center",
                backgroundColor: "grey",
              }}
            ></View>
          </View>
        );
      }}
    />
  );
};

export const Trendingposter = () => {
  return (
    <View>
      {/* <ScrollView> */}
      <FlatList
        data={paginationArray}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        // keyExtractor={}
        renderItem={({ item }) => {
          return (
            <View>
              <View
                style={{
                  height: height * 0.15,
                  width: width * 0.9,
                  margin: width * 0.05,
                  borderRadius: 20,
                  backgroundColor: "grey",
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
