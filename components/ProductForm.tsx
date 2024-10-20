import { db } from '@/constants/firebase';
import { FieldValue, addDoc, collection, doc, getDoc, getDocs, increment, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View, Text, ToastAndroid, StyleSheet, ScrollView} from 'react-native';
import { useSession } from './Session';
import { cn } from '@/constants/utils';
import { Ionicons } from '@expo/vector-icons';
import Input from './ProductForm/Input';
import IconButton from './UI/IconButton';


export interface Donation {
  scannedBy: string;
  timestamp: string;
  name: string;
  code: string;
  quantity: string;
  location: string;
  identifier?: string;
}

export default function ProductForm(props: { product: Partial<Donation>, onProductAdded: () => void, loading: boolean, prefilled: boolean, code: boolean, picture?: string }) {
  const [product, setProduct] = useState<Partial<Donation>>(props.product);
  const [error, setError] = useState('');
  const [isUploading, setisUploading] = useState(false);
  const user = useSession();

  // Esto refresca los valores del form si cambia el dato de las props (autocompletado)
  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

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
        await setDoc(doc(db, 'inventory', product.code), {
          name: product.name,
          code: product.code,
          location: product.location,
          quantity: increment(1)
        }, { merge: true });
      } else {
        await addDoc(collection(db, 'inventory'), {
          name: product.name,
          location: product.location,
          quantity: parseInt(product.quantity),
          identifier: product.identifier,
        })
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

  const pictureVITMatch = async () => {
    if (!user.secrets) {
      console.error('No hay secretos');
      return;
    };
    const snapshot = await getDocs(collection(db, 'inventory'));
    const identifiers = snapshot.docs.map(doc => doc.data().identifier).filter(item => item !== undefined);

    console.log("querying with identifiers ", identifiers);

    const response = await fetch('https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32', {
      headers: {
        'Authorization': `Bearer ${user.secrets.huggingfaceApiKey}`
      },
      method: 'POST',
      body: JSON.stringify({
        parameters: {
          candidate_labels: identifiers,
        },
        inputs: props.picture
      })
    });

    if (!response.ok) {
      console.error(response);
      setError('Hubo un error al procesar la imagen');
      return;
    }

    const data = await response.json();
    // sample: [{"score":0.9999638795852661,"label":"toilet paper"},{"score":2.269870128657203e-05,"label":"leather wallet"},{"score":1.343264193565119e-05,"label":"pen"}]
    const bestMatch = data[0];
    const matchedProduct = snapshot.docs.find(doc => doc.data().identifier === bestMatch.label);
    if (matchedProduct) {
      setProduct({
        ...matchedProduct.data(),
        code: matchedProduct.id,
      });
    }
  };


  function amountChangeHandler(amount: string) {
    setProduct({ ...product, quantity: amount });
  }

  function nameChangeHandler(name: string) {
    setProduct({ ...product, name });
  }

  function locationChangeHandler(location: string) {
    setProduct({ ...product, location });
  }

  function identifierChangeHandler(identifier: string) {
    setProduct({ ...product, identifier });
  }

  return <ScrollView>
    <View className="relative flex-1 px-4 py-10">
    <Text className="text-2xl text-center mb-4">{ props.loading ? "Cargando..." : props.prefilled ? "Añadir inventario" : "Registrar nuevo" }</Text>

    {/* <TextInput className='bg-white font-bold mb-4 text-black px-4 py-2 rounded-md border border-gray-300 shadow-sm'
      placeholder="Nombre"
      placeholderTextColor="gray"
      value={product.name}
      editable={!isUploading && !props.loading && !props.prefilled}
      onChangeText={name => setProduct({ ...product, name })}
    /> */}

    <Input
					style={styles.rowInput}
					label={"Nombre"}
          value={product.name}
          editable={!isUploading && !props.loading && !props.prefilled}
					textInputConfig={{
						keyboardType: "default",
						onChangeText: nameChangeHandler,
            placeholder: "Ingresa el nombre del producto"
            
					}}
				/>
        
    {/* <TextInput className='bg-white font-bold mb-4 text-black px-4 py-2 rounded-md border border-gray-300 shadow-sm'
      placeholder="Code"
      placeholderTextColor="gray"
      value={product.code ?? '[sin código]'}
      editable={false}
    /> */}

    <Input
        style={styles.rowInput}
        label={"Barcode"}
        value={product.code ?? '[sin código]'}
        editable={false}
        textInputConfig={{
          keyboardType: "default",
          placeholder: "Valor de el código de barras" 
        }}
      />

    {/* <TextInput className='bg-white font-bold mb-4 text-black px-4 py-2 rounded-md border border-gray-300 shadow-sm'
      placeholder="Cantidad"
      placeholderTextColor="gray"
      value={product.quantity}
      keyboardType="numeric"
      editable={!isUploading && !props.loading}
      onChangeText={quantity => setProduct({ ...product, quantity })}
    /> */}

        <Input
          style={styles.rowInput}
          label={"Cantidad"}
          value={product.quantity}
          editable={!isUploading && !props.loading}
          textInputConfig={{
            keyboardType: "numeric",
            onChangeText: amountChangeHandler,
            placeholder: "Ingresa la cantidad de productos"
          }}
        />

{/*     

    <TextInput className='bg-white font-bold mb-4 text-black px-4 py-2 rounded-md border border-gray-300 shadow-sm'
      placeholder="Ubicación"
      placeholderTextColor="gray"
      value={product.location}
      editable={!isUploading && !props.loading && !props.prefilled}
      onChangeText={location => setProduct({ ...product, location })}
    /> */}

    <Input
        style={styles.rowInput}
        label={"Ubicación"}
        value={product.location}
        editable={!isUploading && !props.loading && !props.prefilled}
        textInputConfig={{
          keyboardType: "default",
          placeholder: "Ingresa la ubicación del producto",
          onChangeText: locationChangeHandler
        }}
      />

    { !props.product.code &&
      <Input
        style={styles.rowInput}
        label={"Identificador (inglés)"}
        value={product.identifier}
        editable={!isUploading && !props.loading && !props.prefilled}
        textInputConfig={{
          keyboardType: "default",
          placeholder: "Ingresa el identificador del producto",
          onChangeText: identifierChangeHandler
        }}
      />
    }

    <Text className="text-center text-red-300">{error}</Text>


    <View style={styles.buttonsInput}>


    {/* <Pressable
      className={cn("px-4 py-2 mx-auto", isUploading || props.loading ? "bg-gray-300" : "bg-blue-500")}
      onPress={pictureVITMatch}
    >

      <Text className="text-white" >{ "Autodetectar (experimental) " }</Text>
    </Pressable> */}

{ !props.product.code &&
    <IconButton
      onPress={pictureVITMatch}
      size={24}
      buttonColor='blue'
      color='white'
      name = 'scan'
      letterSize = {18}
      disableded={isUploading || props.loading}
    >{" Autodetectar \n(experimental)"}</IconButton>
}
{/* 
    <Pressable
        className={cn("px-4 py-2 mx-auto", isUploading || props.loading ? "bg-gray-300" : "bg-blue-500")}
        onPress={handleSubmit}
        disabled={isUploading || props.loading}
    >
      <Text className="text-white" >{ props.loading ? "Cargando... " : isUploading ? "Registrando... " : "Registrar " }</Text>
    </Pressable> */}

    <IconButton
      onPress={handleSubmit}
      size={props.product.code ? 36 : 24}
      buttonColor='green'
      color='white'
      name = 'checkmark'
      letterSize={props.product.code ? 24 : 14}
      flexDirections={props.product.code ? 'row' : 'column'}
      flexSize={1}
      disableded={isUploading || props.loading}
    >{ props.loading ? "Cargando... " : isUploading ? "Registrando... " : "Registrar " }</IconButton>

    </View>
  </View>
  </ScrollView>
}



const styles = StyleSheet.create({
	inputsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowInput: {
		flex: 1,
	},
  buttonsInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    
  },
});