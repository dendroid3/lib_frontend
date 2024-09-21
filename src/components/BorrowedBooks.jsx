import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { auth } from '../config/firebase'; // Ensure you have Firebase initialized
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, display user
        setUser(user);
      } else {
        // No user is signed in
        setUser('Guest');
      }
    });
    return () => unsubscribe();
  })
  
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        
        if(!user.uid){
          setTimeout(() => {
            fetchBorrowedBooks()
            return
          }, 3000);
        }
        const response = await axios.get(`https://lib-backend-hmwd.onrender.com/user/get_borrowed_books/${user.uid}`)
        const data = await response.data;
        setBorrowedBooks(data);
      } catch (error) {
        console.error('Failed to fetch borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="p-5 bg-[url('/images/library2.jpg')] bg-cover bg-center min-h-screen" >
        <h2 className="text-3xl text-white font-bold">Borrowed Books</h2>
        <table className="w-24 min-w-full  text-black border-separate border-spacing-2 border-slate-300 bg-slate-300" >
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Borrowed Date</th>
              <th className="border p-2">Return Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book) => (
                <tr key={book.id}>
                  <td className="border p-2">{book.book.title}</td>
                  <td className="border p-2">{book.book.author}</td>
                  <td className="border p-2">{book.borrowed_date}</td>
                  <td className="border p-2">{book.return_date}</td>
                  <td className="border p-2">{book.status == 1 ? "Not Returned" : "Returned"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-2 text-center">No borrowed books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowedBooks;





