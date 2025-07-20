import React from "react";
import { useCart } from "../Components/CartContext";
import Heading from "./Heading";

function CartPage() {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart(); // Destructure the functions from the CartContext
  console.log(cartItems); // Check cart state after adding items

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity); // Call the updateQuantity function from context
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id); // Call the removeFromCart function from context
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.marketprice * item.quantity, 0);
  };

  return (
    <>
    <Heading/>
    <div className="container mx-auto p-4">
      
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="border-gray-300 rounded-lg shadow-md border bg-purple-50 lg:col-span-2  p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty!</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id} // Ensure unique key for each item
                className="flex items-center justify-between mb-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">Price: ₹{item.marketprice}</p>
                  <div className="flex items-center mt-2">
                    <label className="mr-2 text-gray-600">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value, 10)) // Use _id for consistency
                      }
                      className="border rounded px-2 py-1 w-16 text-center"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item._id)} // Use _id for consistency
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            
            ))
          )}
        </div>

        {/* Summary Section */}
        <div className="border-gray-300 rounded-lg shadow-md border bg-purple-50 p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">₹{calculateTotal()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tax (10%):</span>
            <span className="font-semibold">
              ₹{(calculateTotal() * 0.1).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Discount:</span>
            <span className="font-semibold">- ₹0.00</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
            <span>Total:</span>
            <span>
              ₹{(calculateTotal() + calculateTotal() * 0.1).toFixed(2)}
            </span>
          </div>
          <button className="mt-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-lg shadow-md">
           Buy Now
          </button>
        </div>
      </div>
    </div>
    </>
  );

}

export default CartPage;
