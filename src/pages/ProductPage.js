import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import SetInnerHTML from "../components/SetInnerHTML";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const productUrl = `https://www.googleapis.com/books/v1/volumes/${id}`;

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const appContext = useContext(AppContext);

  async function fetchProduct() {
    const response = await fetch(productUrl);
    const data = await response.json();
    setProduct(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

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
    <div className="grid justify-items-center">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex gap-6 p-3">
            {product.volumeInfo.imageLinks ? (
              <img
                src={product.volumeInfo.imageLinks.thumbnail}
                alt={product.volumeInfo.title}
              />
            ) : (
              "Cover-picture not available"
            )}
            <div className="content-center">
              <p className="text-lg font-bold">{product.volumeInfo.title}</p>
              {product.volumeInfo.authors
                ? product.volumeInfo.authors.map((item, i) => (
                    <ul className="list-disc list-inside text-sm" key={i}>
                      <li>{`${item}\n`}</li>
                    </ul>
                  ))
                : "Unknown Author(s)"}
              <div className="text-sm font-thin">
                {product.volumeInfo.categories
                  ? product.volumeInfo.categories.map((item) => `${item}`)
                  : "Genere/category not available"}
              </div>
              <br />

              <div className="flex font-thin text-sm">
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
                <p>
                  {product.volumeInfo.averageRating
                    ? `${product.volumeInfo.averageRating}/10 (${product.volumeInfo.ratingsCount})`
                    : "Not rated yet"}
                </p>
              </div>
              <h1 className="text-xl grid">
                {product.saleInfo.retailPrice
                  ? `INR ${product.saleInfo.retailPrice.amount}`
                  : `INR ${0.0}`}

                {isInCart ? (
                  <div className="flex gap-7">
                    <p className="bg-green-200 rounded text-slate-500 justify-center p-2 text-sm">Added to cart</p>
                    <Link to='/cart'><button className="bg-amber-200 px-2 text-black rounded-md mt-1">Go to cart</button></Link>
                  </div>
                ) : (
                  <button
                  onClick={() => addItemToCart()}
                  className="flex flex-wrap bg-amber-300 rounded text-black justify-center p-1 text-sm w-40"
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
                </button>
                )}

                
              </h1>
            </div>
          </div>

          <div className="font-thin p-3 text-justify">
            <SetInnerHTML
              text={`Description- ${product.volumeInfo.description}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
