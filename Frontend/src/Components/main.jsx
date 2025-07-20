import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Payments from './Payments'
import Orders from './Orders'

//cart items formatting
const order = {items:[
  {
    _id: '676d4208ab82aab0410112e5',
    name:'welt', //name
    price:34, //cost of product
    quantity:2 //quantity of product
  },
  {
    _id: '676d4208ab82aab0410112e5',
    name:'mist', 
    price:43.56, 
    quantity:4
  },
  {
    _id: '676d4208ab82aab0410112e5',
    name:'mist', 
    price:43.56, 
    quantity:4
  }
]}
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
      orderDate: order.orderDate || new Date().toISOString() // Use current date if missing
    }));

    return { currentOrders: formattedOrders};
  }
   catch (error) {
    console.error('Error fetching orders:', error);
    return { currentOrders: []};
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
        status: item.status || 'Unknown', // Use 'Unknown' or some default status if missing
      })),
      totalAmount: order.orderDetails.totalAmount,
      orderDate: order.orderDate || new Date().toISOString() // Use current date if missing
    }));

    return { orderHistory: formattedOrders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { orderHistory: [] };
  }
};

fetchHistory().then(({ orderHistory})  => {
fetchCurrentOrders().then(({ currentOrders})  => {
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<Payments 
    username={"Brent"}  //pass username here
    esp={499}   //this is shipping charges. can be replaced by a function to calculate on the basis of each product but its better to give predefined charges
    orderDetails={order}  //passing order details
    currency="INR"    //currency of user's country
    locale="hi-IN"    //language of user's country
    usrAddress = "YADYAYDAYDYASDYSYADY"
    usrEmail = "broder@gmail.com"
    />*/}
    <Orders 
    currentOrders={currentOrders} orderHistory={orderHistory}
    currency="INR"    //currency of user's country
    locale="hi-IN"    //language of user's country
    />
  </StrictMode>,
)
})});
