import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type Session = {
  id?: string;
  instrument: string;
  duration: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (session: Session) => void;
  existingSession?: Session | null;
};

export default function PracticeForm({
  visible,
  onClose,
  onSave,
  existingSession,
}: Props) {
  const [instrument, setInstrument] = useState("Guitar");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (existingSession) {
      setInstrument(existingSession.instrument);
      setDuration(existingSession.duration);
    } else {
      setInstrument("Guitar");
      setDuration("");
    }
  }, [existingSession]);

  const handleSave = () => {
    if (!duration) return;

    const sessionData = existingSession
      ? { ...existingSession, instrument, duration }
      : { instrument, duration };

    onSave(sessionData);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {existingSession ? "Edit Session" : "Log Practice Session"}
          </Text>

          <Picker
            selectedValue={instrument}
            onValueChange={(value) => setInstrument(value)}
            style={{ color: "white" }}
          >
            <Picker.Item label="Guitar" value="Guitar" />
            <Picker.Item label="Piano" value="Piano" />
            <Picker.Item label="Drums" value="Drums" />
            <Picker.Item label="Singing" value="Singing" />
          </Picker>

          <TextInput
            placeholder="Time Practiced (in MINS)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            style={styles.input}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.canBtn} onPress={onClose}>
            <Text style={{ color: "gray" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: "#252424",
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#444",
    color: "white",
    padding: 1,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#4F46E5",
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  canBtn: {
    paddingTop: 20,
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
  },
});
