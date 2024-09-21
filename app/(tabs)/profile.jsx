import { Text, View, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';

const Profile = () => {
  const navigation = useNavigation();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar Cuenta",
      "¿Estás seguro de que deseas eliminar tu cuenta?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Eliminar", onPress: () => console.log("Cuenta eliminada") } // handle deletion when connected to db
      ],
      { cancelable: false }
    );
  };

  const handleLogout = () => {
    navigation.navigate('index');
  };

  return (
    <SafeAreaView>
      <View className="items-center mt-[80]">
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
          title="Eliminar Cuenta"
          handlePress={handleDeleteAccount}
          containerStyles="mt-12 w-[200px]"
          color='bg-red'
        />
        <CustomButton 
          title="Cerrar Sesión"
          handlePress={handleLogout}
          containerStyles="mt-12 w-[200px]"
          color='bg-red'
        />
      </View>
    </SafeAreaView>
  )
}

export default Profile