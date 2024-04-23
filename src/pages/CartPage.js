import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const appContext = useContext(AppContext);



  const deleteItemFromCart = (id) => {
    const newCartItems = appContext.cartItems.filter((item) => item.id !== id);
    appContext.setCartItems(newCartItems);
    toast("Item Removed from cart!");
  };

  const handleQuantityChange = (e, id) => {
    const newQuantity = parseInt(e.target.value);
    const newCartItems = appContext.cartItems.map((item) => {
      if (item.id === id) {
        toast.success("Quantity changed");
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    appContext.setCartItems(newCartItems);
  };

  const calculateTotal = () => {
    return appContext.cartItems.reduce((total, item) => {
      if (item.saleInfo.retailPrice) {
        appContext.setCartTotal(total + item.saleInfo.retailPrice.amount * item.quantity)
        return total + item.saleInfo.retailPrice.amount * item.quantity;
      } else {
        appContext.setCartTotal(total)
        return total;
      }
    }, 0);
  };
  const [cart, setCart]= useState(false)
  function cartLoader(){
    if(appContext.cartItems.length===0){
      setCart(false)
    } else{
      setCart(true)
    }
  }

  useEffect(()=>{
cartLoader()
  },[appContext.cartItems.length])

  return (
    <div className="max-w-2xl mx-auto mt-16">
      {appContext.cartItems.map((item) => {
        return (
          <div
            key={item.id}
            className="shadow-md px-6 py-2 rounded-md flex items-center gap-12"
          >
            {item.volumeInfo.imageLinks ? (
              <img
                src={item.volumeInfo.imageLinks.thumbnail}
                alt={item.volumeInfo.title}
                className="h-24 w-24 object-contain"
              />
            ) : (
              "Cover-picture not available"
            )}

            <div>
              <Link to={`/product/${item.id}`}>
                <p className="text-lg font-bold hover:bg-slate-200 dark:hover:text-black">
                  {item.volumeInfo.title}
                </p>
              </Link>

              <div className="flex gap-1 text-xs p-1">
                Item price- INR
                {item.saleInfo.retailPrice ? (
                  <p className="font-bold">
                    {item.saleInfo.retailPrice.amount}
                  </p>
                ) : (
                  <p className="font-bold">{0.0}</p>
                )}
              </div>
              <div className="flex gap-1">
                <select
                  className="bg-white dark:bg-slate-500 rounded"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item.id)}
                >
                  {[...Array(20).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    deleteItemFromCart(item.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {cart ? (
        <div>
          <div className="mt-6 flex justify-between items-center px-5">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-xl">INR {calculateTotal().toFixed(2)}</p>
          </div>
          <div className="flex justify-end px-2">
            <Link to="/checkout">
              <button className="rounded bg-green-300 text-black p-1 mt-5">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl font-bold">No item in the cart!</p>
      )}
    </div>
  );
}
