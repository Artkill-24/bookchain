import React, { useState, useEffect } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import type { Book } from '../types/book';
import { fetchPublishedBooks } from '../utils/web3';

interface BookListProps {
  address: string | null;
}

export const BookList: React.FC<BookListProps> = ({ address }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const publishedBooks = await fetchPublishedBooks();
        setBooks(publishedBooks);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading books...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-600">No books published yet</h3>
        {address && (
          <p className="mt-2 text-gray-500">
            Be the first to publish a book on BookChain!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <div className="h-48 overflow-hidden">
            <img 
              src={book.coverImageURI} 
              alt={book.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Cover';
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{book.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-purple-600 font-medium">{book.price} MATIC</span>
              <button 
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                onClick={() => {
                  // TODO: Implement purchase functionality
                  console.log('Purchase book:', book.id);
                }}
                disabled={book.author.toLowerCase() === address?.toLowerCase()}
              >
                {book.author.toLowerCase() === address?.toLowerCase() ? 'Your Book' : 'Purchase'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};