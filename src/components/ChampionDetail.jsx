import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChampionDetail({ language }) {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [selectedSkin, setSelectedSkin] = useState(0);
  const totalSkins = champion?.skins?.length || 1;

  const handleNextSkin = () => {
    setSelectedSkin((prev) => (prev + 1) % totalSkins);
  };

  const handlePrevSkin = () => {
    setSelectedSkin((prev) => (prev - 1 + totalSkins) % totalSkins);
  };

  useEffect(() => {
    async function fetchChampionDetail() {
      const version = '15.7.1';
      const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${id}.json`);
      const data = await res.json();
      setChampion(data.data[id]);
    }
  
    fetchChampionDetail();
  }, [id, language]);  // El idioma es una de las dependencias

  if (!champion) return <p className="text-center mt-5">Cargando...</p>;

  const splashArt = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;
  return (
    <div
      className="position-relative min-vh-100 text-white"
      style={{
        backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Capa oscura encima del fondo */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.95))',
          zIndex: 1,
        }}
      ></div>

      {/* Contenido encima del difuminado */}
      <div className="position-relative z-2">
        <div className="container-fluid ">
          <h2 className="text-center py-3">{champion.name} - {champion.title}</h2>

          {/* CARRUSEL DE SKINS */}
          <div id="championCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {champion.skins.map((skin, index) => (
                <button
                  key={skin.num}
                  type="button"
                  data-bs-target="#championCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="carousel-inner">
              {champion.skins.map((skin, index) => (
                <div
                  key={skin.num}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
                    className="d-block w-100 rounded"
                    alt={skin.name}
                  />
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#championCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Anterior</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#championCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>

          {/* TEXTO DETALLE */}
          <p className=" pt-3"><strong>Rol principal:</strong> {champion.tags.join(', ')}</p>
          <p><strong>Descripción:</strong> {champion.blurb}</p>
          <strong> {champion.passive.name} (Pasiva):</strong> {champion.passive.description}

          <h4 className="mt-4 text-center">Habilidades</h4>
          <div className="row mt-4">
            {/* Habilidades activas */}
            {champion.spells.map((spell, i) => (
              <div className="col-12 col-md-6 col-lg-3 mb-3" key={spell.id}>
                <div className="card bg-gradient bg-dark text-white h-100 border">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/15.7.1/img/spell/${spell.id}.png`}
                    className="card-img-top rounded-3"
                    alt={spell.name}
                    style={{ objectFit: 'contain', height: '150px' }}
                  />
                  <div className="card-body">
                    <h6 className="card-title ">
                      {['Q', 'W', 'E', 'R'][i]} – {spell.name}
                    </h6>
                    <p className="card-text" style={{ fontSize: '0.9rem' }}>
                      {spell.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
  );
}
