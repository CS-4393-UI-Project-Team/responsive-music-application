import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Whatever It Takes",
      artist: "Imagine Dragons",
      price: 2.5,
      quantity: 1,
      image: "path/to/song_image_1.jpg",
    },
    {
      id: 2,
      name: "Softcore",
      artist: "The Neighbourhood",
      price: 2.0,
      quantity: 1,
      image: "path/to/song_image_2.jpg",
    },
    {
      id: 3,
      name: "Living Proof",
      artist: "Evxn",
      price: 1.75,
      quantity: 1,
      image: "path/to/song_image_3.jpg",
    },
  ]);

  const handleQuantityChange = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increment"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : item.quantity,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Content */}
        <div className="flex-grow p-6 flex gap-6 overflow-auto">
          {/* Cart Items Section */}
          <div className="w-2/3 pr-6">
            <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-4 p-4 bg-[#1b1b1b] rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mr-4 rounded-md"
                  />
                  <div className="flex flex-col flex-grow">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-400 text-sm">{item.artist}</p>
                    <p className="font-bold mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, "decrement")}
                      className="px-2 py-1 bg-[#06A0B5] rounded-lg text-white"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, "increment")}
                      className="px-2 py-1 bg-[#06A0B5] rounded-lg text-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-[#FF4C4C] text-lg font-bold ml-4 cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Your cart is empty.</p>
            )}

            {cartItems.length > 0 && (
              <div className="mt-6">
                <p className="text-xl font-bold">
                  Subtotal: ${calculateTotal()}
                </p>
              </div>
            )}
          </div>

          {/* Card Details Section */}
          <div className="w-1/3 p-6 bg-[#1b1b1b] rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Card Details</h2>
            <form className="flex flex-col gap-4">
              <div className="flex gap-4 mb-4">
                <FontAwesomeIcon
                  icon={faCcVisa}
                  className=" text-5xl"
                  style={{ color: "#1A1F71" }}
                  title="Visa"
                />
                <FontAwesomeIcon
                  icon={faCcMastercard}
                  className="text-5xl"
                  style={{ color: "#E4002B" }}
                  title="Mastercard"
                />
                <FontAwesomeIcon
                  icon={faCcAmex}
                  className=" text-5xl"
                  style={{ color: "#0079BE" }}
                  title="American Express"
                />
              </div>
              <input
                type="text"
                placeholder="Name on card"
                className="p-2 bg-[#2b2b2b] rounded-md text-white"
              />
              <input
                type="text"
                placeholder="Card Number"
                className="p-2 bg-[#2b2b2b] rounded-md text-white"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Expiration date (mm/yy)"
                  className="p-2 bg-[#2b2b2b] rounded-md text-white w-1/2"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-2 bg-[#2b2b2b] rounded-md text-white w-1/2"
                />
              </div>
              <button
                type="button"
                className="mt-6 bg-[#06A0B5] px-4 py-2 text-lg font-bold rounded-lg text-white hover:bg-[#048E9B] transition"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
