import { View, Text, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchwatch } from "../API/api";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const Linkpage = ({ navigation, route }) => {
  // getting a height and width of the screen
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  // var decalration this area is for stat and var \
  const [data, setdata] = useState([]);
  const [loding ,setloding] =useState(true);
  // getting a item from a detail scrennn moreless geting a ep id from detail
  const selected = route.params.item;
  console.log("Console is fire")

  const geteplinks = async (kk) => {
    const ff = await fetchwatch(kk);
    const ll = await ff;
    setdata(ll.sources);
    setloding(false)
    // console.log(ll.sources);
  };

  useEffect(() => {
    geteplinks(selected.id);
  }, [selected.id]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Image
        source={{ uri: selected.image }}
        style={{
          height: height,
          width: width,
          resizeMode: "cover",
          opacity: 0.8,
          position: "absolute",
        }}
      />

{ loding ? (
<View style={{alignSelf: 'center'}}>
    <Text style={{fontSize:30,color: 'white'}}>
        loding .....
    </Text>
</View>
): (
      <View
        style={{
          width: width * 0.8,
          alignSelf: "center",
          justifyContent: "center",
          borderRadius: 13,
          borderWidth: 2,
          borderColor: "white",
        }}
      >
  
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={()=> navigation.navigate("Stream",{item})}>
                <View
                  style={{
                    flex: 1,
                    height: height * 0.1,
                    alignSelf: "center",
                    margin: 10,
                    backgroundColor: "#b3b3ff",
                    width: width * 0.7,
                    borderRadius: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "black",
                      alignSelf: "center",
                      fontSize: 20,
                      
                    }}
                  >
                    {item.quality}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

      </View>
     )} 
       </View>
       

  );
};

export default Linkpage;
