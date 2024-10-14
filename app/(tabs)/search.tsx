import { db } from '@/constants/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Simulación de una base de datos
const DATA = [
  { id: '1', title: 'audifono' },
  { id: '2', title: 'cesta' },
  { id: '3', title: 'refri 4' },
  { id: '4', title: 'gomas 2' },
  { id: '5', title: 'camisa 5' },
];

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  location: string;
}

const ItemListScreen = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<InventoryItem[] | null>(null);

  const filteredData = data
    ?.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    ?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  useEffect(() => {
    getDocs(collection(db, 'inventory'))
      .then(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // @ts-ignore
        setData(data);
      })
  }, []);

  if (data === null) {
    return <Text>Cargando...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => Alert.alert('Seleccionado', item.name)}
            style={styles.item}
          >
            <Text style={styles.title}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 16,
  },
});
