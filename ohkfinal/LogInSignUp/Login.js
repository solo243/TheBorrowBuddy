import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import InputField from "./components/InputField";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import firebase from "firebase/app";
import "firebase/auth";

const Login = ({ navigation }) => {
  const [email, Setemail] = useState("");
  const [pass, Setpass] = useState("");
  const [iswrong, setiswrong] = useState(false);
  const [loading, setloading] = useState(false);

  const auth = getAuth();

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
  const Login = async () => {
    try {
      setloading(true);
      const yy = await signInWithEmailAndPassword(auth, email, pass);
      const user = yy;
      console.log(user);
      console.log("you are login brooooo !!!!!!!!!!");
      console.log(alert("Your are loged in welcome ✅", user));
      setiswrong(false);
    } catch (e) {
      if (e.code === "auth/invalid-login-credentials") {
        setloading(false);
        console.log(
          alert("Pleas Check your Email and Password Its wrong!") && e
        );
        setiswrong(true);
        setloading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginTop: height * 0.23,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            // backgroundColor: "red",
            width: width * 0.8,
            height: height * 0.8,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 30,
              fontWeight: "600",
              alignSelf: "center",
              marginTop: height * 0.02,
              marginBottom: 25,
            }}
          >
            Welcome back!
          </Text>

          <Text style={{ marginTop: 20 }}>Email</Text>
          <InputField lable={"Email"} item={email} setitem={Setemail} />

          <Text style={{ marginTop: 20 }}>Password</Text>
          <InputField lable={"Password"} item={pass} setitem={Setpass} />
          <TouchableOpacity
            onPress={() => Login()}
            style={{
              height: height * 0.1,
              marginTop: height * 0.07,
              borderRadius: 14,

              backgroundColor: "black",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Login!
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 15,
              marginTop: height * 0.04,
            }}
          >
            Creat An Account{"  "}
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ color: "blue", fontWeight: "500" }}>SignUp</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
