import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../../src/styles/globalStyle";
import { Colors } from "../../src/styles/color";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <Text style={GlobalStyles.heading}>Learn</Text>
    </SafeAreaView>
  );
}
