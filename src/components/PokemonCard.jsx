import styles from './PokemonCard.module.css';

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
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.pokemonId}>#{String(pokemon.id).padStart(3, '0')}</p>
        <h3 className={styles.name}>{pokemon.name}</h3>

        <div className={styles.types}>
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={styles.typeBadge}
              style={{ backgroundColor: typeColors[type] || '#777' }}
            >
              {type}
            </span>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>HP</span>
            <span className={styles.statValue}>{pokemon.stats.hp}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>ATK</span>
            <span className={styles.statValue}>{pokemon.stats.attack}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>DEF</span>
            <span className={styles.statValue}>{pokemon.stats.defense}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>SPD</span>
            <span className={styles.statValue}>{pokemon.stats.speed}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
