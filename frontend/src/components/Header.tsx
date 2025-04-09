
import React from 'react';
import { ShoppingCart, Menu, Book, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SearchBar from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  cartItemsCount?: number;
}

const Header = ({ onSearch, cartItemsCount = 0 }: HeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <Book className="h-6 w-6 text-bookstore-pink" />
              <span className="font-bold text-lg bg-gradient-to-r from-bookstore-purple to-bookstore-pink bg-clip-text text-transparent">
                BookWorm  
              </span>
            </div>
          </div>
        </div>
        
        {/* Navigation - Only visible on desktop */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-8">
            <a href="/" className="text-gray-800 hover:text-bookstore-purple transition-colors"> Home</a>
            <a href="/books" className="text-gray-800 hover:text-bookstore-purple transition-colors">Browse</a>
            <a href="/bestsellers" className="text-gray-800 hover:text-bookstore-purple transition-colors">Bestsellers</a>
            <a href="/new" className="text-gray-800 hover:text-bookstore-purple transition-colors">New Arrivals</a>
            <a href="/deals" className="text-gray-800 hover:text-bookstore-purple transition-colors">Deals</a>
          </nav>
        )}
        
        {/* Search Bar - Expanded on desktop */}
        <div className="hidden md:block flex-1 mx-4">
          <SearchBar onSearch={onSearch} />
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5 text-gray-600" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-bookstore-lilac">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
          
          <Avatar className="h-8 w-8 ml-2">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop" />
            <AvatarFallback className="bg-bookstore-rose text-bookstore-purple">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {isMobile && (
        <div className="px-4 py-2 border-t border-gray-100">
          <SearchBar onSearch={onSearch} />
        </div>
      )}
    </header>
  );
};

export default Header;

