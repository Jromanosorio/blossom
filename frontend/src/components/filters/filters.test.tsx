import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Filters from "./filters";

describe('Filters component test', () => {

    const filtersProps = {
        onShowFavorites: vi.fn(),
        onFilterChange: vi.fn(),
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('filters component renders correctly', () => {
        render(<Filters {...filtersProps} />)
        expect(screen.getByText('Filters and sorting')).toBeInTheDocument()
    })

    it('calls onFilterChange when click button', () => {
        render(<Filters {...filtersProps} />)
        const button = screen.getByRole('button', { name: /show-favorites-button/i })
        fireEvent.click(button)
        expect(filtersProps.onShowFavorites).toHaveBeenCalled()
    })

    it('change select value when pick option', () => {
        render(<Filters {...filtersProps} />)

        const select = screen.getByLabelText('status-select')
        expect(select).toBeInTheDocument()

        const options = screen.getAllByLabelText('status-option')
        expect(options).toHaveLength(4)
        expect(options[0]).toHaveValue('')
        expect(options[1]).toHaveValue('Alive')
        expect(options[2]).toHaveValue('Dead')
        expect(options[3]).toHaveValue('Unknown')
    })
})