import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { GlobalStyles } from "../../src/styles/globalStyle";
import { Colors } from "../../src/styles/color";

const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
console.log("API KEY:", API_KEY);
export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [videos, setVideos] = useState([]);

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <Text style={GlobalStyles.heading}>Home</Text>

      <TouchableOpacity style={GlobalStyles.fab}>
        <Text style={GlobalStyles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
