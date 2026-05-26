# React Integrasi API

Proyek ini dibuat sebagai tugas mata kuliah **Algoritma Pemrograman dan Struktur Data** dengan topik mengintegrasikan API Backend ke dalam Aplikasi React.

## Kelompok Kuman - Kelas T2G

| NIM | Nama |
|-----|------|
| 253140700111034 | Muhammad Mu'taz Syafiq |
| 2531407071111120 | Sabila Rahma Aulia |
| 253140707111109 | Bilqis Nailatul Muna |
| 253140707111101 | Tiara Rizki Anindita |

## Deskripsi Proyek

Aplikasi ini terdiri dari dua bagian utama:

### Praktikum 1 & 2 - GET dan POST API
Mengambil data pengguna dari **JSONPlaceholder API** dan menampilkannya dalam bentuk tabel. Tersedia juga form untuk menambahkan data pengguna baru secara dinamis ke state lokal setelah simulasi POST request berhasil dilakukan.

- **GET Request**: Mengambil daftar pengguna dari `https://jsonplaceholder.typicode.com/users`
- **POST Request**: Mengirim data pengguna baru ke `https://jsonplaceholder.typicode.com/users`

### Tugas Mandiri - Pokemon Dashboard
Dashboard interaktif yang terintegrasi dengan **PokeAPI** (https://pokeapi.co). Menampilkan data detail Pokemon dalam bentuk card/grid dengan fitur pencarian real-time dan filter berdasarkan tipe.

- **Endpoint 1**: `https://pokeapi.co/api/v2/pokemon?limit=250` - Mengambil daftar 250 Pokemon
- **Endpoint 2**: `https://pokeapi.co/api/v2/pokemon/{id}` - Detail stats, tipe, gambar, tinggi, dan berat setiap Pokemon

## Fitur

- **Integrasi API dengan Axios**: Pengambilan data dari API menggunakan Axios (GET) & simulasi pengiriman data (POST).
- **Sinkronisasi State**: Data pengguna yang ditambahkan melalui form akan langsung masuk ke tabel secara real-time.
- **Pencarian Real-time**: Fitur pencarian pengguna (berdasarkan nama/email) dan Pokemon (berdasarkan nama).
- **Filter Tipe Pokemon**: Filter dropdown dinamis berdasarkan tipe Pokemon yang tersedia.
- **Statistik Pokemon Lengkap**: Menampilkan tinggi (height), berat (weight), serta stats dasar (HP, ATK, DEF, SP.A, SP.D, SPD).
- **Loading & Error Handling**: Animasi loading spinner dan handling error koneksi dengan tombol retry (coba lagi).
- **Desain Modern & Responsif**: Tampilan menarik dan ramah perangkat mobile (responsive layout).
- **Styling Utility-First**: Diimplementasikan menggunakan Tailwind CSS v4.

## Teknologi yang Digunakan

- React
- Vite
- Tailwind CSS v4 (menggunakan `@tailwindcss/vite`)
- Axios

## Struktur Proyek

```
react-api-app/
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.jsx      # Komponen loading animasi spinner
│   │   ├── UserTable.jsx           # Tabel presentasional data pengguna
│   │   ├── UserList.jsx            # Logika GET API & pencarian pengguna
│   │   ├── AddUserForm.jsx         # Form POST API tambah pengguna baru
│   │   ├── PokemonDashboard.jsx    # Logika dashboard, search & filter Pokemon
│   │   └── PokemonCard.jsx         # Tampilan card detail stats Pokemon
│   ├── App.jsx                     # Komponen utama & navigasi tab
│   ├── index.css                   # Styling global (Tailwind CSS v4 entry)
│   └── main.jsx                    # Entry point aplikasi
├── package.json
└── README.md
```

## Cara Menjalankan

```bash
# Clone repository
git clone <url-repository>
cd react-api-app

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## API yang Digunakan

| API | Endpoint | Kegunaan |
|-----|----------|----------|
| JSONPlaceholder | https://jsonplaceholder.typicode.com/users | Data pengguna (GET & POST) |
| PokeAPI | https://pokeapi.co/api/v2/pokemon | Data Pokemon (GET) |

## Alur Kerja Aplikasi

1. Saat aplikasi dibuka, komponen `UserList` memanggil `useEffect` untuk mengambil data dari API JSONPlaceholder.
2. Selama proses pengambilan data, `LoadingSpinner` ditampilkan.
3. Jika berhasil, data ditampilkan dalam tabel (`UserTable`).
4. Jika gagal, pesan error ditampilkan beserta tombol retry.
5. Pengguna bisa menambah data melalui form (`AddUserForm`) yang mengirim POST request, lalu mengupdate state lokal `users` agar data langsung tampil di tabel.
6. Pada tab Pokemon Dashboard, data daftar Pokemon diambil (limit 250) beserta data detail masing-masing Pokemon (melalui `Promise.all` detail request) untuk mendapatkan gambar official-artwork, tipe, serta statistik lengkapnya.
7. Pengguna bisa mencari Pokemon berdasarkan nama dan memfilter berdasarkan tipe dengan opsi dropdown dinamis.

## Konsep yang Diterapkan

- **RESTful API**: Menggunakan method GET dan POST untuk berkomunikasi dengan server backend/mockup API.
- **React Hooks**: `useState` untuk state management, dan `useEffect` untuk fetching data side effects.
- **Conditional Rendering**: Menampilkan UI berbeda berdasarkan state (loading, error, sukses).
- **Asynchronous JavaScript**: `async/await` dan `Promise.all` untuk menangani multiple request secara efisien.
- **Error Handling**: Try-catch-finally untuk menangkap error dari API dan menjaga stabilitas UI.
- **Tailwind CSS v4**: Utility-first CSS framework untuk styling yang cepat, konsisten, dan sangat responsif tanpa konflik class.
