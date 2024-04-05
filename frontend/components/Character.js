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
      <h3>{character.name}</h3>
      {/* Conditionally render homeworld info based on state */}
      {showHomeworld && (
        <p>
          <strong>Planet:</strong> <span className="character-planet">{character.homeworld}</span>
        </p>
      )}
    </div>
  );
}

export default Character;
