import React, { useState } from 'react';

export default function Search({ onSearch }) {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({ departure, destination });
    }
  };

  return (
    <div>
      <input
        id="input-departure"
        type="text"
        placeholder="출발지"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
      />
      <input
        id="input-destination"
        type="text"
        placeholder="도착지"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button id="search-btn" onClick={handleSearchClick}>
        검색
      </button>
    </div>
  );
}