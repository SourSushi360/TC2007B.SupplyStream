import { db } from '@/constants/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  location: string;
}

export default function ItemListSearch() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<InventoryItem[] | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // ni idea si useCallback es necesario, pero estaba en el ejemplo de RefreshControl
  const onRefresh = useCallback(async () => {
    setData(null);
    const snapshot = await getDocs(collection(db, 'inventory'));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    // @ts-ignore
    setData(data);
  }, []);

  // ?. significa "si existe, ejecuta lo siguiente"
  // ?? significa "si es null, usa lo siguiente"
  // en este caso, si data es null, filteredData es []
  const filteredData = data
    ?.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    ?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  useEffect(() => {
    onRefresh()
  }, []);

  const Item = ({ item }: {item: InventoryItem}) => {
    const selected = item.id === selectedItemId;
    return <Pressable
      onPress={() => setSelectedItemId(selected ? null : item.id)}
      style={styles.item}
    >
      <Text style={styles.title}>{item.name}</Text>
      { selected &&
        <>
          <Text>Cantidad: {item.quantity}</Text>
          <Text>Ubicación: {item.location}</Text>
        </>
      }
    </Pressable>
  }

  return <SafeAreaView style={styles.container}>
    <TextInput
      style={styles.searchInput}
      placeholder="Buscar..."
      value={query}
      onChangeText={setQuery}
    />
    { data === null ? <Text>Cargando... </Text> :
      <FlatList
        data={filteredData}
        refreshControl={
          <RefreshControl
            refreshing={data === null}
            onRefresh={onRefresh}
          />
        }
        // item item item item
        renderItem={item => <Item item={item.item} />}
        keyExtractor={item => item.id}
      />
    }
  </SafeAreaView>
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
