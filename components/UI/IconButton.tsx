import React from 'react';
import { Pressable, StyleSheet, ViewStyle, StyleProp, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  onPress: () => void;
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
  children?: React.ReactNode;
  buttonColor?: string;
  marginTop?: number;
  disableded?: boolean;
  colorText?: string;
  letterSize?: number;
  flexDirections?: string;
}

export default function IconButton({ onPress, name, size, color, children, buttonColor, marginTop, disableded, colorText, letterSize ,flexDirections }: IconButtonProps) {



  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => [
        styles.buttonContainer,
        { backgroundColor: buttonColor, marginTop: marginTop || 20 , flexDirection: flexDirections || 'row'},
        pressed && styles.pressed, 
      ]}
      disabled={disableded}
    >

      <Ionicons name={name} size={size} color={color} />
      <Text style = {[styles.ButtonTextStyle, {color: colorText || 'white', fontSize: letterSize || 20}]}>{children}</Text>
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 8,
    borderRadius: 24,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.25, // Shadow for iOS
    shadowRadius: 3.84, // Shadow for iOS
    elevation: 5, // Shadow for Android
  },
	pressed: {
		opacity: 0.6,
	},
  ButtonTextStyle: {
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight : 'bold',
    marginLeft: 10,
    color: 'white',
  },
  background: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
  colorWhiteLetters: {
    color: 'white'
  }
});

{/* style={styles.background} */}
{/* <Text>Last 7 Days</Text>
<Text style={styles.title}>Start Adding some Expenses!!</Text> */}
