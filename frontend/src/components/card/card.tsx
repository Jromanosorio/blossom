import { FaDna, FaEye, FaHeart, FaRegHeart } from "react-icons/fa";

interface CardProps {
    id: number;
    image: string;
    name: string;
    species: string;
    isFavorite: boolean;
    handleFavorite: () => void;
    viewDetails: () => void;
}

function Card(props: CardProps) {
    return (
        <article className="relative mx-10 md:mx-3 lg:mx-2 xl:mx-0 bg-gray-800 border rounded-md overflow-hidden border-gray-700 group animationFadeIn" style={{ opacity: 0, animationDelay: `${props.id * 100}ms` }}>
            <div className="overflow-hidden">
                <img src={props.image} alt={`${props.name}_img`} className="w-full object-cover object-top group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-3">
                <h3 className="text-2xl! text-left font-bold mb-2 line-clamp-1">{props.name}</h3>
                <span className="flex items-center gap-2"><FaDna size={14} />{props.species}</span>
                <button onClick={props.viewDetails} className="w-full flex gap-2 mt-4 mb-2 items-center justify-center font-semibold rounded-lg transition-colors duration-200 cursor-pointer border-2 px-4 py-2 text-sm border-orange text-orange hover:text-gray-800 hover:bg-orange">
                    <FaEye size={15} /> View details
                </button>
            </div>
            <button className="border bg-gray-800 cursor-pointer text-orange absolute top-1 right-1 p-2.5 rounded-full" onClick={props.handleFavorite}>
                {
                props.isFavorite 
                ? <FaHeart size={15} /> 
                : <FaRegHeart size={15} />
            }
            </button>
        </article>
    )
}

export default Card