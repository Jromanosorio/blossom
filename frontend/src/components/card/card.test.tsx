import  { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Card from './card';

describe('Card component', () => {
    const mockProps = {
        id: 1,
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        name: "Rick Sanchez",
        species: "Human",
        isFavorite: true,
        handleFavorite: vi.fn(),
        viewDetails: vi.fn(),
    }

    
    it('renders character name, image, species and if isFavorite', () => {
        render(<Card {...mockProps} />)
        expect(screen.getByText(mockProps.name)).toBeInTheDocument()
        expect(screen.getByText(mockProps.species)).toBeInTheDocument()
    })

    it('calls handleFavorite function when heart icon is clicked', () => {
        render(<Card {...mockProps} />)
        const button = screen.getByRole('button', { name: /favorite-button/i })
        fireEvent.click(button)
        expect(mockProps.handleFavorite).toHaveBeenCalled()
    })

})