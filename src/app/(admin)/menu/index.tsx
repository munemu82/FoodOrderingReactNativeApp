import { FlatList, Image } from 'react-native';


import { Text, View } from '@/components/Themed';

import products from '@assets/data/products';
import ProductListItem from '@/components/ProductListItem';


export default function TabOneScreen() {
  return (

      <FlatList 
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2} 
        contentContainerStyle={{gap: 10, padding: 10}}
        columnWrapperStyle={{gap: 10}}
      />
 
  );
}
