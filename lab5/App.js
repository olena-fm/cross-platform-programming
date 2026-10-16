import { useState } from "react";
import { Alert, Platform, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function Notes() {
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState([]);

  // Повертає true, якщо нотатку додано, і false, якщо текст порожній
  function addNote(text) {
    const trimmedText = text.trim();

    if (trimmedText === "") {
      Alert.alert("Помилка", "Будь ласка, введіть текст нотатки.");
      return false;
    }

    const newNote = {
      id: Date.now().toString(),
      text: trimmedText,
      done: false,
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);
    Alert.alert("Успіх", "Нотатку успішно додано.");
    return true;
  }

  function toggleNote(id) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id ? { ...note, done: !note.done } : note
      )
    );
  }

  function deleteNote(id) {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
    Alert.alert("Видалення", "Нотатку видалено.");
  }

  const doneCount = notes.filter((note) => note.done).length;

  // Відступ зверху: безпечна зона пристрою, але не менше 50 на iOS,
  // щоб заголовок не потрапляв під смугу стану (час, Wi-Fi, батарея)
  const topPadding = Math.max(insets.top, Platform.OS === "ios" ? 50 : 0);

  return (
    <View style={[styles.screen, { paddingTop: topPadding }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Header total={notes.length} done={doneCount} />
        <NoteForm onAdd={addNote} />
        <NoteList notes={notes} onToggle={toggleNote} onDelete={deleteNote} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Notes />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eff6ff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
