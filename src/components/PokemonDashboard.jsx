import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import LoadingSpinner from './LoadingSpinner';
import styles from './PokemonDashboard.module.css';

export default function PokemonDashboard() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('semua');
  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      // ambil daftar 30 pokemon dulu
      const listResponse = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=30'
      );

      // terus ambil detail tiap pokemon (buat dapet gambar, tipe, stats)
      const detailPromises = listResponse.data.results.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const detailResponses = await Promise.all(detailPromises);

      const pokemonData = detailResponses.map((res) => ({
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.other['official-artwork'].front_default,
        types: res.data.types.map((t) => t.type.name),
        stats: {
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
        },
        height: res.data.height,
        weight: res.data.weight,
      }));

      // kumpulin semua tipe yg ada buat dropdown filter
      const types = [...new Set(pokemonData.flatMap((p) => p.types))];
      setAllTypes(types.sort());

      setPokemonList(pokemonData);
    } catch (err) {
      setError('Gagal mengambil data Pokemon. Periksa koneksi internet Anda.');
      console.error('Pokemon API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchType =
      selectedType === 'semua' || pokemon.types.includes(selectedType);
    return matchSearch && matchType;
  });

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
        <button onClick={fetchPokemon} className={styles.retryButton}>
          Coba Lagi
        </button>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Cari pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="semua">Semua Tipe</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <p className={styles.infoText}>
        Menampilkan {filteredPokemon.length} dari {pokemonList.length} Pokemon
      </p>

      <div className={styles.grid}>
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {filteredPokemon.length === 0 && (
        <p className={styles.noResult}>Pokemon tidak ditemukan.</p>
      )}
    </div>
  );
}
