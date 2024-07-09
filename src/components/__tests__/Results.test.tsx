import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from '../Results';

const mockResults = [
    { id: 1, name: 'Bulldog', life_span: '8 - 10 years', temperament: 'Docile, Willful, Friendly', bred_for: 'Bull-baiting' },
    { id: 2, name: 'Labrador Retriever', life_span: '10 - 12 years', temperament: 'Intelligent, Even Tempered, Kind', bred_for: 'Retrieving' },
];

describe('Results Component', () => {
    test('renders the specified number of cards', () => {
        render(<Results results={mockResults} />);
        const cards = document.getElementsByClassName('card'); 
        expect(cards).toHaveLength(mockResults.length);
    });

    test('each card displays the correct data', () => {
        render(<Results results={mockResults} />);
        mockResults.forEach((result) => {
            expect(screen.getByText(result.name)).toBeInTheDocument();
            expect(screen.getByText(`Lifespan: ${result.life_span}`)).toBeInTheDocument();
            expect(screen.getByText(`Temperament: ${result.temperament}`)).toBeInTheDocument();
            expect(screen.getByText(`Bred for: ${result.bred_for}`)).toBeInTheDocument();
        });
    });

    test('displays an appropriate message if no results are present', () => {
        render(<Results results={[]} />);
        expect(screen.getByText('No results found')).toBeInTheDocument(); // Update Results component to show this message if results are empty
    });
});
