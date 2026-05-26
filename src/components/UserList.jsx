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

  async function fetchUsers() {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (err) {
      setError('Gagal mengambil data. Periksa koneksi internet Anda.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleAddUser = (newUser) => {
    setUsers(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(u => u.id)) : 0;
      const userWithId = { ...newUser, id: maxId + 1 };
      return [...prev, userWithId];
    });
  };

  // filter search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  if (error) return (
    <div className="text-center p-8">
      <p className="text-red-500 mb-4">{error}</p>
      <button onClick={fetchUsers} className="px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-600 transition-colors">
        Coba Lagi
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <AddUserForm onSuccess={handleAddUser} />
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Daftar Pengguna</h2>

      <input
        type="text"
        placeholder="Cari nama atau email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2.5 mb-4 border border-gray-300 rounded-lg text-base box-border outline-none focus:border-blue-500 transition-colors"
      />

      <p className="text-gray-600 mb-4">Menampilkan {filteredUsers.length} dari {users.length} pengguna</p>

      <UserTable users={filteredUsers} />

      <button onClick={fetchUsers} className="mt-4 px-4 py-2 bg-green-500 text-white border-none rounded cursor-pointer hover:bg-green-600 transition-colors">
        Refresh Data
      </button>
    </div>
  );
}
