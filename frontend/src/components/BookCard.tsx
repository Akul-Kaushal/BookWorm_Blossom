import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MinusIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  rentPrice: number;
  available: boolean;
  category: string;
}

const BookCard = ({ 
  id, 
  title, 
  author, 
  coverImage, 
  price, 
  rentPrice, 
  available, 
  category 
}: BookProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity(prev => prev + 1);
    } else {
      toast.info("Maximum 5 books per order");
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleBuy = () => {
    if (quantity === 0) {
      toast.warning("Please select at least 1 book");
      return;
    }
    toast.success(`Added ${quantity} copies of "${title}" to cart`);
    setQuantity(0);
  };

  const handleRent = () => {
    if (quantity === 0) {
      toast.warning("Please select at least 1 book");
      return;
    }
    toast.success(`Rented ${quantity} copies of "${title}"`);
    setQuantity(0);
  };

  return (
    <div className="book-card relative flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl w-full max-w-xs">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={coverImage} 
          alt={`Cover of ${title}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-bookstore-lilac hover:bg-bookstore-purple">
          {category}
        </Badge>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg line-clamp-1 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {author}</p>
        
        <div className="mt-auto space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-bookstore-purple">${price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">Rent: ${rentPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="outline" 
                className="h-8 w-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full"
                onClick={handleDecrement}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="font-medium w-6 text-center">{quantity}</span>
              <Button 
                size="icon" 
                variant="outline" 
                className="h-8 w-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-full"
                onClick={handleIncrement}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            
            {available ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">In Stock</Badge>
            ) : (
              <Badge variant="outline" className="text-red-500 border-red-200">Out of Stock</Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Button 
              onClick={handleBuy}
              className="bg-bookstore-purple hover:bg-bookstore-lilac text-white"
              disabled={!available || quantity === 0}
            >
              Buy
            </Button>
            <Button 
              onClick={handleRent}
              variant="outline" 
              className="border-bookstore-pink text-bookstore-pink hover:bg-bookstore-pink/20"
              disabled={!available || quantity === 0}
            >
              Rent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;