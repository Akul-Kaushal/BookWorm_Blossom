
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        className={cn(
          "rounded-full text-sm font-medium px-4",
          selectedCategory === "All" 
            ? "bg-bookstore-purple text-white" 
            : "bg-white text-gray-600 hover:bg-bookstore-rose/20"
        )}
        onClick={() => onChange("All")}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          className={cn(
            "rounded-full text-sm font-medium px-4",
            selectedCategory === category 
              ? "bg-bookstore-purple text-white" 
              : "bg-white text-gray-600 hover:bg-bookstore-rose/20"
          )}
          onClick={() => onChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;