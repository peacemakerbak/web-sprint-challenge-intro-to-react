import React, { useState } from 'react';

function Character({ character }) {
  // ❗ Create a state to hold whether the homeworld is rendering or not
  const [showHomeworld, setShowHomeworld] = useState(false);

  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const toggleHomeworld = () => {
    setShowHomeworld(!showHomeworld);
  };

  return (
    <div className="character-card">
      {/* Display the character's name. Click to toggle homeworld info */}
      <h3 className="character-name" onClick={toggleHomeworld}>{character.name}</h3>
      {/* Conditionally render homeworld info based on state */}
      {showHomeworld && (
        <p>Planet: <span className="character-planet">{character.homeworld}</span></p>
      )}
    </div>
  );
}

export default Character;
