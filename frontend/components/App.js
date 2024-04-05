import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';
import '../styles/styles.css';


const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  // ❗ Create state to hold the data from the API
  const [characters, setCharacters] = useState([]);

  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    // Fetching data from both endpoints concurrently using Promise.all
    Promise.all([axios.get(urlPeople), axios.get(urlPlanets)])
      .then(([peopleResponse, planetsResponse]) => {
        // Creating an object to map planet IDs to planet names for easy lookup
        const planets = planetsResponse.data.reduce((acc, planet) => {
          acc[planet.id] = planet.name; // Only storing the planet name for simplicity
          return acc;
        }, {});

        // Combining character data with their respective homeworld names
        const combinedData = peopleResponse.data.map(character => ({
          ...character,
          homeworld: planets[character.homeworld] // Linking homeworld ID to its name
        }));

        // Setting the combined data to state
        setCharacters(combinedData);
      })
      .catch(error => console.error('Fetching data error:', error));
  }, []);

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      {characters.length > 0 ? (
        characters.map(character => (
          <Character key={character.id} character={character} />
        ))
      ) : (
        <p>Loading characters...</p>
      )}
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
