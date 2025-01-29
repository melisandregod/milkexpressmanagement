import {
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "../../component/Header";
import "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import ButtonBack from "../../component/BackButton";
import axios from "axios";

const ShowSchool = ({ navigation, route }: { navigation: any; route: any }) => {
  const { item } = route.params;
  const [status, setStatus] = useState(item.status); // ใช้ State เก็บค่า Status ปัจจุบัน
  const [loading, setLoading] = useState(false); // เพิ่ม State สำหรับ Loading

  // ฟังก์ชันอัปเดต Status เป็น true
  const handleConfirm = () => {
    setLoading(true); // เริ่ม Loading
    axios
      .put(
        `https://api.sheety.co/392bcea488b7b654d987cdaa7ee93437/schoolDb/db/${item.id}`,
        {
          db: {
            id: item.id,
            name: item.name,
            phoneNumber: item.phoneNumber,
            quantity: item.quantity,
            googlemap: item.googlemap,
            status: true, // เปลี่ยนเป็น true
          },
        }
      )
      .then(() => {
        setStatus(true);
        Alert.alert("สำเร็จ", "การส่งได้รับการยืนยันแล้ว!");
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("ผิดพลาด", "ไม่สามารถอัปเดตข้อมูลได้");
      })
      .finally(() => {
        setLoading(false); // หยุด Loading ไม่ว่า success หรือ error
      });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.statusbar}>
        <Header title={item.name} />
        <View style={{flex: 0,backgroundColor: "#ffff"}}>
          <ButtonBack text="back" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              📞 เบอร์ติดต่อ: {item.phoneNumber}
            </Text>
            <Text style={styles.infoText}>📦 จำนวน: {item.quantity} ซอง</Text>
          </View>

          {/* กล่อง Google Map */}
          <View style={styles.mapContainer}>
            <Text style={styles.mapText}>Google Map</Text>
            <Text
              style={styles.mapLink}
              onPress={() => Linking.openURL(item.googlemap)}
            >
              เปิดแผนที่
            </Text>
          </View>

          {/* แสดงปุ่มหรือ Loading Indicator */}
          {!status ? (
            loading ? ( // ถ้า loading เป็น true ให้แสดง ActivityIndicator
              <ActivityIndicator size="large" color="#00BFFF" />
            ) : (
              <TouchableOpacity onPress={handleConfirm} style={styles.button}>
                <Text style={styles.buttonText}>ยืนยันการส่ง</Text>
              </TouchableOpacity>
            )
          ) : (
            <Text style={styles.confirmedText}>✅ ส่งแล้ว</Text>
          )}
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
  },
  button: {
    backgroundColor: "#00BFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ShowSchool;
