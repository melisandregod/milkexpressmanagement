import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

interface ButtonProps {
  text: string; // ข้อความบนปุ่ม
  onPress: (event: GestureResponderEvent) => void; // ฟังก์ชันที่เรียกเมื่อปุ่มถูกกด
}

const Button1 = ({ text, onPress }: ButtonProps) => {
  return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
  button: {
    backgroundColor: "#00BFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Button1;
