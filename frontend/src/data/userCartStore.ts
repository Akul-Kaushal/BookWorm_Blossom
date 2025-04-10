// cartStore.ts
import { create } from 'zustand';

export interface Product {
  product_id: number;
  product: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: Product[]; // <-- should be an array
  cartItemsCount: number;
  fetchCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [], // ✅ make sure this is an array
  cartItemsCount: 0,
  fetchCart: async () => {
    try {
      const response = await fetch('/api/cart');
      const data: Product[] = await response.json();
      set({
        cartItems: data,
        cartItemsCount: data.reduce((sum, item) => sum + item.quantity, 0),
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  },
}));
