import { StyleSheet } from "react-native";
import { Colors } from "./color";

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000", // temporary for testing
    padding: 16,
  },
  heading: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 12,
  },

  // === Floating Button (FAB) ===
  fab: {
    position: "absolute",
    bottom: 20, // adjust depending on tab bar height
    right: 20,
    alignSelf: "flex-end",

    zIndex: 10,      // iOS
    elevation: 10,

    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "600",
  },
});
