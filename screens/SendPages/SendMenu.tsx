import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // ✅ ใช้ useFocusEffect
import { CheckBox } from "react-native-elements";
import Header from "../../component/Header";
import Button1 from "../../component/ButtonProps";
import ButtonBack from "../../component/BackButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAllSchools, initDB, insertDummyData } from "../../database/SchoolDB"; // ✅ ใช้ SQLite

const SendMenu = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<{ id: number; name: string; quantity: number; status: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ โหลดข้อมูลทุกครั้งที่เข้าสู่หน้านี้
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  useEffect(() => {
    const initializeDatabase = async () => {
      await initDB(); // ✅ ตรวจสอบตาราง
      await insertDummyData(); // ✅ เพิ่มข้อมูลถ้ายังไม่มี
      await loadData(); // ✅ โหลดข้อมูล
    };

    initializeDatabase();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const schools = await getAllSchools();
    setData(schools);
    setLoading(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#00BFFF" }}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Header title="ส่งนม" />
          <ButtonBack text="back" onPress={() => navigation.goBack()} />

          <View style={styles.container}>
            {loading ? (
              <ActivityIndicator size="large" color="#00BFFF" />
            ) : (
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Button1 text={item.name} onPress={() => navigation.navigate("ShowSchool", { id: item.id })} />
                    <CheckBox checked={item.status} disabled />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  item: {
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default SendMenu;
