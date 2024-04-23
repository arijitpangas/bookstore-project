import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const appContext = useContext(AppContext);
  console.log(appContext.cartItems.length);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [cart, setCart] = useState(false);
  function cartLoader() {
    if (appContext.cartItems.length === 0) {
      setCart(false);
    } else {
      setCart(true);
    }
  }

  useEffect(() => {
    cartLoader();
  }, [appContext.cartItems.length]);

  return (
    <nav className="bg-cyan-600 text-white p-4 top-0 left-0 w-full z-10 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Name */}
        <Link to="/" className="text-2xl font-bold">
          fakeBooks
        </Link>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex items-center space-x-4 text-lg font-bold">
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
          <Link
            to="/search"
            className="hover:text-blue-700 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Search
          </Link>
          <Link
            to="/cart"
            className="hover:text-blue-700 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <div className="flex">
              <p>Cart</p>
              {cart ? (
                <div>
                  <p className="text-xs ml-1 font-bold bg-red-400 rounded-full px-0.5">
                    {appContext.cartItems.length}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
          <Link to="/" className="hover:text-blue-700 font-bold">
            Home
          </Link>
          <Link
            to="/search"
            className="hover:text-blue-700 flex items-center gap-1 font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Search
          </Link>
          <Link
            to="/cart"
            className="hover:text-blue-700 flex items-center gap-1 font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <div className="flex">
              <p>Cart</p>
              {cart ? (
                <div>
                  <p className="text-xs ml-1 font-bold bg-red-400 rounded-full px-0.5">
                    {appContext.cartItems.length}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
