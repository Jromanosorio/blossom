import { useEffect, useState } from "react"
import { FaHeart, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa"

export interface CharacterFilter {
    name?: string
    status?: string
    species?: string
    gender?: string
    origin?: string
    sort?: "asc" | "desc"
}

interface FiltersProps {
    onShowFavorites: () => void;
    onFilterChange: (filters: CharacterFilter) => void
}

function Filters({ onFilterChange, onShowFavorites }: FiltersProps) {
    const [filters, setFilters] = useState<CharacterFilter>({
        sort: 'asc'
    })

    useEffect(() => {
        const cleaned = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value != null && value !== '')
        );

        onFilterChange(cleaned);

    }, [filters, onFilterChange])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    const toggleSort = () => {
        setFilters((prev) => ({
            ...prev,
            sort: prev.sort === "asc" ? "desc" : "asc",
        }))
    }

    return (
        <section className="bg-gray-800 border border-gray-700 rounded-lg p-10 space-y-6">
            <section className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Filters and sorting</h2>
                <button onClick={onShowFavorites} className="flex gap-2 items-center justify-center font-semibold rounded-lg transition-colors duration-200 cursor-pointer border-2 px-4 py-2 text-sm border-orange text-orange">
                    <FaHeart size={15} />
                    Favorites
                </button>
            </section>
            <section className="grid grid-cols-2 space-y-1 gap-10">
                <div className="space-y-1 col-span-1">
                    <p className="text-left text-gray-300">Name</p>
                    <input
                        name="name"
                        type="text"
                        value={filters.name || ""}
                        onChange={handleChange}
                        placeholder="Search by name"
                        className="text-sm px-3 py-2 w-full border border-gray-600 text-white rounded-md shadow-sm focus:border-mint transition-colors duration-300 outline-none"
                    />
                </div>
                <div className="space-y-1 col-span-1">
                    <p className="text-left text-gray-300">Species</p>
                    <input
                        name="species"
                        type="text"
                        value={filters.species || ""}
                        onChange={handleChange}
                        placeholder="Search by specie"
                        className="text-sm px-3 py-2 w-full border border-gray-600 text-white rounded-md shadow-sm focus:border-mint transition-colors duration-300 outline-none"
                    />
                </div>
            </section>
            <section className="grid grid-cols-3 gap-5">
                <div className="space-y-1">
                    <p className="text-left text-gray-300">Status</p>
                    <select
                        name="status"
                        value={filters.status || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:border-mint transition-colors duration-300"
                    >
                        <option value="">All</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <p className="text-left text-gray-300">Gender</p>
                    <select
                        name="gender"
                        value={filters.gender || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:border-mint transition-colors duration-300"
                    >
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Genderless">Genderless</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <p className="block text-left text-gray-300">Sort by name</p>
                    <button onClick={toggleSort} className="flex justify-between items-center font-medium rounded-lg transition-colors duration-200 cursor-pointer border-2 border-mint text-mint hover:bg-mint hover:text-dark px-3 py-1.5 text-sm w-full">
                        <span>{filters.sort === "asc" ? "A-Z" : "Z-A"}</span>
                        {filters.sort === "asc" ? (
                            <FaSortAlphaDown size={16} />
                        ) : (
                            <FaSortAlphaDownAlt size={16} />
                        )}
                    </button>
                </div>
            </section>
        </section>
    )
}

export default Filters
