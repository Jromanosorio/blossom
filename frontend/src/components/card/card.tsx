import { FaDna } from "react-icons/fa";

interface CardProps {
    id: number;
    image: string;
    name: string;
    species: string;
    status: string;
}

function Card(props: CardProps) {
    return (
        <article className="bg-gray-800 border border-gray-700 group" style={{ opacity: 0, animation: "fadeIn 1s ease-out forwards", animationDelay: `${props.id * 200}ms`}}>
            <div className="overflow-hidden">
                <img src={props.image} alt={`${props.name}_img`} className="w-full object-cover object-top group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-3">
                <p className="text-2xl! text-left font-bold mb-2 line-clamp-1">{props.name}</p>
                <span className="flex items-center gap-2"><FaDna size={14} /> {props.species} - {props.status}</span>
            </div>
        </article>
    )
}

export default Card