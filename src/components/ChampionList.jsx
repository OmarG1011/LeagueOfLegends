import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ChampionList({ language, searchTerm, selectedRole }) {
  const [champions, setChampions] = useState({});

  useEffect(() => {
    async function fetchChampions() {
      const version = '15.7.1';
      const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);
      const data = await response.json();
      setChampions(data.data);
    }

    fetchChampions();
  }, [language]);

  const filteredChampions = Object.values(champions).filter((champ) => {
    const matchesName = champ.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || champ.tags.includes(selectedRole);
    return matchesName && matchesRole;
  });

  return (
    <div className="container-fluid fondo min-vh-100">
      <h2 className="text-center text-white py-3">Campeones de League of Legends</h2>

      {/* 🧱 Lista de campeones */}
      <div className="row">
        {filteredChampions.map((champ) => (
          <div className="col-6 col-md-3 col-lg-2 mb-4" key={champ.id}>
            <Link to={`/champion/${champ.id}`} className="text-decoration-none text-dark">
              <div className="card bg-gradient bg-dark text-white h-100 border">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/${champ.image.full}`}
                  className="card-img-top"
                  alt={champ.name}
                />
                <div className="card-body">
                  <h6 className="card-title">{champ.name}</h6>
                  <small>{champ.tags.join(', ')}</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
