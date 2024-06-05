import { CartItem, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type Product = Tables<'products'>;
type CartType ={
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number
};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0
})

//Provider
const CartProvider = ({children} : PropsWithChildren) =>{
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, size: CartItem['size']) =>{
        // if already item in the cart, increment the quarty of that item
        const existingItem = items.find(
            (item) => item.product === product && item.size === size
        )
        if(existingItem){
            updateQuantity(existingItem.id, 1)
            return;
        }
        const newCartItem : CartItem = {
            id: randomUUID(), // autogenerate
            product,
            product_id: product.id,
            size,
            quantity: 1
        }
        setItems([newCartItem, ...items])   // add new item to the existing array of items.
    }

    console.log(items)
    //Updating quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
       // console.log(itemId, amount)
       setItems(
            items.map(item => 
                item.id !== itemId ? 
                item : {...item, quantity: item.quantity + amount}
            ).filter((item) => item.quantity > 0)
        )
        
    }
    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);
    return (
        <CartContext.Provider
            value={{items, addItem, updateQuantity, total}}  // Cart provider is initialized with empty array and function
        >   
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);  // this is a custom hook to combine provider and consumer