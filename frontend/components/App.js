import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';
import '../styles/styles.css'; // Import styles globally

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  // ❗ Create state to hold the data from the API
  const [characters, setCharacters] = useState([]);

  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    Promise.all([axios.get(urlPeople), axios.get(urlPlanets)])
      .then(([peopleResponse, planetsResponse]) => {
        // Constructing a lookup object for planets with both id and name
        const planetsLookup = planetsResponse.data.reduce((acc, planet) => {
          acc[planet.id] = { id: planet.id, name: planet.name }; // Adjusted to include both id and name
          return acc;
        }, {});

        // Combining character data with their respective homeworld information
        const combinedData = peopleResponse.data.map(character => ({
          ...character,
          homeworld: planetsLookup[character.homeworld] // Adjusted to use the lookup object
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
