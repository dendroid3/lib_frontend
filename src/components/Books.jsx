import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase'; // Ensure you have Firebase initialized
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [books_in_cart, setBooksInCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://lib-backend-hmwd.onrender.com/books/get_all/');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
}, []);

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

const handleBorrow = async (book) => {
  const confirm_response = confirm("Do you want to borrow this book? You will be required to return it after 14 days.\nProceed?")
  if(!confirm_response){
    return
  }
  
  // Logic to handle borrowing a book
  try {
    const response = await axios.get(`https://lib-backend-hmwd.onrender.com/books/borrow/${user.uid}/${book.id}`)
    alert(response.data.message)
  } catch (error) {
    alert("Failed to borrow book. Kindly try again later.")
  }
};

const handleAddToCart = async (book) => {
  const number_of_books = prompt("Enter number of books to buy")
  if(!number_of_books){
    alert("Book could not be added to cart, you must select number of books to buy")
    return
  }

  book.quantity = number_of_books

  setBooksInCart(books_currently_in_cart  => [...books_currently_in_cart, book])

  alert("Book added to cart successfully.")
};

const handleEmptyCart = () => {
  setBooksInCart([])
}

const handleRemoveFromCart = (book) => {
  const confirmation = confirm(`You are about to remove ${book.title} from cart.\nProceed?`)
  if(!confirmation){
    return
  }
  setBooksInCart(prevBooksInCart => prevBooksInCart.filter(book_in_cart => book_in_cart.id !== book.id))
}

const handlePurchase = async (user) => {
  const data = []

  books_in_cart.forEach(book => {
    let book_data = {
      id: book.id,
      quantity: book.quantity
    }
    data.push(book_data)
  });

  const phone_number = prompt("Enter the phone number that you will use to pay for MPesa")

  const truncated_phone_number = phone_number.toString().replace(/^0+(?=\d)/, '')

  if(Math.abs(phone_number.length) !== 10) {
    alert('Phone number must be 10 digits.')
    handlePurchase()
    return
  }

  const response = await axios.post(`https://lib-backend-hmwd.onrender.com/books/purchase/${user.uid}/+254${truncated_phone_number}/${totalCostOfBooksInCart()}`, data)
  console.log(response)

  console.log(user)
  console.log(`https://lib-backend-hmwd.onrender.com/books/purchase/${user.uid}/+254${truncated_phone_number}/${totalCostOfBooksInCart()}`)
}

const totalCostOfBooksInCart = () => {
  let total = 0
  books_in_cart .forEach(book => {
    total += (book.quantity * book.price)
  });
  return total
}

const toggleCartVisibility = () => {
  setIsCartVisible(prevState => !prevState); // Toggle the state
};

  return (
    <div className="p-5 bg-[url('/images/library2.jpg')] bg-cover bg-center min-h-screen">
      <section className="grid">
        <div className="bg-blue-300 content-center m-2 justify-self-end p-4 relative">
          <div className="cursor-pointer" onClick={toggleCartVisibility}>
            {isCartVisible ? 'Close' : 'Open'}
            {` Cart (${books_in_cart.length})`}
          </div>
          {isCartVisible &&
          <div className="bg-white absolute right-0 mt-4">
            <table>
              <thead>
                <th className="border p-2">Title</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Action</th>
                <th className="border p-2">Total</th>
              </thead>
              <tbody>
                {books_in_cart.map((book) => (
                  <tr key={book.id}>
                    <td className="border p-2">{book.title}</td>
                    <td className="border p-2">{book.author}</td>
                    <td className="border p-2">{book.price}</td>
                    <td className="border p-2">{book.quantity}</td>
                    <td className="border p-2">
                      <button onClick={() => handleRemoveFromCart(book)} className="bg-blue-500 text-white p-1 mx-1">Remove</button>
                    </td>
                    <td className="border p-2">{book.price * book.quantity}</td>

                  </tr>
                ))}
                
                <tr>
                  <td className="border p-2 font-bold">{"Total"}</td>
                  <td className="border p-2">{}</td>
                  <td className="border p-2">{}</td>
                  <td className="border p-2">{}</td>
                  <td className="border p-2">{}</td>
                  <td className="border p-2 font-bold">{totalCostOfBooksInCart()}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center p-4">
              <button onClick={() => handleEmptyCart()} className="bg-blue-500 text-white p-1 mx-1">Empty Cart</button>
              <button onClick={() => handlePurchase(user)} className="bg-blue-500 text-white p-1 mx-1">Checkout</button>
            </div>  
          </div>}
        </div>
        <h2 className="text-3xl font-bold text-white">Available Books</h2>
      </section>
      <table className="w-24 min-w-full  text-black border-separate border-spacing-2 border-slate-300 bg-slate-300">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.price}</td>
              <td className="border p-2 text-center">
                <button onClick={() => handleBorrow(book)} className="bg-blue-500 text-white p-1 mx-1">Borrow</button>
                <button onClick={() => handleAddToCart(book)} className="bg-blue-500 text-white p-1 mx-1">Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
