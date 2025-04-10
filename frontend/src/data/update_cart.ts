// hooks/useCart.ts
type CartResponse = {
    success: boolean;
    message?: string;
    data?: any;
    error?: string;
  };
  
  export const updateCart = async (
    product_id: number,
    action: "add" | "remove"
  ): Promise<CartResponse> => {
    try {
      const res = await fetch("http://localhost:8000/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id, action }),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.detail || "Cart update failed.");
      return { success: true, message: data.message, data: data.cart };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  