import { BarcodeScanningResult, CameraView as ExpoCameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/constants/utils';
import { View, Text, StyleSheet, Button, ToastAndroid, useWindowDimensions, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReactNativeModal from 'react-native-modal';
import ProductForm from '@/components/ProductForm';

const BARCODE_SCANNING_AREA = 300;
const BARCODE_SCANNING_TIMEOUT = 500;

export default function CameraView() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
  // The scan state tracks the last scanned barcode.
  // The visible state tracks whether a barcode is currently visible.
  // To clear the barcode after it's no longer visible, we use a timeout, which we need
  // to store as a ref in order to cancel it if another barcode is detected.
  const [barcodeScan, setBarcodeScan] = useState<BarcodeScanningResult | null>(null);
  const [barcodeVisible, setBarcodeVisible] = useState(false);
  const barcodeTimeout = useRef<NodeJS.Timeout | null>(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [formCode, setFormCode] = useState<string | null>(null);

  // Clear the timeout when the component is unmounted.
  useEffect(() => {
    return () => {
      if (barcodeTimeout.current) {
        clearTimeout(barcodeTimeout.current);
      }
    };
  }, []);

  if (!permission || !permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center pb-2">Se requiere otorgar permiso para usar la cámara.</Text>
        <Button onPress={requestPermission} title="Permitir cámara" />
      </View>
    )
  }

  const onBarcodeScanned = (barcode: BarcodeScanningResult) => {
    const centerX = barcode.cornerPoints.reduce((sum, point) => sum + point.x, 0) / barcode.cornerPoints.length;
    const centerY = barcode.cornerPoints.reduce((sum, point) => sum + point.y, 0) / barcode.cornerPoints.length;

    const scanningArea = BARCODE_SCANNING_AREA;
    const xMin = (screenWidth - scanningArea) / 2;
    const xMax = (screenWidth + scanningArea) / 2;
    const yMin = (screenHeight - scanningArea) / 2;
    const yMax = (screenHeight + scanningArea) / 2;

    if (
      centerX < xMin || centerX > xMax ||
      centerY < yMin || centerY > yMax
    ) {
      return;
    }

    // console.log(barcode.cornerPoints.length);

    setBarcodeScan(barcode);
    setBarcodeVisible(true);

    if (barcodeTimeout.current) {
      clearTimeout(barcodeTimeout.current);
    }

    barcodeTimeout.current = setTimeout(() => {
      setBarcodeScan(null);
      setBarcodeVisible(false);
    }, BARCODE_SCANNING_TIMEOUT);
  };

  const scannerBorder = barcodeScan === null ? "border-red-500" : "border-green-500";

  const handleCodeClick = () => {
    if (barcodeScan) {
      setFormCode(barcodeScan.data);
    }
  }

  return <>
    <ReactNativeModal
      isVisible={formCode !== null}
      onSwipeComplete={() => setFormCode(null)}
      onBackButtonPress={() => setFormCode(null)}
      swipeDirection={['down']}
      className="relative flex-1 justify-end bg-white m-0 mt-[80%] rounded-t-3xl"
      statusBarTranslucent
    >
      <Pressable onPress={() => setFormCode(null)} className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full z-10">
        <Ionicons size={24} name='close' color='black' />
      </Pressable>
      <ProductForm product={{ code: barcodeScan?.data }}/>
    </ReactNativeModal>
    <ExpoCameraView className="flex-1" onBarcodeScanned={onBarcodeScanned} enableTorch={ flash }>
      <View className="relative flex-1 flex-col justify-center items-center">
        <View className="relative w-64 h-64 mt-20 border-white border-opacity-50">
          <View className={cn("absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 rounded-md", scannerBorder)} />
          <View className={cn("absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 rounded-md", scannerBorder)} />
          <View className={cn("absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 rounded-md", scannerBorder)} />
          <View className={cn("absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 rounded-md", scannerBorder)} />
        </View>
        <View className="mt-16">
          <Pressable onPress={handleCodeClick}>
            <Text className={cn("text-center text-xl px-4 py-2 rounded-xl", barcodeScan ? 'bg-green-600 text-white' : 'bg-white')}>
              {(barcodeScan && barcodeVisible) ? barcodeScan.data : "Alínea un código con las guías... "}
            </Text>
          </Pressable>
        </View>
        <Pressable
          className={cn("absolute bottom-5 right-5 w-16 h-16 rounded-full flex items-center justify-center", flash ? 'bg-yellow-400' : 'bg-white')}
          onPress={() => { setFlash(!flash) }}
        >
          <Ionicons size={28} name='flash' color={flash ? 'white' : 'blue'} />
        </Pressable>
      </View>
    </ExpoCameraView>
  </>;
};