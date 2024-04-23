import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const appContext = useContext(AppContext);
  console.log(appContext); //Needed to be removed later
  const isInCart =
  appContext.cartItems.findIndex((item) => item.id === product.id) !== -1;
  function addItemToCart() {
    const productIndex = appContext.cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (productIndex !== -1) {
      const newCartItems = appContext.cartItems.map((item, index) => {
        if (index === productIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
      });
      appContext.setCartItems(newCartItems);
    } else {
      appContext.setCartItems([
        ...appContext.cartItems,
        { ...product, quantity: 1 },
      ]);
    }
    toast.success("Item added to the cart");
  }

  return (
    <div className="w-40 shadow-md rounded-md overflow-hidden m-2 dark:bg-slate-600 hover:bg-slate-300 hover:text-black">
      <div className="grid justify-items-center gap-2 p-1">
        <Link to={`/product/${product.id}`}>
          {product.volumeInfo.imageLinks ? (
            <img
              src={product.volumeInfo.imageLinks.thumbnail}
              alt={product.volumeInfo.title}
            />
          ) : (
            "Cover-picture not available"
          )}

          <h1 className="font-bold text-center">{product.volumeInfo.title}</h1>
          <div className="grid justify-items-left text-sm">
            {product.volumeInfo.authors
              ? product.volumeInfo.authors.map((author, index) => (
                  <ul
                    className="list-disc list-inside text-sm grid justify-items-left"
                    key={index}
                  >
                    <li>{`${author}\n`}</li>
                  </ul>
                ))
              : "Unknown Author(s)"}
          </div>
        </Link>
      </div>

      <div className="grid p-2 justify-left items-end">
        <div className="flex text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            fill="currentColor"
            className="w-6 h-6 text-yellow-400"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-thin">
            {product.volumeInfo.averageRating
              ? `${product.volumeInfo.averageRating}/10 (${product.volumeInfo.ratingsCount})`
              : "Not rated yet"}
          </p>
        </div>

        <h1 className="grid font-bold">
          {product.saleInfo.retailPrice
            ? `INR ${product.saleInfo.retailPrice.amount}`
            : `INR ${0.0}`}
        </h1>
{isInCart? (        <button
          onClick={() => addItemToCart()}
          className="flex flex-wrap bg-green-200 rounded text-slate-500 rounded justify-center w-full p-1 text-sm"
        >
          Added to cart
    
        </button>):(        <button
          onClick={() => addItemToCart()}
          className="flex flex-wrap bg-amber-300 rounded text-black justify-center w-full p-1 text-sm hover:bg-green-300"
        >
          Add to cart
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
        </button>)}

      </div>
    </div>
  );
}
