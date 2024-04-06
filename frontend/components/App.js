import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';


const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  // ❗ Create state to hold the data from the API
  const [characters, setCharacters] = useState([]);

  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    Promise.all([axios.get(urlPeople), axios.get(urlPlanets)]) // Fetching data from the API
      .then(([peopleResponse, planetsResponse]) => { // Handling the response
        const planetsMapping = planetsResponse.data.reduce((acc, planet) => { // Mapping over the planets array
          acc[planet.id] = planet.name; // Creating a new object with the planet id as the key and the planet name as the value
          return acc; // Returning the new object
        }, {}); // Initial value of the accumulator is an empty object
  
        const charactersWithPlanets = peopleResponse.data.map(character => ({
          ...character,
          homeworld: planetsMapping[character.homeworld] // Adding the homeworld property to the character object
        }));
  
        setCharacters(charactersWithPlanets); // Setting the characters state with the new array
      })
      .catch(error => console.error('Fetching data error:', error)); // Handling errors
  }, []);
  

  return ( // Rendering the Character component
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      {characters.length > 0 ? ( 
        characters.map(character => ( // Mapping over the characters array
          <Character key={character.id} character={character} /> // Rendering the Character component
        ))
      ) : (
        <p>Loading characters...</p> // Displayed while the data is being fetched
      )}
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
