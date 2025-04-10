// lib/useCartStore.ts
import { create } from "zustand";

type Product = {
  product_id: number;
  product: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: Product[];
  fetchCart: () => Promise<void>;
  addItem: (item: Product) => void;
  removeItem: (product_id: number) => void;
  updateQuantity: (product_id: number, quantity: number) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  fetchCart: async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    set({ items: data });
  },

  addItem: (newItem) => {
    const updated = [...get().items];
    const existing = updated.find((i) => i.product_id === newItem.product_id);

    if (existing) {
      existing.quantity += newItem.quantity;
    } else {
      updated.push(newItem);
    }

    set({ items: updated });

    fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: { "Content-Type": "application/json" },
    });
  },

  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.product_id !== id) });

    fetch(`/api/cart/${id}`, { method: "DELETE" });
  },

  updateQuantity: (id, quantity) => {
    const updated = get().items.map((item) =>
      item.product_id === id ? { ...item, quantity } : item
    );

    set({ items: updated });

    fetch("/api/cart/update", {
      method: "POST",
      body: JSON.stringify({ product_id: id, quantity }),
      headers: { "Content-Type": "application/json" },
    });
  },
}));
