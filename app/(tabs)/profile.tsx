import React from 'react';
import { Text, View, Image, Alert, StyleSheet, Button, ImageSourcePropType} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

import images from '../../constants/images'; // Ensure images.person is of type ImageSourcePropType
import IconButton from '../../components/UI/IconButton';

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

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigation.navigate('index');
  };

  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', marginTop: 80 }}>
        <Image
          source={images.person as ImageSourcePropType}
          style={{ width: 232, height: 232, borderRadius: 116 }}
        />
        <Text style={styles.TitleForName}>Fulanito de Tal</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
          <Text style= {styles.TitleForN}>Rol: </Text>
          <Text style={styles.TitleForN}>Administración</Text>
        </View>
        <View style={ styles.buttonContainer }>
          <IconButton
            onPress={handleDeleteAccount}
            color='white'
            name='trash-outline'
            buttonColor='red'
            size={24}
            marginTop={40}
          >
          Eliminar Cuenta
          </IconButton>

          <IconButton
            onPress={handleLogout}
            size={24}
            buttonColor='#4CAF50'
            color='white'
            name = 'log-out-outline'
            marginTop={60}
          >
          Cerrar Sesión
          </IconButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
	buttonContainer: {
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 40
	},
	pressed: {
		opacity: 0.6,
	},
  TitleForN: {
    fontSize: 17,
    marginTop: 10,
    fontFamily: 'monospace',
    fontWeight : 'bold'
  },
  TitleForName : {
    fontSize: 30,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginTop: 50
  }
});


