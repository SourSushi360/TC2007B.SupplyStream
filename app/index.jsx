import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pbold">Index</Text>
      <StatusBar style="auto" />
    </View>
  );
}