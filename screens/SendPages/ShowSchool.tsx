import {
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../component/Header";
import ButtonBack from "../../component/BackButton";
import { getSchoolById, updateSchoolStatus } from "../../database/SchoolDB";
import Map from "../../component/ShowSchoolMap";

const ShowSchool = ({ navigation, route }: { navigation: any; route: any }) => {
  const { id } = route.params;
  const [item, setItem] = useState<any>(null);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadSchool();
    }, [])
  );

  useEffect(() => {
    loadSchool();
  }, []);

  const loadSchool = async () => {
    const school = await getSchoolById(id);
    if (school) {
      setItem(school);
      setStatus(school.status === 1);
    }
  };

  const handleConfirm = async () => {
    if (!item) return;
    setLoading(true);
    const success = await updateSchoolStatus(item.id, true); // ✅ อัปเดตค่าเป็น true
    setLoading(false);
    if (success) {
      setStatus(true);
      Alert.alert("✅ สำเร็จ", "การส่งได้รับการยืนยันแล้ว!");
    } else {
      Alert.alert("❌ ผิดพลาด", "ไม่สามารถอัปเดตข้อมูลได้");
    }
  };

  if (!item) return <ActivityIndicator size="large" color="#00BFFF" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.statusbar}>
        <Header title={item.name} />
        <View
          style={{ flex: 0, backgroundColor: "#ffff", flexDirection: "row" }}
        >
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
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              flex: 1,
            }}
          >
            {!status ? (
              loading ? (
                <ActivityIndicator size="large" color="#00BFFF" />
              ) : (
                <TouchableOpacity onPress={handleConfirm} style={styles.button}>
                  <Text style={styles.buttonText}>ยืนยันการส่ง</Text>
                </TouchableOpacity>
              )
            ) : (
              <Text style={styles.confirmedText}>ส่งแล้ว</Text>
            )}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              📞 เบอร์ติดต่อ: {item.phoneNumber}
            </Text>
            <Text style={styles.infoText}>📦 จำนวน: {item.quantity} ซอง</Text>
          </View>

          <View style={{ flex: 1, width: "100%", height: 300 }}>
            {item.googlemap ? (
              <Map googlemap={item.googlemap} />
            ) : (
              <Text>📍 ไม่มีพิกัด</Text>
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
    backgroundColor: "#ffff",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  statusbar: {
    flex: 1,
    backgroundColor: "#00BFFF",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mapContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
  },
  mapText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mapLink: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  confirmedText: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
    marginLeft: "auto",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: "#00BFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShowSchool;
