import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CustAdd = () => {
  const [customer, setCustomer] = useState({
    store_id: 1,
    first_name: '',
    last_name: '',
    email: '',
    address: '', // Add the "address" field
    address_id: 1,
  });


  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/add-customer', customer);
      const newCustomerId = response.data.customerId;
      
      // After successfully adding the customer, navigate to the customer IDs page with the new customer ID
      navigate(`/customer-ids/${newCustomerId}`); // Replace '/customer-ids' with the actual URL of your customer IDs page
    } catch (err) {
      console.log(err);
    }
  };
  

  return (    
    <div className="form">
        <h1>Movie Store</h1>
        <div className="buttons">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/movies">Movies</Link></button>
        <button><Link to="/customers">Customers</Link></button>
        <button><Link to="/reports">Reports</Link></button>
        </div>
      
      <h1>Add New Customer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={customer.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={customer.last_name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleInputChange}
        />
        <input
          type="text" // Use an appropriate input type (text, textarea, etc.) for the address
          name="address"
          placeholder="Address" // Update the placeholder text
          value={customer.address}
          onChange={handleInputChange}
        />
        {/* You can add more input fields for other customer details here */}
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default CustAdd;
