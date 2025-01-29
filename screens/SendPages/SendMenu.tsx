import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";
import axios from "axios";
import { CheckBox } from "react-native-elements";
import Header from "../../component/Header";
import Button1 from "../../component/ButtonProps";
import ButtonBack from "../../component/BackButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SendMenu = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<{ id: number; name: string; quantity: number; status: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.sheety.co/392bcea488b7b654d987cdaa7ee93437/schoolDb/db")
      .then((response) => {
        setData(response.data.db);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
                    <Button1 text={item.name} onPress={() => navigation.navigate("ShowSchool",{item})} />
                    <CheckBox
                      checked={item.status}
                      disabled 
                    />
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
    marginVertical: 10, // เพิ่มช่องว่างระหว่างปุ่ม
    alignItems: "center",
    flexDirection: "row",
  },
  
});

export default SendMenu;
