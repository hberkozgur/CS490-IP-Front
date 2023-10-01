import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CustomerDetails = () => {
  const { customerId } = useParams();
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
            </li>
          ))}
        </ul>
        <button><Link to="/customers">Back to Customer List</Link></button>
      </div>
    </div>
  );
};

export default CustomerDetails;
