import { db } from '@/constants/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Pressable, TextInput, View, Text, ToastAndroid } from 'react-native';
import { useSession } from './Session';
import { cn } from '@/constants/utils';

interface ProductEntry {
  name: string;
  code: string;
  quantity: string;
  location: string;
}

interface Donation {
  scannedBy: string;
  timestamp: string;
  contents: ProductEntry[];
}

export default function ProductForm(props: { product: Partial<ProductEntry>, onProductAdded: () => void }) {
  const [product, setProduct] = useState<Partial<ProductEntry>>(props.product);
  const [error, setError] = useState('');
  const [isUploading, setisUploading] = useState(false);
  const user = useSession();

    const handleSubmit = async () => {
      if (!product.name || !product.quantity || !product.location) {
        setError('Por favor, llena todos los campos');
        return;
      }

      setisUploading(true);
      const docRef = await addDoc(collection(db, 'donations'), {
        scannedBy: user.user?.uid,
        timestamp: new Date().toISOString(),
        debug: true,
        content: product
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
      onChangeText={quantity => setProduct({ ...product, quantity })}
    />
    <TextInput
      placeholder="Ubicación"
      value={product.location}
      onChangeText={location => setProduct({ ...product, location })}
    />

    <Text className="text-center text-red-300">{error}</Text>

    <Pressable
        className={cn("px-4 py-2 mx-auto", isUploading ? "bg-gray-300" : "bg-blue-500")}
        onPress={handleSubmit}
        disabled={isUploading}
    >
      <Text className="text-white" >{ isUploading ? "Registrando... " : "Registrar " }</Text>
    </Pressable>
  </View>
}
