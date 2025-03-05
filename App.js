import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { addDoc, collection, firestore, ITEMS, deleteDoc, onSnapshot, doc } from './firebase/Config';

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, ITEMS), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, text: doc.data().text })));
    });

    return () => unsubscribe();
  }, []);

  const save = async () => {
    if (newItem.trim() === "") return;
    try {
      await addDoc(collection(firestore, ITEMS), { text: newItem });
      setNewItem("");
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, ITEMS, id));
    } catch (error) {
      console.log("ERROR deleting: " + error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>

      <TextInput
        label="New item"
        value={newItem}
        onChangeText={setNewItem}
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={save} style={styles.button}>Add Item</Button>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
            <Button mode="text" onPress={() => removeItem(item.id)} color="red">Delete</Button>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: '100%',
    marginBottom: 10
  },
  button: {
    marginBottom: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  }
});
