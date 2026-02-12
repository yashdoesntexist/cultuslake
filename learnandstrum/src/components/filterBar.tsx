import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "../styles/color";

type FilterBarProps = {
  selected: string;
  onSelect: (filter: string) => void;
};

const filters = ["All", "Guitar", "Piano", "Drums"];

export default function FilterBar({ selected, onSelect }: FilterBarProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {filters.map((filter) => {
          const isSelected = filter === selected;

          return (
            <TouchableOpacity
              key={filter}
              onPress={() => onSelect(filter)}
              style={[styles.filterButton, isSelected && styles.activeButton]}
            >
              <Text
                style={[styles.filterText, isSelected && styles.activeText]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#333",
    alignSelf: "flex-start",
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: "#ccc",
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
});
