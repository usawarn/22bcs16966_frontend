import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState(""); 
  const [response, setResponse] = useState(null); 
  const [error, setError] = useState(""); 
  const [filter, setFilter] = useState([]); 
  const [filteredData, setFilteredData] = useState({}); 

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(input);
      const res = await axios.post("http://localhost:5000/bfhl", jsonData); // API call
      setResponse(res.data);
      setError(""); 
    } catch (err) {
      setError("Invalid JSON or API error. Please check your input!");
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const selectedFilters = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFilter(selectedFilters);
  };


  useEffect(() => {
    if (!response) return;

    let newFilteredData = {};

    if (filter.length === 0) {

      newFilteredData = response;
    } else {
      if (filter.includes("numbers")) {
        newFilteredData.numbers = response.numbers;
      }
      if (filter.includes("alphabets")) {
        newFilteredData.alphabets = response.alphabets;
      }
      if (filter.includes("highest_alphabet")) {
        newFilteredData.highest_alphabet = response.highest_alphabet;
      }
    }

    setFilteredData(newFilteredData);
  }, [filter, response]);

  return (
    <div className="app">
      <h1>Bajaj Finserv Health Challenge</h1>


      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON Data Here"
        rows="5"
        className="json-input"
      />


      <button onClick={handleSubmit} className="submit-btn">
        Submit
      </button>


      {error && <p className="error-msg">{error}</p>}

      <div className="filter-section">
        <h3>Filter Response Data:</h3>
        <select multiple onChange={handleFilterChange} className="filter-dropdown">
          <option value="numbers">Numbers</option>
          <option value="alphabets">Alphabets</option>
          <option value="highest_alphabet">Highest Alphabet</option>
        </select>
      </div>

  
      {response && (
        <div className="response-container">
          <h2>API Response</h2>
          {filteredData.numbers && (
            <div>
              <h3>Numbers:</h3>
              <p>{filteredData.numbers?.join(", ") || "N/A"}</p>
            </div>
          )}

          {filteredData.alphabets && (
            <div>
              <h3>Alphabets:</h3>
              <p>{filteredData.alphabets?.join(", ") || "N/A"}</p>
            </div>
          )}

          {filteredData.highest_alphabet && (
            <div>
              <h3>Highest Alphabet:</h3>
              <p>{filteredData.highest_alphabet || "N/A"}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
