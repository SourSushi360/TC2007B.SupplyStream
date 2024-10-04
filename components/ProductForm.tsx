import { useState } from 'react';
import { TextInput, View } from 'react-native';

interface ProductEntry {
  name: string;
  code: string;
  qty: string;
  location: string;
}

export default function ProductForm(props: { product: Partial<ProductEntry> }) {
  const [product, setProduct] = useState<Partial<ProductEntry>>(props.product);

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
      value={product.qty}
      keyboardType="numeric"
      onChangeText={qty => setProduct({ ...product, qty })}
    />
    <TextInput
      placeholder="Ubicación"
      value={product.location}
      onChangeText={location => setProduct({ ...product, location })}
    />
  </View>
}
