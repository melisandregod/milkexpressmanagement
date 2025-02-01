import React from "react";
import { View, StyleSheet, Alert, StatusBar } from "react-native";
import Header from "../../component/Header";
import Button1 from "../../component/ButtonProps";
import ButtonBack from "../../component/BackButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const EditReceiveMenu = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#00BFFF" }}>
        <View style={{ flex: 1, backgroundColor: "#ffff" }}>
          <Header title="เเก้ไขรับนม" />
          <ButtonBack
            text="back"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                alert("No screen to go back to!");
              }
            }}
          />

          <View style={styles.container}>
            <Button1
              text="โรงน้ำเเข็ง"
              onPress={() => navigation.navigate("EditIce")}
            />
            <Button1
              text="โรงนม"
              onPress={() => navigation.navigate("EditMilk")}
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

export default EditReceiveMenu;
