import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = inputValue.split(",");

    const response = await fetch("https://bajaj-k35f.onrender.com/bfhl/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const result = await response.json();
    setResponse(result);
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
            <h2>Response:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
