import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "../component/Header";
import 'react-native-gesture-handler';
import Menu from "./Menu";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";



export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaProvider>
    <SafeAreaView style ={styles.statusbar}>
      <View style= {styles.container}>
      <Header title="รายการส่งนมให้โรงเรียน"></Header>
      <Menu navigation={navigation}/>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  statusbar:{
    flex: 1,
    backgroundColor: "#00BFFF"
    
  }
});
