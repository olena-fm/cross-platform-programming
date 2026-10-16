import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NoteItem({ note, onToggle, onDelete }) {
  return (
    <View style={[styles.item, note.done && styles.itemDone]}>
      <TouchableOpacity
        style={styles.textArea}
        onPress={() => onToggle(note.id)}
      >
        <Text style={[styles.text, note.done && styles.textDone]}>
          {note.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(note.id)}
      >
        <Text style={styles.deleteButtonText}>Видалити</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#e0f2fe",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemDone: {
    backgroundColor: "#bbf7d0",
  },
  textArea: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "#0f172a",
  },
  textDone: {
    color: "#166534",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
