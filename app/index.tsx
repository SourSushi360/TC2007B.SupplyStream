import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, ScrollView, ImageSourcePropType } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/constants/firebase';
import { useRouter } from 'expo-router';

import images from '@/constants/images';
import MyButton from '@/components/UI/WhatsButton';



export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/camera');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View >
          <Image 
            source={images.globe as ImageSourcePropType}
            className="w-[234] h-[234]"
            resizeMode='contain'
            style={{ marginLeft: 70 }}           
          />
      <Text style={styles.titleSupply}>SupplyStream</Text>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} disabled={!password || !email}/>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={{marginTop: 20}}>
        <MyButton/>
      </View>
       </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  titleSupply: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 110,
    textAlign: 'center',
    color: '#0201ba',
    marginTop:20,
  },
});