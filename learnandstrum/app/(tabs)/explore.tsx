import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { GlobalStyles } from "../../src/styles/globalStyle";
import YouTubeFunc from "../../src/components/youtubeFunc";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <Text style={GlobalStyles.heading}>Learn</Text>

      <YouTubeFunc />
    </SafeAreaView>
  );
}
