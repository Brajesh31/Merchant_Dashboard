import React from 'react';
import { Link } from 'react-router-dom'; 
import default_product_image from '../assets/default_product_image.png';

const RecommendationCard = ({image, productName, productId }) => {
  return (
    <div className="max-w-xs bg-white border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl 
           hover:bg-violet-100 hover:border border-gray-200">
      <Link to={`/productdescription/${productId}`}>
        <div className="w-full aspect-[4/5]">
          <img
            src={image}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {productName}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default RecommendationCard;
