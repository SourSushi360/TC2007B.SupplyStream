import { db } from '@/constants/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View, Text, ToastAndroid } from 'react-native';
import { useSession } from './Session';
import { cn } from '@/constants/utils';

export interface Donation {
  scannedBy: string;
  timestamp: string;
  name: string;
  code: string;
  quantity: string;
  location: string;
}

export default function ProductForm(props: { product: Partial<Donation>, onProductAdded: () => void, loading: boolean }) {
  const [product, setProduct] = useState<Partial<Donation>>(props.product);
  const [error, setError] = useState('');
  const [isUploading, setisUploading] = useState(false);
  const user = useSession();

  useEffect(() => {
    setProduct(props.product);
  }, [props.product])

  const handleSubmit = async () => {
    if (!product.name || !product.quantity || !product.location) {
      setError('Por favor, llena todos los campos');
      return;
    }

    setisUploading(true);
    const docRef = await addDoc(collection(db, 'donations'), {
      ...product,
      scannedBy: user.user?.uid,
      timestamp: new Date().toISOString(),
      debug: true,
      quantity: parseInt(product.quantity)
    });
    setisUploading(false);

    ToastAndroid.show('Producto registrado.', 2000);

    props.onProductAdded();

    console.log('Document written with ID: ', docRef.id);
  };

  return <View className="relative flex-1 px-4 py-10">
    <TextInput
      placeholder="Nombre"
      value={product.name}
      editable={!isUploading && !props.loading}
      onChangeText={name => setProduct({ ...product, name })}
    />
    <TextInput
      placeholder="Code"
      value={product.code}
      editable={false}
    />
    <TextInput
      placeholder="Cantidad"
      value={product.quantity}
      keyboardType="numeric"
      editable={!isUploading && !props.loading}
      onChangeText={quantity => setProduct({ ...product, quantity })}
    />
    <TextInput
      placeholder="Ubicación"
      value={product.location}
      editable={!isUploading && !props.loading}
      onChangeText={location => setProduct({ ...product, location })}
    />

    <Text className="text-center text-red-300">{error}</Text>

    <Pressable
        className={cn("px-4 py-2 mx-auto", isUploading || props.loading ? "bg-gray-300" : "bg-blue-500")}
        onPress={handleSubmit}
        disabled={isUploading || props.loading}
    >
      <Text className="text-white" >{ props.loading ? "Cargando... " : isUploading ? "Registrando... " : "Registrar " }</Text>
    </Pressable>
  </View>
}
