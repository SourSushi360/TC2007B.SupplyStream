import { db } from '@/constants/firebase';
import { FieldValue, addDoc, collection, doc, getDoc, increment, setDoc } from 'firebase/firestore';
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

export default function ProductForm(props: { product: Partial<Donation>, onProductAdded: () => void, loading: boolean, prefilled: boolean }) {
  const [product, setProduct] = useState<Partial<Donation>>(props.product);
  const [error, setError] = useState('');
  const [isUploading, setisUploading] = useState(false);
  const user = useSession();

  // Esto refresca los valores del form si cambia el dato de las props (autocompletado)
  useEffect(() => {
    setProduct(props.product);
  }, [props.product])

  const handleSubmit = async () => {
    if (!product.name || !product.quantity || !product.location) {
      setError('Por favor, llena todos los campos');
      return;
    }

    setisUploading(true);
    try {
      const donRef = await addDoc(collection(db, 'donations'), {
        ...product,
        scannedBy: user.user?.uid,
        timestamp: new Date().toISOString(),
        debug: true,
        quantity: parseInt(product.quantity)
      });
      if (product.code) {
        console.log('asfasf');
        await setDoc(doc(db, 'inventory', product.code), {
          name: product.name,
          code: product.code,
          location: product.location,
          quantity: increment(1)
        }, { merge: true });
      }
    } catch (e) {
      console.error(e);
      setError('Hubo un error al registrar el producto');
      setisUploading(false);
      return;
    }

    setisUploading(false);

    ToastAndroid.show('Producto registrado.', 2000);

    props.onProductAdded();
  };

  return <View className="relative flex-1 px-4 py-10">
    <Text className="text-2xl text-center mb-4">{ props.loading ? "Cargando" : props.prefilled ? "Añadir inventario" : "Registrar nuevo" }</Text>

    <TextInput className='bg-white font-bold mb-4 text-black px-4 py-2 rounded-md border border-gray-300 shadow-sm'
      placeholder="Nombre"
      placeholderTextColor="gray"
      value={product.name}
      editable={!isUploading && !props.loading && !props.prefilled}
      onChangeText={name => setProduct({ ...product, name })}
    />
    <TextInput className='bg-white font-bold mb-4 text-black px-4 py-2 rounded-md border border-gray-300 shadow-sm'
      placeholder="Code"
      placeholderTextColor="gray"
      value={product.code}
      editable={false}
    />
    <TextInput className='bg-white font-bold mb-4 text-black px-4 py-2 rounded-md border border-gray-300 shadow-sm'
      placeholder="Cantidad"
      placeholderTextColor="gray"
      value={product.quantity}
      keyboardType="numeric"
      editable={!isUploading && !props.loading}
      onChangeText={quantity => setProduct({ ...product, quantity })}
    />
    <TextInput className='bg-white font-bold mb-4 text-black px-4 py-2 rounded-md border border-gray-300 shadow-sm'
      placeholder="Ubicación"
      placeholderTextColor="gray"
      value={product.location}
      editable={!isUploading && !props.loading && !props.prefilled}
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
