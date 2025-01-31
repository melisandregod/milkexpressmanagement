import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import Header from "../../component/Header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { addSchool } from "../../database/SchoolDB";

const AddSchool = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [googleMap, setGoogleMap] = useState("");

  const handleAddSchool = async () => {
    if (!name || !phoneNumber || !quantity || !googleMap) {
      Alert.alert("❌ ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    await addSchool(name, phoneNumber, parseInt(quantity), googleMap);
    Alert.alert("✅ สำเร็จ", "เพิ่มข้อมูลเรียบร้อย!");
    navigation.goBack(); 
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#00BFFF" }}>
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
          <Header title="เพิ่มข้อมูล" />

          <View style={styles.container}>
            <Text>โรงเรียน:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text>เบอร์ติดต่อ:</Text>
            <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

            <Text>จำนวนนมที่ส่ง:</Text>
            <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" />

            <Text>Google Map:</Text>
            <TextInput style={styles.input} value={googleMap} onChangeText={setGoogleMap} />

            <Button title="ยืนยัน" onPress={handleAddSchool} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AddSchool;
