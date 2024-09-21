import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

const PurchasedBooks = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const response = await fetch('https://lib-backend-hmwd.onrender.com/user/purchased-books/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPurchasedBooks(data);
      } catch (error) {
        console.error('Failed to fetch purchased books:', error);
      }
    };

    fetchPurchasedBooks();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-5 bg-[url('/images/library2.jpg')] bg-cover bg-center">
        <h2 className="text-3xl font-bold text-white">Purchased Books</h2>
        <table className="w-24 min-w-full  text-black border-separate border-spacing-2 border-slate-300 bg-slate-300">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Date of Purchase</th>
            </tr>
          </thead>
          <tbody>
            {purchasedBooks.length > 0 ? (
              purchasedBooks.map((book) => (
                <tr key={book.id}>
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2">{book.username}</td>
                  <td className="border p-2">{book.date_of_purchase}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-2 text-center">No purchased books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasedBooks;
