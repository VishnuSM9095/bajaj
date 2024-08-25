import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState(""); // State for filter selection

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = inputValue.split(",");

    const response = await fetch("https://bajaj-k35f.onrender.com/bfhl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const result = await response.json();
    setResponse(result);
  };

  const getFilteredResponse = () => {
    if (!response) return null;
    
    switch (filter) {
      case "Alphabets":
        return response.alphabets.join(", ");
      case "Numbers":
        return response.numbers.join(", ");
      case "Highest Lowercase Alphabet":
        return response.highest_lowercase_alphabet.join(", ");
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BFHL Data Processor</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter comma-separated values"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {response && (
          <div>
            <h2>Filter Results:</h2>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="">Select filter</option>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
            </select>
            <div>
              <h2>Filtered Response:</h2>
              <pre>{getFilteredResponse()}</pre>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
