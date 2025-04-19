import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ChampionList from './components/ChampionList';
import ChampionDetail from './components/ChampionDetail';
import Navbar from './components/navbar';
import './index.css';

function App() {
  const [language, setLanguage] = useState('es_ES');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  return (
    <>
      {/* Navbar con idioma, búsqueda y rol */}
      <Navbar
        currentLang={language}
        onLangChange={setLanguage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ChampionList
              language={language}
              searchTerm={searchTerm}
              selectedRole={selectedRole}
            />
          }
        />
        <Route
          path="/champion/:id"
          element={<ChampionDetail language={language} />}
        />
      </Routes>
    </>
  );
}

export default App;
