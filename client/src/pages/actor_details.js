import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ActorDetails = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [topRentedMovies, setTopRentedMovies] = useState([]); // Add state for topRentedMovies

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

  const { actorId } = useParams();
  const [actor, setActor] = useState({});

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/actors/${actorId}`);
        setActor(res.data.actor);
        setTopRentedMovies(res.data.topRentedMovies); // Set topRentedMovies
      } catch (err) {
        console.log(err);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  return (
    <div>
      <h1>Movie Store</h1>
      <div className="buttons">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/movies">Movies</Link></button>
        <button><Link to="/customers">Customers</Link></button>
        <button><Link to="/reports">Reports</Link></button>
      </div>
      <h1>Actor Details</h1>
      <h2>{actor.first_name} {actor.last_name}</h2>
      <h1>Top 5 Rented Movies</h1>
      <ul>
        {topRentedMovies.map((movie) => (
          <li key={movie.film_id}>
            <strong>Title:</strong> {movie.title} <br />
            <strong>Rental Count:</strong> {movie.rentalCount}
          </li>
        ))}
      </ul>

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

export default ActorDetails;
