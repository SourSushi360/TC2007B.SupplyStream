import { Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';

const Profile = () => {
  return (
    <SafeAreaView>
      <View className="items-center mt-8">
        <Image 
          source={images.person}
          className="w-[232px] h-[232px] rounded-full"
        />
        <Text className="mt-7 text-3xl font-pbold">Fulanito de Tal</Text>
        <View className="flex-row items-center justify-center mt-3">
          <Text className="text-xl font-psemibold">Rol:</Text>
          <Text className="ml-2 text-xl font-plight">Administración</Text>
        </View>
        <CustomButton 
          title="Cerrar Sesión"
          handlePress={() => {}}
          containerStyles="mt-12 w-[200px]"
          color='bg-red'
        />
        <CustomButton 
          title="Eliminar Cuenta"
          handlePress={() => {}}
          containerStyles="mt-12 w-[200px]"
          color='bg-red'
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile