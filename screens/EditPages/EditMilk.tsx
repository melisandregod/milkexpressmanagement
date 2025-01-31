import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import Header from "../../component/Header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../component/BackButton";
import { getMilkFactory, updateMilkFactory, MilkFactory } from "../../database/MilkDB"; 

const EditMilk = ({ navigation }: { navigation: any }) => {
  const [factory, setFactory] = useState<MilkFactory | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); 

  useEffect(() => {
    loadFactory();
  }, []);

  const loadFactory = async () => {
    setLoading(true);
    const data = await getMilkFactory();
    if (data) {
      console.log("✅ ดึงข้อมูลโรงนมสำเร็จ:", data);
      setFactory(data);
    } else {
      console.error("❌ ไม่พบข้อมูลโรงนมในฐานข้อมูล");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!factory || !factory.id || !factory.name || !factory.phoneNumber || !factory.quantity || !factory.googlemap) {
      Alert.alert("❌ ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setSaving(true); 
    const success = await updateMilkFactory(factory.id, factory.name, factory.phoneNumber, factory.quantity, factory.googlemap);
    setSaving(false);

    if (success) {
      Alert.alert("✅ สำเร็จ", "ข้อมูลโรงนมถูกบันทึกเรียบร้อย!");
      loadFactory(); 
    } else {
      Alert.alert("❌ ผิดพลาด", "ไม่สามารถอัปเดตข้อมูลได้");
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#00BFFF" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header title="แก้ไขโรงนม" />
        <ButtonBack text="ย้อนกลับ" onPress={() => navigation.goBack()} />

        <Text>ชื่อโรงนม:</Text>
        <TextInput
          style={styles.input}
          value={factory?.name || ""}
          onChangeText={(text) => setFactory((prev) => (prev ? { ...prev, name: text } : prev))}
        />

        <Text>เบอร์ติดต่อ:</Text>
        <TextInput
          style={styles.input}
          value={factory?.phoneNumber || ""}
          onChangeText={(text) => setFactory((prev) => (prev ? { ...prev, phoneNumber: text } : prev))}
          keyboardType="phone-pad"
        />

        <Text>จำนวน:</Text>
        <TextInput
          style={styles.input}
          value={factory?.quantity || ""}
          onChangeText={(text) => setFactory((prev) => (prev ? { ...prev, quantity: text } : prev))}
        />

        <Text>Google Map:</Text>
        <TextInput
          style={styles.input}
          value={factory?.googlemap || ""}
          onChangeText={(text) => setFactory((prev) => (prev ? { ...prev, googlemap: text } : prev))}
        />

        {saving ? (
          <ActivityIndicator size="large" color="#00BFFF" /> // ✅ แสดง Indicator ระหว่างบันทึก
        ) : (
          <Button title="บันทึก" onPress={handleSave} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default EditMilk;
