import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40&filter=paid-ebooks`;
  async function fetchResults() {
    if(searchTerm){
        setLoading(true)
        const response = await fetch(searchURL);
        const data = await response.json();
        setProducts(data.items);
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchResults();
  }, [searchTerm]);

  return (
    <div>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search books!"
          required
        />
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        {searchTerm ? (
          loading ? (
            <Loader />
          ) : (
            products.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })
          )
        ) : (
          <p className="text-3xl font-bold text-slate-200 text-center p-2">
            Type your desired keyword to start searching books
          </p>
        )}
      </div>
    </div>
  );
}
