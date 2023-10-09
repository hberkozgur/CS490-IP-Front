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
  const [staffId, setStaffId] = useState(''); // State to store staff ID

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
    setCustomerID('');
    setStaffId('');
  };

  const handleRentMovie = async (e) => {
    e.preventDefault();

    try {
      const data = {
        movieId: selectedMovieId,
        customerId: customerID,
        staffId: staffId
      };

      const response = await axios.post('http://localhost:4000/new_rent', data);

      if (response.status === 200) {
        console.log(`Successfully rented movie with ID ${selectedMovieId} to customer with ID ${customerID}`);
        closeRentDialog();
      } else {
        console.error(`Error renting movie: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error renting movie:', error);
    }
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
          <form onSubmit={handleRentMovie}>
            <label htmlFor="customerId">Customer ID:</label>
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={customerID}
              onChange={(e) => setCustomerID(e.target.value)}
              required
            />
            <label htmlFor="staffId">Staff ID:</label>
            <input
              type="text"
              id="staffId"
              name="staffId"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
            />
            <div className="rent-dialog-buttons">
              <button type="submit">Rent</button>
              <button onClick={closeRentDialog}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
