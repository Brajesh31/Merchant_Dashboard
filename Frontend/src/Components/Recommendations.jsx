import React, { useEffect, useState } from 'react';
import RecommendationCard from './RecommendationCard';

const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/recommendations', {
          method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response JSON and extract products
        const data = await response.json();
        setProducts(data.products);  // Correctly access products from the response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 m-8">
      {products.map((product) => (
        <RecommendationCard
          key={product._id}
          image={product.image}
          productName={product.name}
          productId={product._id}
        />
      ))}
    </div>
  );
};

export default Recommendations;
