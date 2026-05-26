// warna buat badge tipe pokemon
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export default function PokemonCard({ pokemon }) {
  const mainTypeColor = typeColors[pokemon.types[0]] || '#777';

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:-translate-y-2 group border border-gray-100">
      {/* Header/Image Section */}
      <div 
        className="relative p-6 flex flex-col items-center justify-center min-h-[180px] overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${mainTypeColor}22 0%, ${mainTypeColor}05 100%)` }}
      >
        <div className="absolute top-4 left-4 text-xs font-bold text-gray-800/40 tracking-wider">
          #{String(pokemon.id).padStart(3, '0')}
        </div>
        
        {/* Decorative background circle */}
        <div 
          className="absolute w-32 h-32 rounded-full opacity-20 blur-2xl group-hover:blur-xl transition-all duration-500"
          style={{ backgroundColor: mainTypeColor }}
        ></div>

        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-[130px] h-[130px] object-contain relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 drop-shadow-[0_8px_12px_rgba(0,0,0,0.2)]"
          loading="lazy"
        />
      </div>

      {/* Info Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold capitalize mb-4 text-gray-800 text-center tracking-tight">
          {pokemon.name}
        </h3>

        <div className="flex justify-center gap-2 mb-6">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide text-white shadow-sm"
              style={{ backgroundColor: typeColors[type] || '#777' }}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Physical Stats */}
        <div className="flex justify-center gap-6 mb-6 px-2">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              Height
            </span>
            <span className="text-sm font-medium text-gray-700 bg-gray-50/80 px-3 py-1 rounded-full border border-gray-100">
              {pokemon.height / 10} m
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              Weight
            </span>
            <span className="text-sm font-medium text-gray-700 bg-gray-50/80 px-3 py-1 rounded-full border border-gray-100">
              {pokemon.weight / 10} kg
            </span>
          </div>
        </div>

        {/* Base Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'HP', value: pokemon.stats.hp },
            { label: 'ATK', value: pokemon.stats.attack },
            { label: 'DEF', value: pokemon.stats.defense },
            { label: 'SP.A', value: pokemon.stats.specialAttack },
            { label: 'SP.D', value: pokemon.stats.specialDefense },
            { label: 'SPD', value: pokemon.stats.speed },
          ].map((stat) => (
            <div 
              key={stat.label} 
              className="flex flex-col items-center bg-gray-50/80 rounded-xl py-2 px-1 border border-gray-100 transition-all duration-300 group-hover:bg-gray-100 group-hover:shadow-sm"
            >
              <span className="text-[10px] font-bold text-gray-400 mb-0.5">{stat.label}</span>
              <span className="text-sm font-extrabold text-gray-700">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
