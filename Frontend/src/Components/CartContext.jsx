import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartNumbers, setCartNumbers] = useState(0);


  const addToCart = (product) => {
    setCartItems((prevItems) => {
     const existingItem = prevItems.find((item) => item._id === product._id);
       // Use _id here
      if (existingItem) {
        // If the product already exists, increase its quantity
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the product doesn't exist, add it as a new item
        return [...prevItems, { ...product, quantity: 1 }];

      }
    });
     setCartNumbers((prevCartNumbers) => {
      const existingItem = cartItems.find((item) => item._id === product._id);
      return existingItem ? prevCartNumbers : prevCartNumbers + 1;
    });

  };

 

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        // If the product already exists, return the previous state
        return prevItems;
      } else {
        // Add the new product to the wishlist
        return [...prevItems, product];
      }
    });
  };
  
  

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    setCartNumbers(cartNumbers - 1);

  };
  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  }
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };  


  return (
<CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    cartNumbers
  }}
>
      {children}
    </CartContext.Provider>
  );
};
