import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  ActivityIndicator,
} from "react-native";
import Header from "../../component/Header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../component/BackButton";
import {
  getIceFactory,
  initIceDB,
  insertDummyIceFactory,
} from "../../database/IceDB";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const ShowIce = ({ navigation }: { navigation: any }) => {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFactory();
  }, []);

  const loadFactory = async () => {
    await initIceDB();
    await insertDummyIceFactory();
    const factory = await getIceFactory();
    if (factory) setItem(factory);
    setLoading(false);
  };

  if (loading) return <ActivityIndicator size="large" color="#00BFFF" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.statusbar}>
        <Header title={item?.name ?? "ไม่พบข้อมูล"} />
        <View style={{ flex: 0, backgroundColor: "#ffff" }}>
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
        </View>
        <View style={styles.container}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              📞 เบอร์ติดต่อ: {item?.phoneNumber ?? "ไม่มีข้อมูล"}
            </Text>
            <Text style={styles.infoText}>
              📦 ปริมาณ: {item?.quantity ?? "ไม่มีข้อมูล"} กิโล
            </Text>
          </View>

          {/* Google Map */}
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: 13.7563, // ✅ ตั้งค่าพิกัดเอง (เปลี่ยนได้)
                longitude: 100.5018,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ latitude: 13.7563, longitude: 100.5018 }}
                title="โรงงานน้ำแข็ง"
                description="ตำแหน่งตัวอย่าง"
              />
            </MapView>
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
    width: "100%",
    height: 600, // ✅ กำหนดความสูงแผนที่
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default ShowIce;
