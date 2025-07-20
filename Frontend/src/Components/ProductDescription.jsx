import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import "./ProductDescription.css";
import Heading from "./Heading";


const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); 
  const {addToWishlist} = useCart();

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    return (originalPrice - (originalPrice * (discountPercentage / 100))).toFixed(2);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/auth/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const discountedPrice = calculateDiscountedPrice(product.marketprice, 10); // Example with 10% discount

  return (
    <>
    <Heading/>
    <div className="product-container">
      {/* Image Section */}
      <div className="image-section">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Details Section */}
      <div className="details-section">
      <div className="flex">  <h2 className="product-title">{product.name}</h2>  
      <p className="para">
      <button onClick={() => addToWishlist(product)} className="rounded-md bg-purple-800 mx-20 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow hover:bg-purple-600" type="button">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
    <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
  </svg>
</button>
</p>
  </div>
        <p className="product-id">{product.category} , {product.subcategory}</p>
        <div className="ratings">
          <span>⭐ 3.4</span>
          <span>(133 ratings)</span>
          <span>50+ bought in the past month</span>
        </div>

        {/* Pricing Section */}
        <div className="pricing">
          <span className="discounted-price">₹{discountedPrice}</span>
          <span className="original-price">₹{product.marketprice}</span>
          <span className="discount">-10%</span>
        </div>
        <p>Inclusive of all taxes</p>

        {/* Offers Section */}
        <div className="offers">
          <p>Offers:</p>
          <ul>
            <li>No Cost EMI starts at ₹111</li>
            <li>Bank Offer: Up to ₹2,000 off on select Credit Cards</li>
            <li>Partner Offer: Get GST invoice and save up to 28%</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="actions">
          <button onClick={() => addToCart(product)} className="add-to-cart">
            Add to Cart
          </button>
          <button className="buy-now">Buy Now</button>
        </div>

        {/* Description */}
        <div className="about">
          <h1>Product Details</h1>
          <p><b>Product Dimensions  : </b> 25 x 20 x 4 cm; 690 g</p>
          <p><b>Manufacturer  :  </b>Miss Ethnik</p>
          <p><b>Item Weight  :  </b>690 g</p>
          <p><b>Item Dimensions LxWxH  :  </b>25 x 20 x 4 Centimeters</p>
          <p><b>Net Quantity  : </b> 1.00 count</p>
          <p><b>Generic Name  :  </b>{product.name}</p>
          <p><b>Description  :  </b>{product.description}</p>
        </div>
        
        <hr></hr>

        {/* Review Form */}
        <form className="review-form">
          <h3>Add Your Review</h3>
          <p>User Name</p>
          <textarea name="comment" placeholder="Your Review" required></textarea>
          <select name="rating" required>
            <option value="0">Select Rating</option>
            <option value="5">⭐5</option>
            <option value="4">⭐4</option>
            <option value="3">⭐3</option>
            <option value="2">⭐2</option>
            <option value="1">⭐1</option>
          </select>
          <br />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ProductDescription;
