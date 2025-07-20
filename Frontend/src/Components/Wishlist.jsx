import React, { useEffect, useState } from "react";
import { useCart } from "../Components/CartContext"; // Import the CartContext hook
import Heading from "./Heading";



const Wishlist = () => {
  const { wishlistItems, addToWishlist, removeFromWishlist, clearWishlist} = useCart();
  const handleRemoveItem = (id) => {
    removeFromWishlist(id); 
  };
  const handleClearWishlist = () => {
    clearWishlist();
  }
   console.log(wishlistItems);
     

  // Remove item from wishlist
  

  return (
    <>
    <Heading/>
  
    <div className="bg-purple-100 min-h-screen">
      {/* Header */}
      <div className="border-gray-300 rounded-lg m-5  shadow border bg-purple-50 shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => handleClearWishlist()} // Clear all items
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
            {wishlistItems.map((item) => (
               <div className="max-w-xs border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl 
               hover:bg-gray-50 hover:border border-gray-200">
      
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              > 
                <div className="w-full aspect-[6/7]"> 
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.name}   
                  </h2>
                  <p className="text-gray-600">$ {item.marketprice}</p>
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </>
  );
};

export default Wishlist;
