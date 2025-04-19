import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ currentLang, onLangChange, selectedRole, setSelectedRole }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [championsList, setChampionsList] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const roles = ['All', 'Fighter', 'Mage', 'Marksman', 'Assassin', 'Tank', 'Support'];

  // Obtener lista de campeones
  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion.json')
      .then((res) => res.json())
      .then((data) => {
        setChampionsList(Object.keys(data.data));
      });
  }, []);

  // Filtrado dinámico
  useEffect(() => {
    setFilteredChampions(
      championsList.filter((champ) =>
        champ.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, championsList]);

  const handleChampionClick = (championId) => {
    navigate(`/champion/${championId}`);
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">LoL Champs</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* 🔍 Buscador con imagen */}
          <div className="d-flex ms-auto me-3 my-2" style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar campeón..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
            />
            {isSearching && searchQuery && filteredChampions.length > 0 && (
              <div
                className="list-group position-absolute bg-dark border border-secondary rounded z-3"
                style={{
                  top: '100%',
                  left: 0,
                  right: 0,
                  maxHeight: '300px',
                  overflowY: 'auto',
                }}
              >
                {filteredChampions.map((champ, idx) => (
                  <button
                    key={idx}
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    onClick={() => handleChampionClick(champ)}
                  >
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champ}.png`}
                      alt={champ}
                      className="rounded-circle me-3"
                      style={{ width: '40px', height: '40px' }}
                    />
                    {champ}
                  </button>
                ))}
              </div>
            )}
          </div>


          {/* 🎯 Selector de roles */}
          <div className="me-3 my-2">
            <select
              className="form-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* 🌐 Selector de idioma */}
          <div className="dropdown">
            <button
              className="btn btn-outline-info dropdown-toggle"
              type="button"
              id="dropdownLang"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Idioma: {currentLang.toUpperCase()}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownLang">
              {['es_ES', 'en_US', 'pt_BR', 'fr_FR', "es_MX", "de_DE", "ko_KR", "ja_JP", "zh_CN"].map((lang) => (
                <li key={lang}>
                  <button
                    className="dropdown-item"
                    onClick={() => onLangChange(lang)}
                  >
                    {lang.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
