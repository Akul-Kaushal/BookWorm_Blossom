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

  const fetchCart = async () => {
    const response = await axios.get("/api/cart");
    setCartItems(response.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const refreshCart = fetchCart;

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cartItems,
    cartItemsCount,
    refreshCart,
  };
};
