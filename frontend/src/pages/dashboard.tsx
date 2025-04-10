
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import CategoryFilter from '@/components/CategoryFilter';


const Index = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/dashboard');
        const json = await res.json();
        const data = json.data as {
          id: number;
          product: string;
          genre: string;
          price: number;
          status: string;
        }[];
  
        const availableBooks = data.filter(book => book.status === 'available');
        setBooks(availableBooks);
  
        const uniqueCategories = ['All', ...new Set(availableBooks.map(book => book.genre))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, []);
  


  useEffect(() => {
    let results = books;
    
    if (selectedCategory !== 'All') {
      results = results.filter(book => book.genre === selectedCategory);
    }
    
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(
        book =>
          book.product.toLowerCase().includes(lowercasedTerm) ||
          book.genre.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    setFilteredBooks(results);
  }, [searchTerm, selectedCategory, books]);


  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchTerm}/>
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        {/* <section className="mb-12 bg-gradient-to-r from-bookstore-purple/30 to-bookstore-rose/30 p-8 rounded-2xl">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Discover your next favorite book
            </h1>
            <p className="text-gray-700 mb-6">
              Browse thousands of titles, buy or rent with just a few clicks.
              Free shipping on orders over $35.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-bookstore-purple hover:bg-bookstore-lilac text-white px-6 py-2 rounded-full font-medium transition-colors">
                Browse Bestsellers
              </button>
              <button className="bg-white text-bookstore-purple hover:bg-bookstore-rose hover:text-white px-6 py-2 rounded-full font-medium border border-bookstore-purple transition-colors">
                View Deals
              </button>
            </div>
          </div>
        </section> */}
        
        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Browse Books</h2>
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onChange={setSelectedCategory} 
          />
        </section>
        
        {/* Book Grid */}
        <section>
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No books found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-lg bg-gradient-to-r from-bookstore-purple to-bookstore-pink bg-clip-text text-transparent">
                  BookWorm
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                © 2025 BookWorm. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-bookstore-purple">About</a>
              <a href="#" className="text-gray-600 hover:text-bookstore-purple">Contact</a>
              <a href="#" className="text-gray-600 hover:text-bookstore-purple">FAQ</a>
              <a href="#" className="text-gray-600 hover:text-bookstore-purple">Terms</a>
              <a href="#" className="text-gray-600 hover:text-bookstore-purple">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;