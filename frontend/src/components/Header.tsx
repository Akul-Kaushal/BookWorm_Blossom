import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu, Book, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCartStore, Product } from "@/data/userCartStore"; // ✅ Zustand store
import CartItem from "@/components/Cartitem";
import CartSummary from "@/components/cartSummary";

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

interface CartEntry {
  product: Product;
  quantity: number;
}

const Header = ({ onSearch }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isCartVisible, setIsCartVisible] = useState(false);

  const { cartItems, cartItemsCount, fetchCart } = useCartStore(); // ✅ Zustand
  const [cartStateItems, setCartStateItems] = useState<CartEntry[]>([]);

  // ✅ Fetch cart from backend once on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ✅ Sync local UI state with Zustand cart
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const updated = cartItems.map((item) => ({
        product: item,
        quantity: item.quantity,
      }));
      setCartStateItems(updated);
    }
  }, [cartItems]);
  
  useEffect(() => {
    const updated = cartItems.map((item) => ({
      product: item,
      quantity: item.quantity,
    }));
    setCartStateItems(updated);
  }, [cartItems]);

  const toggleCart = () => setIsCartVisible((prev) => !prev);

  const updateQuantity = (id: number, quantity: number) => {
    setCartStateItems((prev) =>
      prev.map((item) =>
        item.product.product_id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartStateItems((prev) =>
      prev.filter((item) => item.product.product_id !== id)
    );
  };

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-bookstore-pink" />
            <span className="font-bold text-lg bg-gradient-to-r from-bookstore-purple to-bookstore-pink bg-clip-text text-transparent">
              BookWorm
            </span>
          </div>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-8">
            <a href="/" className="text-gray-800 hover:text-bookstore-purple">Home</a>
            <a href="/books" className="text-gray-800 hover:text-bookstore-purple">Browse</a>
            <a href="/bestsellers" className="text-gray-800 hover:text-bookstore-purple">Bestsellers</a>
            <a href="/new" className="text-gray-800 hover:text-bookstore-purple">New Arrivals</a>
            <a href="/deals" className="text-gray-800 hover:text-bookstore-purple">Deals</a>
          </nav>
        )}

        <div className="hidden md:block flex-1 mx-4">
          <SearchBar onSearch={onSearch} />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5 text-gray-600" />
          </Button>

          <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-bookstore-lilac">
                {cartItemsCount}
              </Badge>
            )}
          </Button>

          <Avatar className="h-8 w-8 ml-2">
            <AvatarImage />
            <AvatarFallback className="bg-bookstore-rose text-bookstore-purple">Ak</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {isMobile && (
        <div className="px-4 py-2 border-t border-gray-100">
          <SearchBar onSearch={onSearch} />
        </div>
      )}

      {isCartVisible && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={toggleCart}></div>

          <div className="relative w-full max-w-md bg-white shadow-lg h-full overflow-auto animate-in slide-in-from-right">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h2 className="text-xl font-semibold">Your Cart ({cartItemsCount})</h2>
              <Button variant="ghost" size="sm" onClick={toggleCart}>
                Close
              </Button>
            </div>

            <div className="p-4 divide-y">
              {cartStateItems.length === 0 ? (
                <div className="py-20 text-center">
                  <ShoppingCart className="mx-auto mb-4 text-gray-300" size={64} />
                  <h3 className="font-medium">Your cart is empty</h3>
                  <p className="text-gray-500 mt-1">Add some products to your cart</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-cart-lavender text-cart-lavender hover:bg-cart-lavender hover:text-white"
                    onClick={toggleCart}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cartStateItems.map((item) => (
                  <CartItem
                    key={item.product.product_id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))
              )}
            </div>

            {cartStateItems.length > 0 && (
              <div className="p-4 bg-gray-50 border-t sticky bottom-0">
                <CartSummary items={cartStateItems} />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
