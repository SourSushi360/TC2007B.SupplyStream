import React from 'react';
import { Text, View, Image, Alert, StyleSheet, Button, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import IconButton from '../../components/UI/IconButton';

type DatabaseItemProps = {
  name: string;
  role: string;
  image: ImageSourcePropType;
  onDelete: () => void;
  onEdit: () => void;
};

const DatabaseItem: React.FC<DatabaseItemProps> = ({ name, role, image, onDelete, onEdit }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image 
          source={image}
          style={styles.image}
        />
        <Text style={styles.TitleForName}>{name}</Text>
        <View style={styles.roleContainer}>
          <Text style={styles.TitleForN}>Role: </Text>
          <Text style={styles.TitleForN}>{role}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <IconButton 
            onPress={onDelete}
            color="white"
            name="trash-outline"
            buttonColor="red"
            size={24}
          >
            Delete
          </IconButton>

          <IconButton 
            onPress={onEdit}
            size={24}
            buttonColor="#4CAF50"
            color="white"
            name="create-outline"
          >
            Edit
          </IconButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function DatabaseView() {
  const handleDelete = () => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => console.log("Record deleted") }
      ],
      { cancelable: false }
    );
  };

  const handleEdit = () => {
    console.log("Edit record");
  };

  return (
    <SafeAreaView>
      <DatabaseItem 
        name="John Doe"
        role="Admin"
        image={{ uri: 'https://example.com/image.jpg' }}  // Replace with actual image source
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 80
  },
  image: {
    width: 232,
    height: 232,
    borderRadius: 116
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
  },
  TitleForN: {
    fontSize: 17,
    marginTop: 10,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  TitleForName: {
    fontSize: 30,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginTop: 50
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  }
});
