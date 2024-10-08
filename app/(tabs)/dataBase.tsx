import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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

const Item = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const ItemListScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);

  useEffect(() => {
    const filtered = DATA.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenar los datos filtrados alfabéticamente
    const sortedData = filtered.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    setFilteredData(sortedData);
  }, [searchTerm]);

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      onPress={() => Alert.alert('Seleccionado', item.title)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default ItemListScreen;

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
