import { useEffect, useState } from "react";
import axios from "axios";

export interface Product {
  product_id: number;
  product: string;
  price: number;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/cart");
      const data = response.data;

      // ✅ Check if data is an array before using it
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        console.warn("Expected an array but got:", data);
        setCartItems([]); // fallback to empty array
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]); // fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const refreshCart = fetchCart;

  const cartItemsCount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return {
    cartItems,
    cartItemsCount,
    refreshCart,
    loading,
  };
};
