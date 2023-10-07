import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
// import DropDownPicker from "react-native-dropdown-picker";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { getAuth } from "firebase/auth";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Inputarea = ({ lable, item, setitem }) => {
  return (
    <TextInput
      value={item}
      onChangeText={(text) => setitem(text)}
      placeholder={lable}
      style={{
        marginTop: height * 0.01,
        paddingStart: 20,
        fontSize: 17,
        height: height * 0.062,
        width: width * 0.8,
        paddingEnd: width * 0.05,
        borderRadius: 10,
        backgroundColor: "lightgrey",
      }}
    ></TextInput>
  );
};

const Save = ({ navigation }) => {
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  });

  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [durations, setdurations] = useState("");
  const [descri, setdescri] = useState("");
  const [categori, setcategori] = useState("");
  const [image, setImage] = useState();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      let newre = result.assets[0].uri;
      setImage(newre);
      console.log(image);
    } else {
      alert("Please select Product image");
    }
  };

  const [cloudimage, setcloudimage] = useState();
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(false);

  const Uploda = async () => {
    setdisable(true);
    console.log(price);

    if (!title || !price || !durations || !descri || !categori || !image) {
      console.log(alert("Error Please fill in all fields."));
      setdisable(false);
      return;
    }

    try {
      setloading(true);
      const lk = new FormData();
      lk.append("file", {
        uri: image,
        type: "image/jpg",
        name: "adjwduahwuidh",
      });
      lk.append("upload_preset", "Display0505");
      lk.append("cloud_name", "profile4848");
      const rr = await fetch(
        "https://api.cloudinary.com/v1_1/profile4848/image/upload",
        {
          method: "post",
          body: lk,
        }
      );

      const gg = await rr.json();
      console.log(alert("data transfer to cloudnary"));
      console.log(gg);
      setcloudimage(gg.secure_url);
      // console.log(cloudimage);
    } catch (e) {
      setdisable(false);
      console.log("Cloudniry error", e);
      setloading(false);
    }
  };
  useEffect(() => {
    if (!cloudimage) {
      setloading(false);
      setdisable(false);

      return;
    }

    const auth = getAuth().currentUser.uid;
    const url = `https://server7-wb1d.onrender.com/v2/addpost/${auth}`;
    console.log(url);
    const data = {
      title: title,
      price: price,
      rating: 1,
      category: categori,
      duration: durations,
      score: 1,
      description: descri,
      image: cloudimage,
    };

    const postData = async () => {
      try {
        const call = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (call.ok) {
          const jsonResponse = await call.json();
          console.log("Success", jsonResponse);
          setloading(false);
          setdisable(false);
          setcloudimage(null);
          setcategori("");
          setdescri("");
          setprice("");
          settitle("");
          console.log(alert("Post added Success... "));
        } else {
          console.log("error", call.status);
          console.log(call);
          setloading(false);
          setdisable(false);
        }
        console.log(call);
        setdisable(false);

        setloading(false);
      } catch (e) {
        console.log(e);
        setloading(false);
        setdisable(false);
      }
    };
    postData();
  }, [cloudimage]);

  const duration = [
    { key: "1", value: "day" },
    { key: "2", value: "month" },
    { key: "3", value: "hour" },
    { key: "4", value: "week" },
  ];

  const catdata = [
    { key: "1", value: "books" },
    { key: "2", value: "cloths" },
    { key: "3", value: "tools" },
    { key: "4", value: "video" },
    { key: "5", value: "automobile" },
    { key: "6", value: "music" },
    { key: "7", value: "home-decoration" },
    { key: "8", value: "sport-game" },
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={{
            uri: "https://media.tenor.com/JTNGZy7xMBIAAAAi/illopop-illo.gif",
          }}
          style={{
            height: height * 0.2,
            width: width * 0.4,
            alignSelf: "center",
            // backgroundColor: "red",
          }}
        />
        <Text
          style={{
            alignSelf: "center",
            marginTop: height * 0.04,
            fontSize: 19,
            fontWeight: "500",
          }}
        >
          Please Wait...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: height * 0.75,
            width: width * 0.85,
            marginTop: height * 0.03,
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 22, alignSelf: "center" }}>Post Item</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginTop: height * 0.02,
            }}
          >
            Title
          </Text>
          <Inputarea lable={"Tile go here"} setitem={settitle} item={title} />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginTop: height * 0.02,
            }}
          >
            Price
          </Text>
          <View style={{ flexDirection: "row" }}>
            {/* <Text style={{ fontSize: 17, alignSelf: "center" }}> ₹ </Text> */}
            <TextInput
              value={price}
              onChangeText={setprice}
              keyboardType="numeric"
              style={{
                height: height * 0.06,
                backgroundColor: "lightgrey",
                borderRadius: 10,
                marginTop: height * 0.01,
                width: width * 0.4,
                paddingStart: width * 0.05,
                fontSize: 17,
              }}
              placeholder="Enter Price"
            />
            {/* <Text style={{ alignSelf: "center", fontSize: 34 ,marginStart: width*0.03}}>/</Text> */}
            <SelectList
              setSelected={(val) => setdurations(val)}
              data={duration}
              boxStyles={{
                height: height * 0.06,
                marginTop: height * 0.01,
                // width: width*0.1,
                marginStart: width * 0.05,
              }}
              inputStyles={{ fontSize: 17 }}
              save="value"
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginTop: height * 0.04,
            }}
          >
            Product Description
          </Text>
          <Inputarea
            lable={"tell somthing about your product..."}
            item={descri}
            setitem={setdescri}
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginTop: height * 0.04,
            }}
          >
            Product Categori
          </Text>
          <SelectList
            setSelected={(val) => setcategori(val)}
            data={catdata}
            boxStyles={{
              height: height * 0.06,
              marginTop: height * 0.02,
              // width: width*0.1,
              // marginStart: width * 0.05,
            }}
            inputStyles={{ fontSize: 17 }}
            save="value"
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginTop: height * 0.02,
            }}
          >
            Photo
          </Text>
          <TouchableOpacity onPress={() => pickImageAsync()}>
            <View
              style={{
                height: height * 0.1,
                // backgroundColor: "red",
                marginTop: height * 0.01,
                marginBottom: height * 0.02,
              }}
            >
              <View
                style={{
                  height: height * 0.12,
                  justifyContent: "center",
                  // backgroundColor: "red",
                  width: width * 0.312,
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderRadius: 8,
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ height: height * 0.1, width: width * 0.3 }}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Uploda()}
            disabled={disable}
            style={{
              height: height * 0.09,
              borderRadius: 10,
              justifyContent: "center",
              backgroundColor: "black",
              marginTop: height * 0.02,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                color: "white",
                fontWeight: "500",
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Save;
