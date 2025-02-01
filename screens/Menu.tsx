import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button1 from "../component/ButtonProps";
import { Button } from "react-native-paper";

const Menu = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Button1
        text="รับนม"
        onPress={() => navigation.navigate("ReceiveMenu")} 
      />
      <Button1
        text="ส่งนม"
        onPress={() => navigation.navigate("SendMenu")}
      />
      <Button1
        text="เเก้ไขข้อมูล"
        onPress={() => navigation.navigate("EditMenu")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    paddingVertical: 180,
  },
});

export default Menu;
