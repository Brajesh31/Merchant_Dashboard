import React, { useState, useEffect } from 'react';
import './dashboard.css';
import IndiaPost from "../assets/IndiaPost.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend ,BarElement, CategoryScale, LinearScale,} from "chart.js";
import { Bar,Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(BarElement,CategoryScale,LinearScale,ArcElement, Tooltip, Legend);

export default function Dashboard(){
  
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [message,setMessage]=useState("");
  const [isProfile,setProfile]=useState("");
  const [loadingProfile,setLoadingProfile]=useState(true);

  useEffect(() => {
    const fetchProfileAndProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const profileInfo = await response.json();
        setProfile(profileInfo.userName);  // Set the user's name (optional)
        console.log("Profile data:", profileInfo.userName);
        
        // Set the products (merchandise) returned by the backend
        setProducts(profileInfo.merchandise);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile or products:", error);
        setLoading(false);
      }
    };
  
    fetchProfileAndProducts();
  }, []);
  

  useEffect(()=>{
    if(loading) setMessage("Loading....");
    else if(products.length===0) setMessage(<>No products to display,click to <a href="/dashboard/addproduct">add</a></>);
    else setMessage("");
  },[loading,products]);

  const data = {
    labels: ["In-stock", "Low-stock", "Out-of-stock"],
    datasets: [
      {
        label: "Stock Distribution",
        data: [50,20,10],
        backgroundColor: ["#cf82b4", "#7e5170", "#4e3144"],
        hoverOffset:8,
        borderWidth:0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%", 
    plugins: {
      legend: {
        position: "bottom", 
        labels: {
          color: "#333", 
          font: {
            size:9,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff", 
        bodyColor: "#000", 
        borderWidth: 1,
        borderColor: "#ddd",
      },
    },
  };

  const data1= {
    labels: ["January", "February", "March", "April", "May","June"], 
    datasets: [
      {
        label: "Revenue ( Offline Stores)",
        data: [5000, 7000, 8000, 6000, 9000,10000], 
        backgroundColor: "rgba(119, 0, 136, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Revenue ( E-commerce)",
        data: [4000, 8000, 9000, 2000, 4000,13000], 
        backgroundColor: "rgba(126, 81, 112, 1)",
        borderWidth: 1,
      }
    ],
  };


  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true, 
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Past 6 Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue", 
        },
        beginAtZero: true,
      },
    },
  };

  const navigate = useNavigate();
  
  const handleSubmit=()=>{
   navigate("/Merchant/addproduct");
  };


  return (
    <>
    {isProfile?(<>
      <h3 style={{marginLeft:"90px",color:"rgba(102, 102, 102, 1)"}}>Welcome {isProfile}!, Manage the Merchandise of Company</h3>
    <div className='panel'>
      <div className='stock'>
        <h6 style={{color:"#666"}}>Orders Requested for dispatch-E-commerce</h6>
        <h1 style={{color: "#7e5170", marginTop :"-30px"}}>12</h1>
        <h6 style={{color:"#666"}}>Orders Requested for dispatch-Stores</h6>
        <h1 style={{color: "#7e5170", marginTop :"-30px"}}>41</h1>
        <div className='status_buttons'>
        <button>Dispatch Requests</button>
        </div>
      </div>

      <div className='revenue-chart'>
      <h6 style={{ textAlign: "center",color:"rgba(102, 102, 102, 1)" }}>Monthly Revenue</h6>
        <div style={{ width: "500px", margin: "10px" }}>
        <Bar data={data1} options={options1} />
        </div>
      </div>

      <div className='chart'>
        <div style={{ width: "200px", margin: "auto" }}>
           <h6 style={{ textAlign: "center", margin: "20px",color:"rgba(102,102,102,1)"}}>
           Stock Distribution
          </h6>
          <Doughnut data={data} options={options}/>
        </div>
      </div>

    </div>



      <div className='panel2'>

      <div className='suggestion'>
      <h6>Inventory Suggestions</h6>
      <div className='suggestion_box'>No suggestions for now</div> 
      </div>  

      <div className="status_container">
        <div className="status_buttons">
          <h2>Manage your inventory</h2>
          <button onClick={handleSubmit}>Add New Products</button>
          <button>Manage Inventory</button>
        </div>
      </div>

      </div>




      <h3 className='recent'>Recently added Merchandise</h3>
      <div className="product-container">
        <h4>{message}</h4>
        {products.slice(0,5).map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{product.marketprice}</p>
          <p className="product-price">{product.category}</p>
          <p className="product-price">{product.subcategory}</p>
          <p className="product-price">{product.description}</p>
          <p className="product-price">Available:{product.totalQuantity}</p>
        </div>
      ))}
      </div>
  

      <div className='panel'>
      <div className='registered'>
           <h6 style={{ textAlign: "center", margin: "20px",color:"rgba(102,102,102,1)"}}>
           Registered E-comm domains
          </h6>
      </div>

      <div className='registered'>
           <h6 style={{ textAlign: "center", margin: "20px",color:"rgba(102,102,102,1)"}}>
           Offline Store supplies
          </h6>
      </div>






    </div>
    </>):(<>
    <div>Complete your profile to continue</div>
    </>
    )}
    </>
  );
}