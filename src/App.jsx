import { useState } from 'react';
import UserList from './components/UserList';
import PokemonDashboard from './components/PokemonDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('praktikum');

  return (
    <div className="min-h-screen">
      <header className="bg-[#2c3e50] text-white p-6 text-center sm:p-4">
        <h1 className="text-[1.8rem] mb-1 sm:text-[1.4rem]">DASHBOARD REACT</h1>
        <p className="text-[14px] opacity-80">Kelompok Kuman - Kelas T2G</p>
      </header>

      <nav className="flex bg-[#34495e] p-0">
        <button
          className={`flex-1 py-3 px-5 border-none bg-transparent text-[15px] cursor-pointer transition-colors duration-200 sm:text-[13px] sm:px-3 sm:py-2.5 ${activeTab === 'praktikum' ? 'bg-[#3498db] text-white font-semibold hover:bg-[#3498db]' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
          onClick={() => setActiveTab('praktikum')}
        >
          Praktikum 1 & 2
        </button>
        <button
          className={`flex-1 py-3 px-5 border-none bg-transparent text-[15px] cursor-pointer transition-colors duration-200 sm:text-[13px] sm:px-3 sm:py-2.5 ${activeTab === 'dashboard' ? 'bg-[#3498db] text-white font-semibold hover:bg-[#3498db]' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Pokemon Dashboard
        </button>
      </nav>

      <main>
        {activeTab === 'praktikum' && (
          <UserList />
        )}

        {activeTab === 'dashboard' && <PokemonDashboard />}
      </main>
    </div>
  );
}

export default App;
