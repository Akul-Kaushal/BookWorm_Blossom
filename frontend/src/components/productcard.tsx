// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Plus } from "lucide-react";
// import { Product } from "@/data/data";
// import { toast } from "sonner";

// interface ProductCardProps {
//   product: Product;
//   onAddToCart: (product: Product) => void;
// }

// const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
//   const [isHovering, setIsHovering] = useState(false);

//   const handleAddToCart = () => {
//     onAddToCart(product);
//     toast.success(`${product.name} added to cart!`);
//   };

//   return (
//     <Card 
//       className="overflow-hidden transition-all duration-300 h-full flex flex-col"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <div className="relative aspect-square overflow-hidden">
//         <img  
//           alt={product.name} 
//           className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}
//         />
//       </div>
      
//       <CardContent className="flex-grow p-4">
//         <div className="flex justify-between items-start">
//           <h3 className="font-semibold text-lg">{product.name}</h3>
//           <span className="font-medium text-cart-lavender">${product.price.toFixed(2)}</span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{product.name}</p>
//       </CardContent>
      
//       <CardFooter className="p-4 pt-0">
//         <Button 
//           onClick={handleAddToCart}
//           className="w-full bg-cart-purple hover:bg-cart-lavender transition-colors"
//         >
//           <Plus size={16} className="mr-2" />
//           Add to Cart
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ProductCard;
