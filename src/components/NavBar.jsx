import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/admin" className="text-white">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/add-books" className="text-white">Add Books</Link>
        </li>
        <li>
          <Link to="/admin/borrowed-books" className="text-white">Borrowed Books</Link>
        </li>
        <li>
          <Link to="/admin/purchased-books" className="text-white">Purchased Books</Link>
        </li>
        <li>
          <Link to="/admin/remove-book" className="text-white">Remove Book</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;






