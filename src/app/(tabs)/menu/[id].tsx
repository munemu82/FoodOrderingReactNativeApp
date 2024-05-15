import { Image, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Product } from '@/types';
import { Stack, useLocalSearchParams } from 'expo-router';


const ProductDetailScreen = () => {
  const {id} = useLocalSearchParams();
  return (
    <View >
        <Stack.Screen options={{ title: 'Details ' + id}}  />
        <Text style={{fontSize: 20}}>ProductDetailScreen for id {id}</Text>
    </View>
  );
}

export default ProductDetailScreen;
