import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';
import { useSearchTerm } from '../../../utils/useSearchTerm';

jest.mock('../../../utils/useSearchTerm');

const mockUseSearchTerm = useSearchTerm as jest.Mock;

describe('Search Component', () => {
    beforeEach(() => {
        mockUseSearchTerm.mockClear();
    });

    test('calls onSearch with the trimmed search term on search button click', () => {
        const onSearchMock = jest.fn();
        const setSearchTermMock = jest.fn();

        mockUseSearchTerm.mockReturnValue(['Luke', setSearchTermMock]);

        render(<Search onSearch={onSearchMock} />);

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        expect(onSearchMock).toHaveBeenCalledWith('Luke');
    });

    test('updates input field value correctly when typed', () => {
        const onSearchMock = jest.fn();
        const setSearchTermMock = jest.fn();

        mockUseSearchTerm.mockReturnValue(['', setSearchTermMock]);

        render(<Search onSearch={onSearchMock} />);

        const searchInput = screen.getByPlaceholderText('Search...');

        fireEvent.change(searchInput, { target: { value: 'Leia' } });

        expect(setSearchTermMock).toHaveBeenCalledWith('Leia');
    });

    test('retrieves the value from the custom hook upon mounting', () => {
        const onSearchMock = jest.fn();
        const setSearchTermMock = jest.fn();

        mockUseSearchTerm.mockReturnValue(['Darth Vader', setSearchTermMock]);

        render(<Search onSearch={onSearchMock} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        expect(searchInput).toHaveValue('Darth Vader');
    });
});
