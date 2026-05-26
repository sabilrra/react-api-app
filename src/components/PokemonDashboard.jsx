import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import LoadingSpinner from './LoadingSpinner';

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

  async function fetchPokemon() {
    setLoading(true);
    setError(null);

    try {
      // ambil daftar 250 pokemon dulu
      const listResponse = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=250'
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
          specialAttack: res.data.stats[3].base_stat,
          specialDefense: res.data.stats[4].base_stat,
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
      <div className="text-center p-12">
        <p className="text-red-500 mb-4 text-base">{error}</p>
        <button onClick={fetchPokemon} className="px-5 py-2.5 bg-blue-500 text-white border-none rounded-md cursor-pointer text-[15px] hover:bg-blue-600 transition-colors">
          Coba Lagi
        </button>
      </div>
    );

  return (
    <div className="p-6 max-w-[1200px] mx-auto sm:p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Cari pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-3.5 py-2.5 border border-gray-300 rounded-lg text-base outline-none transition-colors duration-200 focus:border-blue-500 w-full md:w-auto"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3.5 py-2.5 border border-gray-300 rounded-lg text-base bg-white cursor-pointer outline-none min-w-[160px] focus:border-blue-500 w-full md:w-auto"
        >
          <option value="semua">Semua Tipe</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <p className="text-gray-600 mb-4 text-sm">
        Menampilkan {filteredPokemon.length} dari {pokemonList.length} Pokemon
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:gap-4 sm:grid-cols-1 sm:gap-3">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {filteredPokemon.length === 0 && (
        <p className="text-center text-gray-400 p-12 text-base">Pokemon tidak ditemukan.</p>
      )}
    </div>
  );
}
