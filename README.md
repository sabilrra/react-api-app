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
Mengambil data pengguna dari **JSONPlaceholder API** dan menampilkannya dalam bentuk tabel. Tersedia juga form untuk menambahkan data pengguna baru menggunakan method POST.

- **GET Request**: Mengambil daftar pengguna dari `https://jsonplaceholder.typicode.com/users`
- **POST Request**: Mengirim data pengguna baru ke `https://jsonplaceholder.typicode.com/users`

### Tugas Mandiri - Pokemon Dashboard
Mini dashboard yang terintegrasi dengan **Pokemon API** (https://pokeapi.co). Menampilkan data Pokemon dalam bentuk card/grid dengan fitur pencarian dan filter berdasarkan tipe.

- **Endpoint 1**: `https://pokeapi.co/api/v2/pokemon?limit=30` - Daftar Pokemon
- **Endpoint 2**: `https://pokeapi.co/api/v2/pokemon/{id}` - Detail setiap Pokemon

## Fitur

- Pengambilan data dari API menggunakan Axios
- Pengiriman data ke backend dengan method POST
- Pencarian data secara real-time
- Filter berdasarkan tipe Pokemon
- Loading state dengan spinner animasi
- Error handling dengan tombol retry
- Tampilan responsif untuk mobile
- Styling menggunakan CSS Module

## Teknologi yang Digunakan

- React 19
- Vite
- Axios
- CSS Module

## Struktur Proyek

```
react-api-app/
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.jsx          # Komponen loading animasi
│   │   ├── UserTable.jsx               # Tabel data pengguna
│   │   ├── UserList.jsx                # Logika GET API (Praktikum 1)
│   │   ├── AddUserForm.jsx             # Form POST API (Praktikum 2)
│   │   ├── PokemonDashboard.jsx        # Dashboard Pokemon (Tugas Mandiri)
│   │   ├── PokemonDashboard.module.css # Styling dashboard
│   │   ├── PokemonCard.jsx             # Card Pokemon
│   │   └── PokemonCard.module.css      # Styling card
│   ├── App.jsx                         # Komponen utama
│   ├── App.css                         # Styling aplikasi
│   ├── index.css                       # Styling global
│   └── main.jsx                        # Entry point
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

1. Saat aplikasi dibuka, komponen `UserList` memanggil `useEffect` untuk mengambil data dari API
2. Selama proses pengambilan data, `LoadingSpinner` ditampilkan
3. Jika berhasil, data ditampilkan dalam tabel (`UserTable`)
4. Jika gagal, pesan error ditampilkan beserta tombol retry
5. Pengguna bisa menambah data melalui form (`AddUserForm`) yang mengirim POST request
6. Pada tab Pokemon Dashboard, data diambil dari 2 endpoint PokeAPI dan ditampilkan dalam bentuk card
7. Pengguna bisa mencari Pokemon berdasarkan nama dan memfilter berdasarkan tipe

## Konsep yang Diterapkan

- **RESTful API**: Menggunakan method GET dan POST untuk berkomunikasi dengan backend
- **React Hooks**: `useState` untuk state management, `useEffect` untuk side effects
- **Conditional Rendering**: Menampilkan UI berbeda berdasarkan state (loading, error, sukses)
- **Async/Await**: Menangani operasi asynchronous saat fetch API
- **Error Handling**: Try-catch-finally untuk menangkap error dari API
- **CSS Module**: Styling terisolasi per komponen untuk menghindari konflik
