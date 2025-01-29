import React from "react";
import { View, StyleSheet, Alert, StatusBar } from "react-native";
import Header from "../component/Header";
import Button1 from "../component/ButtonProps";
import ButtonBack from "../component/BackButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ReceiveMenu = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1,backgroundColor: "#00BFFF" }}>
        <View style={{flex:1 ,backgroundColor:"#ffff"}}>
        <Header title="รับนม" />
        <ButtonBack text="back" onPress={() => navigation.goBack()} />

        <View style={styles.container}>
          <Button1
            text="โรงน้ำเเข็ง"
            onPress={() => Alert.alert("คุณกดปุ่ม 'รับนม' แล้ว!")}
          />
          <Button1
            text="โรงนม"
            onPress={() => Alert.alert("คุณกดปุ่ม 'ส่งนม' แล้ว!")}
          />
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

export default ReceiveMenu;
