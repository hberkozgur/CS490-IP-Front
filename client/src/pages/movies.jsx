import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:4000/movies");
        setMovies(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };

    const fetchActors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/actors");
        setActors(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
    fetchActors();
  }, []);

  return (
    <div>
      <h1>Movie Store</h1>
      <div className="buttons">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/movies">Movies</Link></button>
        <button><Link to="/customers">Customers</Link></button>
        <button><Link to="/reports">Reports</Link></button>
      </div>
      <div className="movies">
        <h2>Top Movies</h2>
        {movies.map((movie) => (
          <div className="movie" key={movie.film_id}>
            <Link to={`/movie/${movie.film_id}`}>{movie.title}</Link>
          </div>
        ))}
      </div>
      <div className="actors">
        <h2>Top Actors</h2>
        {actors.map((actor) => (
          <div className="actor" key={actor.actor_id}>
            <Link to={`/actor/${actor.actor_id}`}>
              {`${actor.first_name} ${actor.last_name}`}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
