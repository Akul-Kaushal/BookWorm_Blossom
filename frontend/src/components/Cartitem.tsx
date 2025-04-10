import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/hooks/use-cart";


interface CartItemProps {
    item: {
      product: Product;
      quantity: number;
    };
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
  }

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const totalPrice = item.product.price * item.quantity;

  return (
    <div className="flex items-center py-4 gap-3 animate-cart-item-added">
      {/* Optional: Placeholder box or icon since no image from DB */}
      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
        No Image
      </div>

      <div className="flex-grow">
        <h3 className="font-medium text-sm">{item.product.product}</h3>
        <p className="text-sm text-gray-500">₹{item.product.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onUpdateQuantity(item.product.product_id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus size={14} />
        </Button>

        <span className="w-6 text-center font-medium">{item.quantity}</span>

        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onUpdateQuantity(item.product.product_id, item.quantity + 1)}
        >
          <Plus size={14} />
        </Button>
      </div>

      <div className="w-20 text-right font-medium text-cart-purple">
        ₹{totalPrice.toFixed(2)}
      </div>

      <Button 
        variant="ghost" 
        size="icon" 
        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
        onClick={() => onRemove(item.product.product_id)}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default CartItem;









// interface CartItemProps {
//   item: {
//     product: Product;
//     quantity: number;
//   };
//   onUpdateQuantity: (productId: number, newQuantity: number) => void;
//   onRemove: (productId: number) => void;
// }

// const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
//   const { product, quantity } = item;
//   const totalPrice = product.price * quantity;

//   return (
//     <div className="flex items-center py-4 gap-3 animate-cart-item-added">
//       <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
//         <img  
//           alt={product.name} 
//           className="w-full h-full object-cover"
//         />
//       </div>
      
//       <div className="flex-grow">
//         <h3 className="font-medium text-sm">{product.name}</h3>
//         <p className="text-sm text-gray-500">${product.price.toFixed(2)} each</p>
//       </div>
      
//       <div className="flex items-center gap-2">
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="h-8 w-8 rounded-full border-cart-lavender text-cart-lavender hover:text-white hover:bg-cart-lavender"
//           onClick={() => onUpdateQuantity(product.id, quantity - 1)}
//           disabled={quantity <= 1}
//         >
//           <Minus size={14} />
//         </Button>
        
//         <span className="w-6 text-center font-medium">{quantity}</span>
        
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="h-8 w-8 rounded-full border-cart-lavender text-cart-lavender hover:text-white hover:bg-cart-lavender"
//           onClick={() => onUpdateQuantity(product.id, quantity + 1)}
//         >
//           <Plus size={14} />
//         </Button>
//       </div>
      
//       <div className="w-20 text-right font-medium text-cart-purple">
//         ${totalPrice.toFixed(2)}
//       </div>
      
//       <Button 
//         variant="ghost" 
//         size="icon" 
//         className="text-gray-400 hover:text-red-500 hover:bg-red-50"
//         onClick={() => onRemove(product.id)}
//       >
//         <Trash2 size={16} />
//       </Button>
//     </div>
//   );
// };

// export default CartItem;
