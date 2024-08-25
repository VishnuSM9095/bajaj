import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState(""); // State for filter selection

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = inputValue.split(",").map(item => item.trim()); // Ensure trimming of spaces

    try {
      const res = await fetch("https://bajaj-k35f.onrender.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse({
        is_success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };

  const getFilteredResponse = () => {
    if (!response) return "No data or error occurred";

    if (!response.is_success) return response.message || "Error in response";

    switch (filter) {
      case "Alphabets":
        return response.alphabets.length > 0 ? response.alphabets.join(", ") : "No alphabets found";
      case "Numbers":
        return response.numbers.length > 0 ? response.numbers.join(", ") : "No numbers found";
      case "Highest Lowercase Alphabet":
        return response.highest_lowercase_alphabet.length > 0 
          ? response.highest_lowercase_alphabet.join(", ") 
          : "No lowercase alphabet found";
      default:
        return "Select a filter to see results";
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
