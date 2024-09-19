import { CameraView as ExpoCameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

const CameraView = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center pb-2">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ExpoCameraView className="flex-1" style={{ facing }}>
        <View className="flex-1 flex-row bg-transparent m-16">
          <TouchableOpacity className="flex-1 self-end items-center">
            <Text className="text-2xl font-bold text-white">Placeholder</Text>
          </TouchableOpacity>
        </View>
      </ExpoCameraView>
    </View>
  );
};

export default CameraView;
