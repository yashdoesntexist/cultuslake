import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { useState } from "react";
import { Colors } from "../../src/styles/color";

export default function FilterBar() {
  const [selected, setSelected] = useState("All");

  const filters = ["All", "Guitar", "Drums", "Piano", "Singing"];

  return (
    <View style={{ height: 50 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, alignItems: "center" }}
      >
        {filters.map((filter) => {
          const isSelected = filter === selected;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelected(filter)}
              style={{
                backgroundColor: isSelected ? Colors.primary : "#333",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  color: isSelected ? "#fff" : "#ccc",
                  fontWeight: isSelected ? "700" : "500",
                }}
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
