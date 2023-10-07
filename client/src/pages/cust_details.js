import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});
  const [rentedMovies, setRentedMovies] = useState([]);

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
      navigate('/customers'); // Use a relative path, not the full URL
    } catch (err) {
      console.log(err);
    }
  };

  const handleReturnMovie = async (movieId) => {
    try {
      // Send a request to return the rented movie
      await axios.put(`http://localhost:4000/customers/${customerId}/return-movie/${movieId}`);
      // After successfully returning the movie, fetch the updated list of rented movies
      const rentedMoviesResponse = await axios.get(`http://localhost:4000/customers/${customerId}`);
      setRentedMovies(rentedMoviesResponse.data);
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
      </div>
      <div className="customer-details">
        <h2>{`${customer.first_name} ${customer.last_name}`}</h2>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Address ID:</strong> {customer.address_id}</p>
        <h3>Rented Movies:</h3>
        <ul>
          {rentedMovies.map((movie) => (
            <li key={movie.movie_id}>
              {movie.title}
              <button onClick={() => handleReturnMovie(movie.film_id)}>Return</button>
            </li>
          ))}
        </ul>
        <button onClick={handleDeleteCustomer}>Delete Customer</button>
        <button><Link to="/customers">Back to Customer List</Link></button>
      </div>
    </div>
  );
};

export default CustomerDetails;
