import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showRentDialog, setShowRentDialog] = useState(false); // State to control the rent dialog
  const [selectedMovieId, setSelectedMovieId] = useState(null); // State to store the selected movie ID
  const [customerID, setCustomerID] = useState(''); // State to store the customer ID entered by the user

  useEffect(() => {
    // Fetch movies from your API
    axios.get('http://localhost:4000/movies_all')
      .then((response) => {
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter movies based on the search term
    const filtered = movies.filter((movie) => {
      const hasTitle = movie.title.toLowerCase().includes(searchValue);
      const hasActors = movie.actors.toLowerCase().includes(searchValue);
      const hasGenres = movie.genre.toLowerCase().includes(searchValue);

      return hasTitle || hasActors || hasGenres;
    });

    setFilteredMovies(filtered);
  };

  const openRentDialog = (movieId) => {
    setSelectedMovieId(movieId);
    setShowRentDialog(true);
  };

  const closeRentDialog = () => {
    setSelectedMovieId(null);
    setShowRentDialog(false);
    setCustomerID(''); // Clear the customer ID input
  };

  const rentMovie = () => {
    // Implement the logic to rent a movie to a customer
    // This may involve additional API calls and state management
    console.log(`Renting movie with ID ${selectedMovieId} to customer with ID ${customerID}`);

    // Close the rent dialog after handling the rental
    closeRentDialog();
  };

  return (
    <div>
      <h1>Movie Store</h1>
      <div className="buttons">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/movies">Movies</Link></button>
        <button><Link to="/customers">Customers</Link></button>
        <button><Link to="/reports">Reports</Link></button>
      </div>
      <h1>Movies List</h1>
      <input
        type="text"
        placeholder="Search by Movie, Actor, or Genre"
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Actors</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.film_id}>
              <td>
                <Link to={`/movie/${movie.film_id}`}>{movie.title}</Link>
              </td>
              <td>{movie.genre}</td>
              <td>{movie.actors}</td>
              <td>
                <button onClick={() => openRentDialog(movie.film_id)}>
                  Rent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rent Dialog */}
      {showRentDialog && (
        <div className="rent-dialog">
          <h2>Rent Movie</h2>
          <p>Enter Customer ID:</p>
          <input
            type="text"
            placeholder="Customer ID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
          <div className="rent-dialog-buttons">
            <button onClick={rentMovie}>Rent</button>
            <button onClick={closeRentDialog}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
