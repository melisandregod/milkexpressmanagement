import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

interface ButtonProps {
  text: string; // ข้อความบนปุ่ม
  onPress: (event: GestureResponderEvent) => void; // ฟังก์ชันที่เรียกเมื่อปุ่มถูกกด
}

const ButtonBack = ({ text, onPress }: ButtonProps) => {
  return (
   <View style = {styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <FontAwesome6 name="arrow-left-long" color="white"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal : 10

    },
  button: {
    backgroundColor: "#00BFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 'auto' 
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ButtonBack;
