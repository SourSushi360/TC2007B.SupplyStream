import React from 'react';
import { Text, View, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import images from '../../constants/images';
import CustomButton from '../../components/CustomButton';

type RootStackParamList = {
  index: undefined;
};

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
      <View style={{ alignItems: 'center', marginTop: 80 }}>
        <Image 
          source={images.person}
          style={{ width: 232, height: 232, borderRadius: 116 }}
        />
        <Text style={{ marginTop: 7, fontSize: 30, fontFamily: 'PBold' }}>Fulanito de Tal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
          <Text style={{ fontSize: 20, fontFamily: 'PSemiBold' }}>Rol:</Text>
          <Text style={{ marginLeft: 2, fontSize: 20, fontFamily: 'PLight' }}>Administración</Text>
        </View>
        <CustomButton 
          title="Eliminar Cuenta"
          handlePress={handleDeleteAccount}
          containerStyles={{ marginTop: 12, width: 200 }}
          color='bg-red'
        />
        <CustomButton 
          title="Cerrar Sesión"
          handlePress={handleLogout}
          containerStyles={{ marginTop: 12, width: 200 }}
          color='bg-red'
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

// export default function Tab() {
//   return (
//     <View style={styles.container}>
//       <Text>Tab [Home|d]</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


