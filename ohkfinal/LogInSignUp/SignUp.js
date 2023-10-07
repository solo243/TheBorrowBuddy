import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Easing,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {
  Firestore,
  collection,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import InputField from "./components/InputField";
import { doc } from "firebase/firestore";
import { app } from "../config";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const SignUp = ({ navigation }) => {
  const [email, Setemail] = useState("");
  const [pass, Setpass] = useState("");
  const [name, Setname] = useState("");
  const [loading, setloading] = useState(false);
  const [wrong, setwrong] = useState(false);
  const [disable, setdisable] = useState(false);

  const SignUp = async () => {
    if (!name.trim()) {
      console.log("Please fill in all fields");
      console.log(alert("Please Enter your name "));
      return; // Don't proceed with sign-up
    }

    try {
      setdisable(true);
      setloading(true);
      const UserCreden = await createUserWithEmailAndPassword(
        auth,
        email,
        pass,
        name
      );

      const Firebase = getFirestore();
      const firebasedata = doc(Firebase, "Users", UserCreden.user.uid);
      await setDoc(firebasedata, {
        name: name,
        email: email,
        password: pass,
        uid: UserCreden.user.uid,
      });
      console.log(alert("SignUp Complate welcome"));
      setwrong(false);
      SendDataToServer(UserCreden.user.uid);
      // setloading(false);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        console.log(alert("email is ALready in use sir"));
        setloading(false);
        setwrong(true);
        setdisable(false);
      } else if (e.code === "auth/invalid-email") {
        console.log(alert("Please Enter a valid email  "));
        setloading(false);
        setdisable(false);
        setwrong(true);
      } else if (e.code === "auth/weak-password") {
        console.log(alert("Password is too short "));
        setloading(false);
        setwrong(true);
        setdisable(False);
      } else if (e.code === "auth/missing-password") {
        console.log(alert(" Password is missing "));
        setloading(false);
        setdisable(false);
      } else {
        console.log(alert(e));
        console.log(e);
        setdisable(false);
        setloading(false);
      }
      console.log(e);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/newld.gif")}
          style={{ height: height * 0.1, width: width * 0.4 }}
        />
      </View>
    );
  }

  const SendDataToServer = async (uid) => {
    // const lk = new FormData();
    // lk.append("file", {
    //   uri: ggresult.uri,
    //   type: "image/jpg",
    //   name: "adjwduahwuidh",
    // });
    // lk.append("upload_preset", "Display0505");
    // lk.append("cloud_name", "profile4848");
    // const rr = await fetch(
    //   "https://api.cloudinary.com/v1_1/profile4848/image/upload",
    //   {
    //     method: "post",
    //     body: lk,
    //   }
    // );
    // const gg = await rr.json();

    const url = `https://server7-wb1d.onrender.com/v1/profile/${uid}`;
    console.log(url);
    const data = {
      name: name,
      email: email,
      mobile: 9767445827,
      // userprofile: gg.url,
      userprofile:
        "https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
      location: "NUll",
      desc: "My name is Deol, and I'm a creative individual with a passion for technology and innovation. I enjoy tackling challenges, exploring new ideas, and continuously learning to expand my horizons.",
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response)
    } catch (e) {
      console.log(e);
    }
  };

  const auth = getAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          //   height: height,
          //   backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            // backgroundColor: "gre4en",
            width: width * 0.7,
            height: height * 0.8,
            marginTop: height * 0.2,
            // backgroundColor: "lightgrey",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 30,
              fontWeight: "600",
              alignSelf: "center",
              marginTop: height * 0.02,
              marginBottom: 20,
            }}
          >
            Borrow Buddy
          </Text>

          <Text style={{ marginTop: 10, fontSize: 17, fontWeight: "500" }}>
            Name
          </Text>
          <InputField lable={"Name"} item={name} setitem={Setname} />
          <Text style={{ marginTop: 20 }}>Email</Text>
          <InputField lable={"Email"} item={email} setitem={Setemail} />

          <Text style={{ marginTop: 20 }}>Password</Text>
          <InputField lable={"Password"} item={pass} setitem={Setpass} />

          <TouchableOpacity
            disabled={disable}
            onPress={() => SignUp()}
            style={{
              justifyContent: "center",
              height: 70,
              width: 300,
              borderRadius: 14,
              backgroundColor: disable ? "grey" : "black",
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
                fontSize: 17,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                marginTop: 13,
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              Already have account{" "}
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "darkblue", fontWeight: "700" }}>
                  Login!
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
