import { useState } from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import PokemonDashboard from './components/PokemonDashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('praktikum');

  return (
    <div className="App">
      <header className="app-header">
        <h1>React Integrasi API</h1>
        <p>Kelompok Kuman - Kelas T2G</p>
      </header>

      <nav className="tab-nav">
        <button
          className={activeTab === 'praktikum' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('praktikum')}
        >
          Praktikum 1 & 2
        </button>
        <button
          className={activeTab === 'dashboard' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('dashboard')}
        >
          Pokemon Dashboard
        </button>
      </nav>

      <main>
        {activeTab === 'praktikum' && (
          <>
            <AddUserForm />
            <UserList />
          </>
        )}

        {activeTab === 'dashboard' && <PokemonDashboard />}
      </main>
    </div>
  );
}

export default App;
