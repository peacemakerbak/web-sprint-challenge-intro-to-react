import React, { useState } from 'react';

function Character({ character }) {
  // ❗ Create a state to hold whether the homeworld is rendering or not
  const [showHomeworld, setShowHomeworld] = useState(false);

  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const toggleHomeworld = () => {
    setShowHomeworld(!showHomeworld);
  };

  return (
    <div className="character-card" onClick={toggleHomeworld}>
      {/* Display the character's name */}
      <h3 className="character-name">{character.name}</h3>
      {/* Conditionally render homeworld info based on state */}
      {showHomeworld && ( // If showHomeworld is true, render the homeworld info
        <p>Planet: <span className="character-planet">{character.homeworld}</span></p> // Display the homeworld info
    )}
    </div>
  );
}

export default Character;
