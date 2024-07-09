import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [results, setResults] = useState<{
    id: number;
    name: string;
    life_span: string;
    temperament: string;
    bred_for: string;
}[]>([]);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const handleSearch = (term: string) => {
    const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${term}`;

    setLoading(true);


    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
      })
      .catch(err => setError("Error while fetching data: " + err.message))
      .finally(() => setLoading(false));

  };

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Search dogs by name</h2>
                <Search onSearch={handleSearch} />

                {loading && <p>Loading ...</p>}
                {error && <p style={{color:'red'}}>{error}</p> }
                <Results results={results} />
              </div>
            }
          />
          <Route path="*" element={<h1 style={{ textAlign: 'center' }}>404 Not Found</h1>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;

