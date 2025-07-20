import React, { useState, useEffect } from 'react';
import './Order.css'; // Include the CSS for styling

const Orders = ({ currency, locale }) => {
  const [activeSection, setActiveSection] = useState('current');
  const [currentOrders, setCurrentOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const fetchCurrentOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders/current');
      const rawOrders = await response.json();
  
      const formattedOrders = rawOrders.map(order => ({
        items: order.orderDetails.items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          status: item.status
        })),
        totalAmount: order.orderDetails.totalAmount,
        orderDate: order.orderDate || new Date().toISOString()
      }));
  
      setCurrentOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching current orders:', error);
      setCurrentOrders([]);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders/history');
      const rawOrders = await response.json();
  
      const formattedOrders = rawOrders.map(order => ({
        items: order.orderDetails.items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          status: item.status || 'Unknown'
        })),
        totalAmount: order.orderDetails.totalAmount,
        orderDate: order.orderDate || new Date().toISOString()
      }));
  
      setOrderHistory(formattedOrders);
    } catch (error) {
      console.error('Error fetching order history:', error);
      setOrderHistory([]);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchCurrentOrders();
    fetchHistory();
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div className="w-screen h-screen bg-gray-200 orders-container">
      {/* Current Orders Section */}
      <div
        className={`orders-section current-orders ${activeSection === 'current' ? 'expanded' : 'collapsed'}`}
        onClick={() => handleSectionClick('current')}
      >
        <h2>Current Orders</h2>
        <div className="order-list">
          {currentOrders > 0 ? (
            currentOrders.map((order, index) => (
              <div key={index} className="order-card">
                <h3>Order {index + 1}</h3>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-500">Q: {item.quantity}</span>
                      <span className="text-gray-500">{formatCurrency(item.price)}</span>
                      <span
                        className={`${
                          item.status === 'Completed'
                            ? 'text-green-500'
                            : item.status === 'Cancelled'
                            ? 'text-red-500'
                            : item.status === 'Returned'
                            ? 'text-purple-500'
                            : 'text-gray-500'
                        }`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
                <p>Total: {formatCurrency(order.totalAmount)}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No current orders</p>
          )}
        </div>
      </div>

      {/* Order History Section */}
      <div
        className={`orders-section order-history ${activeSection === 'history' ? 'expanded' : 'collapsed'}`}
        onClick={() => handleSectionClick('history')}
      >
        <h2>Order History</h2>
        <div className="order-list">
          {orderHistory.length > 0 ? (
            orderHistory.map((order, index) => (
              <div key={index} className="order-card">
                <h3>Order {index + 1}</h3>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-500">Q: {item.quantity}</span>
                      <span className="text-gray-500">{formatCurrency(item.price)}</span>
                      <span
                        className={`${
                          item.status === 'Completed'
                            ? 'text-green-500'
                            : item.status === 'Cancelled'
                            ? 'text-red-500'
                            : item.status === 'Returned'
                            ? 'text-purple-500'
                            : 'text-gray-500'
                        }`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
                <p>Total: {formatCurrency(order.totalAmount)}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No past orders</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
