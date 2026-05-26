import { useState } from 'react';
import axios from 'axios';

export default function AddUserForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      );

      setMessage({ type: 'success', text: 'Data berhasil ditambahkan!' });
      setFormData({ name: '', email: '', phone: '' }); // reset form

      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage({ type: 'error', text: 'Gagal menambahkan data!' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Tambah Pengguna Baru</h3>

      {message && (
        <div className={`p-2.5 rounded mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2.5 border border-gray-300 rounded text-base outline-none focus:border-blue-500 transition-colors"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2.5 border border-gray-300 rounded text-base outline-none focus:border-blue-500 transition-colors"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Nomor Telepon"
          value={formData.phone}
          onChange={handleChange}
          required
          className="p-2.5 border border-gray-300 rounded text-base outline-none focus:border-blue-500 transition-colors"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="p-2.5 bg-blue-500 text-white border-none rounded cursor-pointer text-base hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Mengirim...' : 'Simpan Data'}
        </button>
      </form>
    </div>
  );
}
