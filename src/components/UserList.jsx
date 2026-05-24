import { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import LoadingSpinner from './LoadingSpinner';
import AddUserForm from './AddUserForm';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // mapping nama kelompok biar lebih relate
  const namaIndonesia = {
    1: { name: "Muhammad Mu'taz Syafiq", email: 'mutaz.syafiq@gmail.com' },
    2: { name: 'Sabila Rahma Aulia', email: 'sabila.aulia@gmail.com' },
    3: { name: 'Bilqis Nailatul Muna', email: 'bilqis.muna@gmail.com' },
    4: { name: 'Tiara Rizki Anindita', email: 'tiara.anindita@gmail.com' },
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');

      // ambil 4 data aja terus ganti namanya
      const updatedUsers = response.data.slice(0, 4).map(user => ({
        ...user,
        name: namaIndonesia[user.id]?.name || user.name,
        email: namaIndonesia[user.id]?.email || user.email,
      }));

      setUsers(updatedUsers);
    } catch (err) {
      setError('Gagal mengambil data. Periksa koneksi internet Anda.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(u => u.id)) : 0;
      const userWithId = { ...newUser, id: maxId + 1 };
      return [userWithId, ...prev];
    });
  };

  // filter search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  if (error) return (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>{error}</p>
      <button onClick={fetchUsers} style={styles.retryButton}>
        Coba Lagi
      </button>
    </div>
  );

  return (
    <div style={styles.container}>
      <AddUserForm onSuccess={handleAddUser} />
      <h2>Daftar Pengguna</h2>

      <input
        type="text"
        placeholder="Cari nama atau email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      <p>Menampilkan {filteredUsers.length} dari {users.length} pengguna</p>

      <UserTable users={filteredUsers} />

      <button onClick={fetchUsers} style={styles.refreshButton}>
        Refresh Data
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '2rem',
  },
  errorText: {
    color: 'red',
    marginBottom: '1rem',
  },
  retryButton: {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  refreshButton: {
    marginTop: '1rem',
    padding: '8px 16px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
