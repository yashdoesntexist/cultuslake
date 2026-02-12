import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../../src/styles/globalStyle";
import PracticeForm from "../../src/components/PracticeForm";

type Session = {
  id: string;
  instrument: string;
  duration: string;
  date: string;
};

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const stored = await AsyncStorage.getItem("practice_sessions");
    if (stored) setSessions(JSON.parse(stored));
  };

  const saveSessions = async (data: Session[]) => {
    await AsyncStorage.setItem("practice_sessions", JSON.stringify(data));
  };

  const addSession = (session: any) => {
    const newSession: Session = {
      id: Date.now().toString(),
      instrument: session.instrument,
      duration: session.duration,
      date: new Date().toISOString(),
    };

    const updated = [newSession, ...sessions];
    setSessions(updated);
    saveSessions(updated);
  };

  const updateSession = (updatedSession: Session) => {
    const updated = sessions.map((s) =>
      s.id === updatedSession.id ? updatedSession : s,
    );
    setSessions(updated);
    saveSessions(updated);
  };

  const deleteSession = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    saveSessions(updated);
  };

  const groupSessionsByDate = () => {
    const groups: { [key: string]: Session[] } = {};

    sessions.forEach((session) => {
      const sessionDate = new Date(session.date);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      let label = sessionDate.toDateString();

      if (sessionDate.toDateString() === today.toDateString()) {
        label = "Today";
      } else if (sessionDate.toDateString() === yesterday.toDateString()) {
        label = "Yesterday";
      }

      if (!groups[label]) groups[label] = [];
      groups[label].push(session);
    });

    return Object.keys(groups).map((key) => ({
      title: key,
      data: groups[key],
    }));
  };

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <Text style={GlobalStyles.heading}>Home</Text>

      <SectionList
        sections={groupSessionsByDate()}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.instrument}>{item.instrument}</Text>
            <Text style={styles.details}>{item.duration} minutes</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => {
                  setEditingSession(item);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteSession(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#888", marginTop: 20 }}>
            No practice sessions yet.
          </Text>
        }
      />

      <TouchableOpacity
        style={GlobalStyles.fab}
        onPress={() => {
          setEditingSession(null);
          setModalVisible(true);
        }}
      >
        <Text style={GlobalStyles.fabText}>+</Text>
      </TouchableOpacity>

      <PracticeForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        existingSession={editingSession}
        onSave={(data) => {
          if (editingSession) {
            updateSession(data as Session);
          } else {
            addSession(data);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    color: "#fff",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#272727",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  instrument: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    color: "#aaa",
    marginTop: 10,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  edit: {
    color: "#4F46E5",
    fontWeight: "bold",
    marginTop: 12,
  },
  delete: {
    color: "#FF4444",
    fontWeight: "bold",
    marginTop: 12,
  },
});
