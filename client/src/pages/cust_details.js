import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});
  const [rentedMovies, setRentedMovies] = useState([]);
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [editedCustomerInfo, setEditedCustomerInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerResponse = await axios.get(`http://localhost:4000/customers/${customerId}`);
        setCustomer(customerResponse.data);

        // Fetch the list of rented movies for the customer
        const rentedMoviesResponse = await axios.get(`http://localhost:4000/customers/${customerId}/rented-movies`);
        setRentedMovies(rentedMoviesResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  const handleDeleteCustomer = async () => {
    try {
      // Send a request to delete the customer by customer ID
      await axios.delete(`http://localhost:4000/customers/${customerId}`);
      // Redirect back to the customer list page after deletion
      navigate('/customers'); 
    } catch (err) {
      console.log(err);
    }
  };

  const handleReturnMovie = async (customerId, movieId) => {
  
    try {
      console.log('customerId:', customerId);
      console.log('movieId:', movieId);
  
      // Send a request to return the rented movie
      await axios.put(`http://localhost:4000/customers/${customerId}/return-movie/${movieId}`);
      

      navigate(`/customers`);
      
    } catch (err) {
      console.error(err);
    }
  };
  
  

  const handleEditCustomer = () => {
    setEditMode(true); // Enter edit mode
    // Populate the form fields with the existing customer data
    setEditedCustomerInfo({
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false); // Exit edit mode
  };

  const handleSaveEdit = async () => {
    try {
      // Send a PUT request to update the customer's information on the backend
      await axios.put(`http://localhost:4000/customers/${customerId}/edit`, editedCustomerInfo);
      // Optionally, you can fetch and update the customer data after editing
      const editCustResponse = await axios.get(`http://localhost:4000/customers/${customerId}`);
      setCustomer(editCustResponse.data);
      // Exit edit mode
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      <h1>Customer Details</h1>
      <div className="buttons">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/movies">Movies</Link></button>
        <button><Link to="/customers">Customers</Link></button>
        <button><Link to="/reports">Reports</Link></button>
        {editMode ? (
          <>
            <button onClick={handleSaveEdit}>Save Changes</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEditCustomer}>Edit Customer Info</button>
        )}
      </div>
      <div className="customer-details">
        <h2>{`${customer.first_name} ${customer.last_name}`}</h2>
        {editMode ? (
          // Display the edit form when in edit mode
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={editedCustomerInfo.first_name}
              onChange={(e) =>
                setEditedCustomerInfo({
                  ...editedCustomerInfo,
                  first_name: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editedCustomerInfo.last_name}
              onChange={(e) =>
                setEditedCustomerInfo({
                  ...editedCustomerInfo,
                  last_name: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={editedCustomerInfo.email}
              onChange={(e) =>
                setEditedCustomerInfo({
                  ...editedCustomerInfo,
                  email: e.target.value,
                })
              }
            />
          </div>
        ) : (
          // Display customer details when not in edit mode
          <>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Address ID:</strong> {customer.address_id}</p>
          </>
        )}
        <h3>Rented Movies:</h3>
        <ul>
                {rentedMovies.map((movie) => (
          <li key={movie.film_id}>
            {movie.title}
            <button onClick={() => handleReturnMovie(customerId, movie.film_id)}>Return</button>
          </li>
        ))}

        </ul>
        {editMode ? null : (
          <button onClick={handleDeleteCustomer}>Delete Customer</button>
        )}
        <button><Link to="/customers">Back to Customer List</Link></button>
      </div>
    </div>
  );
};

export default CustomerDetails;
