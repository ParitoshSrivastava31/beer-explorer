// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import './App.css';

// Define the BeerCard component
const BeerCard = ({ beer }) => (
  <div className="beer-card">
    <img src={beer.image_url} alt={beer.name} />
    <h3>{beer.name}</h3>
    <p>{beer.tagline}</p>
  </div>
);

// Define the App component
const App = () => {
  // State variables
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from the Punk API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.punkapi.com/v2/beers');
        const data = await response.json();
        setBeers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter beers based on the search term
  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Beer Explorer</h1>
      <input
        type="text"
        placeholder="Search for beers..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="beer-list">
        {filteredBeers.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </div>
  );
};

export default App;

