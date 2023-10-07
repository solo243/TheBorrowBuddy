import { View, Text, TextInput } from "react-native";
import React from "react";

const InputField = ({ lable, setitem, item }) => {
  return (
    <View>
      <TextInput
        value={item}
        onChangeText={(text) => setitem(text)}
        placeholder={lable}
        //   secureTextEntry={passvisi}
        style={{
          paddingStart: 15,
          height: 55,
          borderRadius: 13,
          fontWeight: "500",
          color: "black",
          marginTop: 10,
          backgroundColor: "lightgrey",
          // borderColor: iswrong ? 'red' : null,
          // borderWidth: iswrong ? 2 : null,
        }}
      />
    </View>
  );
};

export default InputField;
