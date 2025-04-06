
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search books, authors, genres..."
        className="pl-10 pr-4 py-2 border-bookstore-rose focus:border-bookstore-lilac focus:ring-bookstore-lilac rounded-full"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;