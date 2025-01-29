import React from "react";
import { View, StyleSheet, Alert ,Text} from "react-native";
import Header from "../component/Header";
import Button1 from "../component/ButtonProps";
import ButtonBack from "../component/BackButton";
import { SafeAreaView ,SafeAreaProvider} from "react-native-safe-area-context";

const EditMenu = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1,backgroundColor: "#00BFFF" }}>
        <View style={{flex:1 ,backgroundColor:"#ffff"}}>
        <Header title="เเก้ไขข้อมูล" />
        <ButtonBack text="back" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <Button1 text="เเก้ไขรับนม" onPress={() => navigation.goBack()}/>
          <Button1 text="เเก้ไขส่งนม" onPress={() => navigation.goBack()}/>
        </View>
        </View>
      </SafeAreaView>
      </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 180,
    gap: 20, // ระยะห่างระหว่างปุ่ม
    backgroundColor: "#ffff",
  },
});

export default EditMenu;
