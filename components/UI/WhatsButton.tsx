import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Button, Linking, StyleSheet } from 'react-native';
import IconButton from './IconButton';

export default function MyButton() {
  const openWhatsApp = () => {
    const phoneNumber = '3322755227'; // Número de WhatsApp
    const url = `whatsapp://send?phone=+52${phoneNumber}`; // Asegúrate de agregar el código de país (en este caso +52 para México)

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          alert('WhatsApp is not installed on this device');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <IconButton
        onPress={openWhatsApp}
        name="logo-whatsapp"
        size={24}
        color="green"
        buttonColor="skyblue"
      >Don't have an account? or password forgotten?
        </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
  },
});
