import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import FormField from '../components/FormField';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';

export default function App() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle= {{ height: '100%' }}>
        <View className="w-full h-full justify-center items-center px-4">
          <Image 
            source={images.globe}
            className="w-[168] h-[174]"
            resizeMode='contain'
          />
          <View className="relative mt-28">
            <Text className="text-4xl font-pbold text-center">SupplyStream</Text>
          </View>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="password"
          />
          <CustomButton 
            title="Login"
            handlePress={() => {}}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}