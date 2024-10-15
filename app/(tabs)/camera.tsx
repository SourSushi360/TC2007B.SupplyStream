import { BarcodeScanningResult, CameraView as ExpoCameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { cn } from '@/constants/utils';
import { View, Text, StyleSheet, Button, ToastAndroid, useWindowDimensions, Pressable, Alert, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReactNativeModal from 'react-native-modal';
import ProductForm from '@/components/ProductForm';
import type { Donation } from '@/components/ProductForm';
import { db } from '@/constants/firebase';
import { manipulateAsync } from 'expo-image-manipulator';

const BARCODE_SCANNING_AREA = 300;
const BARCODE_SCANNING_TIMEOUT = 500;

export default function CameraView() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
  const [photoMode, setPhotoMode] = useState(false);

  const [shownPhotoWarning, setShownPhotoWarning] = useState(false);

  // The scan state tracks the last scanned barcode.
  // The visible state tracks whether a barcode is currently visible.
  // To clear the barcode after it's no longer visible, we use a timeout, which we need
  // to store as a ref in order to cancel it if another barcode is detected.
  const [barcodeScan, setBarcodeScan] = useState<BarcodeScanningResult | null>(null);
  const [barcodeVisible, setBarcodeVisible] = useState(false);
  const barcodeTimeout = useRef<NodeJS.Timeout | null>(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [formLoading, setFormLoading] = useState(true);
  const [initialForm, setInitialForm] = useState<Partial<Donation> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [picture, setPicture] = useState<string | null>(null);

  const cameraRef = useRef<ExpoCameraView>(null);

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

  const scannerBorder = photoMode ? "border-white" : barcodeScan === null ? "border-red-500" : "border-green-500";

  const handleCodeClick = () => {
    if (barcodeScan) {
      setFormLoading(true);
      setShowForm(true);
      const q = query(collection(db, "donations"), where("code", "==", barcodeScan.data));
      getDocs(q).then(result => {
        if (result.size > 0) {
          setInitialForm(result.docs[0].data() as Donation);
        } else {
          console.log(barcodeScan.data);
          setInitialForm({ code: barcodeScan.data });
        }
        setFormLoading(false);
      });
    }
  }

  const changeMode = async () => {
    console.log(PixelRatio.get());
    if (!cameraRef.current) return;
    if (!photoMode && !shownPhotoWarning) {
      Alert.alert(
        'Instrucciones',
        `En caso de ser posible, se recomienda escanear por código de barras.
Si no es posible, sigua las indicaciones para tomar una foto:
1. Coloque el producto en un lugar bien iluminado, con fondo claro y sin obstrucciones.
2. Asegúrese de que la cámara esté enfocada en el producto.
3. Asegúrese que todo el producto esté visible.
4. Ignore la guía roja, sólo aplica para escaneo de códigos.
  `,
        [
          {
            text: 'OK',
            onPress: () => { setShownPhotoWarning(true) }
          }
        ], {
          cancelable: true,
          onDismiss: () => { setShownPhotoWarning(true) }
        }
      )
      setShownPhotoWarning(true);
    }
    setPhotoMode(!photoMode);
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.8 });
    if (!photo) return;

    console.log(photo.width, photo.height);

    const box = Math.floor(photo.width * 0.5);

    const cropped = await manipulateAsync(photo.uri, [
      {
        crop: {
          originX: Math.floor((photo.width - box) / 2),
          originY: Math.floor((photo.height - box) / 2),
          width: box,
          height: box
        }
      },
      {
        resize: {
          width: 800,
        }
      }
    ], { base64: true, compress: 0.5 })

    setInitialForm(null);
    setFormLoading(false);
    setShowForm(true);
    setPicture(cropped.base64 ?? null);
  }

  return <>
    <ReactNativeModal
      isVisible={showForm}
      onSwipeComplete={() => setShowForm(false)}
      onBackButtonPress={() => setShowForm(false)}
      swipeDirection={['down']}
      className="relative flex-1 justify-end bg-white m-0 mt-[80%] rounded-t-3xl"
      statusBarTranslucent
    >
      <Pressable onPress={() => setShowForm(false)} className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full z-10">
        <Ionicons size={24} name='close' color='black' />
      </Pressable>
      <ProductForm
        product={initialForm ?? {}}
        onProductAdded={() => setShowForm(false)}
        loading={formLoading}
        prefilled={initialForm?.location !== undefined}
        code={barcodeScan?.data !== undefined}
        picture={picture ?? undefined}
      />
    </ReactNativeModal>

    <ExpoCameraView ref={cameraRef} className="flex-1" onBarcodeScanned={onBarcodeScanned} enableTorch={flash}>
      <View className="relative flex-1 items-center justify-center">
        <View className={cn("border-white border-opacity-50", photoMode ? `w-80 h-80` : "w-64 h-64")}>
          <View className={cn("absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 rounded-md", scannerBorder)} />
          <View className={cn("absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 rounded-md", scannerBorder)} />
          <View className={cn("absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 rounded-md", scannerBorder)} />
          <View className={cn("absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 rounded-md", scannerBorder)} />
        </View>
        <View className="mt-16 absolute bottom-32">
          <Pressable onPress={photoMode ? takePicture : handleCodeClick}>
            <Text className={cn("text-center text-xl px-4 py-2 rounded-xl", (barcodeScan || photoMode) ? 'bg-green-600 text-white' : 'bg-white')}>
              {photoMode ? "Capturar " : (barcodeScan && barcodeVisible) ? barcodeScan.data : "Alínea un código con las guías... "}
            </Text>
          </Pressable>
        </View>
        <Pressable
          className={cn("absolute bottom-5 right-5 w-16 h-16 rounded-full flex items-center justify-center", flash ? 'bg-yellow-400' : 'bg-white')}
          onPress={() => { setFlash(!flash) }}
        >
          <Ionicons size={28} name='flash' color={flash ? 'white' : 'blue'} />
        </Pressable>
        <Pressable
          className='absolute bottom-5 left-5 w-16 h-16 rounded-full flex items-center justify-center bg-white'
          onPress={changeMode}
        >
          <Ionicons size={28} name={photoMode ? 'camera' : 'scan'} color='blue' />
        </Pressable>
      </View>
    </ExpoCameraView>
  </>;
};