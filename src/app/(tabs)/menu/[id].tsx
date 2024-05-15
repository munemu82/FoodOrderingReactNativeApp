import { Image, Pressable, StyleSheet} from 'react-native';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Product } from '@/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';

const sizes = ['S', 'M', 'L', 'XL']
const ProductDetailScreen = () => {
  const {id} = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState('M');

  //Get product data from the list of products
  const product = products.find((p) => p.id.toString() === id)
  
  if(!product){
    return <Text>Product Not found</Text>
  }
  const addToCart = () =>{
      console.warn('Adding to cart, size: ', selectedSize)
  }
  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: product.name}}  />
        <Image source={{uri: product.image || defaultPizzaImage}}  style={styles.image} />
        <Text>Select size</Text>
        <View style={styles.sizes}>
          {sizes.map((size) => (
            <Pressable 
              onPress={() => setSelectedSize(size)}
              style={[styles.size,{backgroundColor: selectedSize === size ? 'gainsboro': 'white'}]} key={size}
            > 
                <Text style={[styles.sizeText,{color: selectedSize === size ? 'Black': 'gray'}]}>{size}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
        <Button onPress={addToCart} text="Add to cart" />
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
    marginTop: 'auto',
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
