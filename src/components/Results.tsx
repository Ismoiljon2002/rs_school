import React from 'react';

interface Result {
    id: number;
    name: string;
    life_span: string;
    temperament: string;
    bred_for: string;
}

interface ResultsProps {
    results: Result[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
    return (
        <div className='result-cards'>
            {results.length > 0 ? (
                results.map((result) => (
                    <div className="card" key={result.id}>
                        <h3>{result.name}</h3>
                        <p>Lifespan: {result.life_span}</p>
                        <p>Temperament: {result.temperament}</p>
                        <p>Bred for: {result.bred_for}</p>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default Results;
