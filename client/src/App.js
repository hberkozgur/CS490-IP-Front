// src/App.js

import React from 'react';
import './App.css';
import CustomerList from "./pages/customer";
import Movies from "./pages/movies";
import ActorDetails from './pages/actor_details';
import MovieDetails from './pages/movie_details';
import CustAdd from "./pages/cust_add";
import MoviesList from "./pages/all_movies";
import CustomerDetails from "./pages/cust_details";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies/>}/>
        <Route path="/movie/:movieId" element={<MovieDetails/>} />
        <Route path="/actor/:actorId" element={<ActorDetails/>} />
        <Route path="/add-customer" element={<CustAdd/>} /> 
        <Route path="/customers" element={<CustomerList/>} /> 
        <Route path="/movies" element={<MoviesList/>} /> 
        <Route path="/customer/:customerId" element={<CustomerDetails/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
