import { FlatList, StyleSheet, Text, View } from "react-native";
import NoteItem from "./NoteItem";

export default function NoteList({ notes, onToggle, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Список нотаток</Text>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>Нотаток поки немає. Додайте першу!</Text>
      ) : (
        <>
          <Text style={styles.hint}>
            Торкніться нотатки, щоб позначити її виконаною.
          </Text>
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <NoteItem note={item} onToggle={onToggle} onDelete={onDelete} />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },
  hint: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 12,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
});
