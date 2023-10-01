import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [actor, setActor] = useState({});
  const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
   

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/movies/${movieId}`);
        setMovie(res.data);
        console.log('Movie details:', res.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

   

    fetchMovieDetails();
  }, [movieId]);


    
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
      <h1>Selected Movie Details</h1>
      <h2>Title: {movie.title}</h2>
      <h2>Genre: {movie.genre}</h2>
      <h2>Starring: {movie.actors}</h2>
      <h2>Description: {movie.description}</h2>
      <div className="movies">
        <h2>Top 5 Movies</h2>
        {movies.map((movie) => (
          <div className="movie" key={movie.film_id}>
            <Link to={`/movie/${movie.film_id}`}>{movie.title}</Link>
          </div>
        ))}
      </div>
      <div className="actors">
        <h2>Top 5 Actors</h2>
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

export default MovieDetails;
