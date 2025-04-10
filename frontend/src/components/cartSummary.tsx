import { Button } from "@/components/ui/button";
import { Product } from "@/hooks/use-cart";

interface CartSummaryProps {
  items: {
    product: Product;
    quantity: number;
  }[];
}

const CartSummary = ({ items }: CartSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = items.length > 0 ? 10 : 0;
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-cart-purple">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{items.length > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-cart-purple">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full bg-gradient-to-r from-cart-purple via-cart-lavender to-cart-pink hover:opacity-90 transition-opacity"
        disabled={items.length === 0}
      >
        Checkout
      </Button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
};

export default CartSummary;