import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "../../component/Header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../component/BackButton";
import {
  getMilkFactory,
  updateMilkFactory,
  MilkFactory,
} from "../../database/MilkDB";
import Button1 from "../../component/ButtonProps";

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
    if (
      !factory ||
      !factory.id ||
      !factory.name ||
      !factory.phoneNumber ||
      !factory.quantity ||
      !factory.googlemap
    ) {
      Alert.alert("❌ ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setSaving(true);
    const success = await updateMilkFactory(
      factory.id,
      factory.name,
      factory.phoneNumber,
      factory.quantity,
      factory.googlemap
    );
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
        <View style={{ flex : 1, backgroundColor:"#ffff"}}>
        <Header title="แก้ไขโรงนม" />
        <ButtonBack
          text="ย้อนกลับ"
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              alert("No screen to go back to!");
            }
          }}
        />
        <View style={styles.container1}>
        <Text style={{ marginRight: 270 }}>ชื่อโรงนม:</Text>
        <TextInput
          style={styles.input}
          value={factory?.name || ""}
          onChangeText={(text) =>
            setFactory((prev) => (prev ? { ...prev, name: text } : prev))
          }
        />

        <Text style={{ marginRight: 270 }}>เบอร์ติดต่อ:</Text>
        <TextInput
          style={styles.input}
          value={factory?.phoneNumber || ""}
          onChangeText={(text) =>
            setFactory((prev) => (prev ? { ...prev, phoneNumber: text } : prev))
          }
          keyboardType="phone-pad"
        />

        <Text style={{ marginRight: 290 }}>จำนวน:</Text>
        <TextInput
          style={styles.input}
          value={factory?.quantity || ""}
          onChangeText={(text) =>
            setFactory((prev) => (prev ? { ...prev, quantity: text } : prev))
          }
        />

        <Text style={{ marginRight: 260 }}>Google Map:</Text>
        <TextInput
          style={styles.input}
          value={factory?.googlemap || ""}
          onChangeText={(text) =>
            setFactory((prev) => (prev ? { ...prev, googlemap: text } : prev))
          }
        />

        {saving ? (
          <ActivityIndicator size="large" color="#00BFFF" /> // ✅ แสดง Indicator ระหว่างบันทึก
        ) : (
          <Button1 text="บันทึก" onPress={handleSave} />
        )}
        </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00BFFF",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  container1: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 300,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 40,
    backgroundColor: "#f8f8f8",
  },
});

export default EditMilk;
