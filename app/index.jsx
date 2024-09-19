import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
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
            className="w-[234] h-[234]"
            resizeMode='contain'
            marginBottom={-43}

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
            placeholder={"Enter your email"} // Añadido aquí

          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="password"
            placeholder={"Enter your password"} 
          />
          <CustomButton 
            title="Login"
            handlePress={() => router.push('/camera')}
            containerStyles="mt-12 w-[150px]"
            color='bg-gray'
          />
        </View>
      </ScrollView>
      <StatusBar style='dark' />
    </SafeAreaView>
  );
}