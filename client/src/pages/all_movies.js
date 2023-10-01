import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

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

  const rentMovie = (movieId) => {
    // Implement the logic to rent a movie to a customer
    // This may involve additional API calls and state management
    console.log(`Renting movie with ID ${movieId} to customer`);
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
                <button onClick={() => rentMovie(movie.film_id)}>
                  Rent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesList;
