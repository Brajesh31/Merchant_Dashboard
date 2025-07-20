import React, { useState, useEffect } from 'react';
import './SellProducts.css'

const ProductForm = () => {
  const [choice, setChoice] = useState('null'); 
  const [formData, setFormData] = useState({
    key:'',
    name: '',
    category: '',
    subcategory: '',
    description: '',
    wholesaleprice: '',
    marketprice: '',
    minQuantity: '',
    minQuantityEcomm: '',
    totalQuantity: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleFormSubmit=async(event)=>{
   event.preventDefault()

   const updatedFormData = {
    ...formData,
    key: setFormKey(choice), 
  };

   try {
    const response = await fetch('http://localhost:5000/auth/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedFormData),
    });
    console.log()
    const data = await response.json();
    if (data.success) {
      console.log('Added Product', data);
    } else {
      console.log('Unable to add product', data.message);
    }
  } catch (err) {
    console.error('Error adding product:', err);
  }
 }

 const setFormKey = (choice) => {
  switch (choice) {
    case 'form1':
      return 'offline'; 
    case 'form2':
      return 'ecomm'; 
    case 'form3':
      return 'ecooff';
    default:
      return '';
  }
};

  useEffect(() => {
    setFormData({
      name: '',
      category: '',
      subcategory: '',
      description: '',
      wholesaleprice: '',
      marketprice: '',
      minQuantity: '',
      minQuantityEcomm: '',
      totalQuantity: '',
      image: '',
    });
  }, [choice]);

  return (
    <div className='Sell'>

    <div className='tleft'>
    <h2 style={{alignContent:"center", justifyContent:"center", fontWeight:"50",padding:"70px"}}>Add New Products in Stock</h2>
    </div>

    <div className='tright'>
      {choice==='null' && (
        <>
      <button onClick={() => setChoice('form1')} className='status-buttons'>For Offline Markets in Wholesale</button>
      <button onClick={() => setChoice('form2')} className='status-buttons'>For Ecomm platfroms in market price</button>
      <button onClick={() => setChoice('form3')} className='status-buttons'>For both Offline and E-comm platforms</button>
      </>
      )}

      {choice === 'form1' && (
       <> 
        <button onClick={() => setChoice("null")} className="back_button">
         Back
        </button>
        <h3 style={{ fontWeight: 50, padding: "30px",justifyContent: "center", alignItems:"center"}}>
         Only for Offline Markets in Wholesale
        </h3>
        <form onSubmit={handleFormSubmit}>
        <div className='form-row'>
        <div className="left-section" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
          <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
         <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Subcategory</label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            placeholder="Subcategory"
          />
          </div>
       
         <div className="right-section" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
         <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Wholesale Price</label>
          <input
            type="number"
            name="wholesaleprice"
            value={formData.wholesaleprice}
            onChange={handleInputChange}
            placeholder="Wholesale Price"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Mn Quantity for purchase</label>
          <input
            type="number"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleInputChange}
            placeholder="Min Quantity"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Quantity to add</label>
          <input
            type="number"
            name="totalQuantity"
            value={formData.totalQuantity}
            onChange={handleInputChange}
            placeholder="Total Quantity"
          />
          </div>
          </div>
          <div className='submit-row'>
          <button className="add-button" type="submit">Submit</button>
          </div>
        </form>
       </> 
      )}

      {choice === 'form2' && (
        <>
         <button onClick={() => setChoice("null")} className="back_button">
         Back
        </button>
        <h3 style={{ fontWeight: 50, padding: "30px",justifyContent: "center", alignItems:"center"}}>
        Only for E-commerce platforms in market price
        </h3>
        <form onSubmit={handleFormSubmit}>
        <div className="form-row">  
        <div className="left-section" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
        <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Subcategory</label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            placeholder="Subcategory"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Description</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          </div>
        
          <div className="right-section" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
          <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Market Price</label>
          <input
            type="number"
            name="marketprice"
            value={formData.marketprice}
            onChange={handleInputChange}
            placeholder="Market Price"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Min Quantity to purchase</label>
          <input
            type="number"
            name="minQuantityEcomm"
            value={formData.minQuantityEcomm}
            onChange={handleInputChange}
            placeholder="Min Quantity for E-Commerce"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Total Quantity to add</label>
          <input
            type="number"
            name="totalQuantity"
            value={formData.totalQuantity}
            onChange={handleInputChange}
            placeholder="Total Quantity"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Google dirve link of product</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          </div>
          </div>
          <div className='submit-row'>
          <button className="add-button" type="submit">Submit</button>
          </div>
        </form>
        </>
      )}

      {choice === 'form3' && (
        <>
         <button onClick={() => setChoice("null")} className="back_button">
         Back
        </button>
        <h3 style={{ fontWeight: 50, padding: "30px",justifyContent: "center", alignItems:"center"}}>
        For both Offline and E-comm platforms
        </h3>
        <form onSubmit={handleFormSubmit}>
        <div className="form-row">  
        <div className="left-section" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
        <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Sub-Category</label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            placeholder="Subcategory"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Description</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Market Price</label>
          <input
            type="number"
            name="marketprice"
            value={formData.marketprice}
            onChange={handleInputChange}
            placeholder="Market Price"
          />
          </div>
         
          <div className="right-section" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
          <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Wholesale Price</label>
          <input
            type="number"
            name="wholesaleprice"
            value={formData.wholesaleprice}
            onChange={handleInputChange}
            placeholder="Wholesale Price"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Mn qn to purchase Wholesale</label>
          <input
            type="number"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleInputChange}
            placeholder='Minimum Quantity to purchase in wholesale'
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Min Quantity for E-Commerce</label>
          <input
            type="number"
            name="minQuantityEcomm"
            value={formData.minQuantityEcomm}
            onChange={handleInputChange}
            placeholder="Min Quantity for E-Commerce"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Total Quantity to add</label>
          <input
            type="number"
            name="totalQuantity"
            value={formData.totalQuantity}
            onChange={handleInputChange}
            placeholder="Total Quantity"
          />
           <label htmlFor="name" style={{ fontSize: "12px", fontWeight: "normal" }}>Google dirve link of product</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          </div>
          </div>
          <div className='submit-row'>
          <button className="add-button" type="submit">Submit</button>
          </div>
        </form>
        </>
      )}
     </div>

   </div> 
  );
};

export default ProductForm;
