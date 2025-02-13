import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../component/Header";
import ButtonBack from "../../component/BackButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  getAllSchools,
  initDB,
  insertDummyData,
  deleteSchool,
  updateSchoolStatus,
} from "../../database/SchoolDB"; // ✅ เพิ่ม updateSchoolStatus
import Button1 from "../../component/ButtonProps";

const EditSchool = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  useEffect(() => {
    const initializeDatabase = async () => {
      await initDB();
      await insertDummyData();
      await loadData();
    };

    initializeDatabase();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const schools = await getAllSchools();
    setData(schools);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    Alert.alert("ยืนยันการลบ", "คุณต้องการลบโรงเรียนนี้ใช่หรือไม่?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ลบ",
        style: "destructive",
        onPress: async () => {
          await deleteSchool(id);
          loadData();
        },
      },
    ]);
  };

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    await updateSchoolStatus(id, !currentStatus);
    loadData();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#00BFFF" }}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Header title="แก้ไขส่งนม" />
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
            {loading ? (
              <ActivityIndicator size="large" color="#00BFFF" />
            ) : (
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    {/* <Button1
                      text={item.name}
                      onPress={() =>
                        navigation.navigate("ShowSchool", { id: item.id })
                      }
                    /> */}
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("ShowSchool", { id: item.id })
                      }>
                      <Text style={{fontSize:20,fontWeight:"bold"}}>{item.name}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                      <CheckBox
                        style={{}}
                        checked={item.status === 1}
                        onPress={() => toggleStatus(item.id, item.status === 1)}
                      />
                      <TouchableOpacity
                        onPress={() => handleDelete(item.id)}
                        style={styles.deleteButton}
                      >
                        <Text style={styles.deleteText}>❌</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              paddingVertical: 50,
            }}
          >
            <Button1
              text="เพิ่มข้อมูล"
              onPress={() => navigation.navigate("AddSchool")}
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
    backgroundColor: "#ffff",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,

    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginRight: 35,
    marginLeft: 15,
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default EditSchool;
