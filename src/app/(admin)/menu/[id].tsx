import { ActivityIndicator, Image, Pressable, StyleSheet} from 'react-native';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { PizzaSize, Product } from '@/types';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import { useCart } from '@/providers/CartProvider';
import { FontAwesome } from '@expo/vector-icons';
import { useProduct } from '@/api/products';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']
const ProductDetailScreen = () => {
  
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);  // transform strings to ID number
  const { data: product, error, isLoading } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  

  const router = useRouter();

  const {addItem} = useCart();
  
  if(!product){
    return <Text>Product Not found</Text>
  }
  const addToCart = () =>{
    if(!product){
      return;
    }
      addItem(product, selectedSize);
      // console.warn('Adding to cart, size: ', selectedSize)
      // Navigate to the shoppping chart
      router.push('/cart')
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>;
  }
  return (
    <View style={styles.container}>
       <Stack.Screen 
        options={ 
              {
                title:'Menu',
                headerRight: () => (
                  <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="pencil"
                          size={25}
                          color={Colors.light.tint}
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                      )}
                    </Pressable>
                  </Link>
                ),

              }}/>
        <Stack.Screen options={{ title: product.name}}  />
        <Image source={{uri: product.image || defaultPizzaImage}}  style={styles.image} />
       
        <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>

    </View>
  );
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginTop: 'auto',
    // color:'blue'
  },

  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});
