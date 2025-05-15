import axios from 'axios';
import React, { useState } from 'react';

const AddProduct = () => {
  const [product_name, setProductName] = useState('');
  const [product_description, setProductDescription] = useState('');
  const [product_cost, setProductCost] = useState('');
  const [product_photo, setProductPhoto] = useState(null);

  // Feedback states
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading('⏳ Processing, please wait...');
    setSuccess('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('product_name', product_name);
      formData.append('product_description', product_description);
      formData.append('product_cost', product_cost);
      formData.append('product_photo', product_photo);

      const response = await axios.post(
        'https://meshsetek.pythonanywhere.com/api/add_product',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setLoading('');
      setSuccess('✅ Product added successfully!');
      setProductName('');
      setProductDescription('');
      setProductCost('');
      setProductPhoto(null);
    } catch (error) {
      setLoading('');
      setSuccess('');
      setError('❌ ' + (error.response?.data?.Message || 'Something went wrong!'));
    }
  };

  return (
    <div className="row justify-content-center mt-4 mb-4">
      <div className="col-md-4 card shadow p-4">
        <h1 className="text-center" style={{ color: '#000' }}>🛍️ Add Product</h1>

        {loading && <p className="text-dark">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <input
            type="text"
            placeholder="📦 Enter Product Name"
            className="form-control"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
         
          /><br/>

          {/* Description input */}
          <textarea
            placeholder="📝 Enter Product Description"
            className="form-control"
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
            
          /><br/>

          {/* Cost input */}
          <input
            type="number"
            placeholder="💰 Enter Product Cost"
            className="form-control bg-secondary"
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          
          /><br/>

          {/* Product photo input */}
          <input
            type="file"
            className="form-control"
            onChange={(e) => setProductPhoto(e.target.files[0])}
    
          /><br/>

          {/* Submit button */}
          <button type="submit" >
            ➕ Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
