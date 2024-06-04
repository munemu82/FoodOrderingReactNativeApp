import { ActivityIndicator, FlatList, Image } from 'react-native';


import { Text, View } from '@/components/Themed';

import products from '@assets/data/products';
import ProductListItem from '@/components/ProductListItem';
import { useProductList } from '@/api/products';


export default function MenuScreen() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  } 
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
