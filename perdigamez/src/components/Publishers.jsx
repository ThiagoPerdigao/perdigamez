import React, { useEffect, useState } from 'react';

// Importando imagens diretamente (ajuste os nomes conforme necessário)
import ubisoft from '../assets/Ubisoft.png';
import valveSoftware from '../assets/Valve.png';
import feralInteractive from '../assets/Feral.png';
import squareEnix from '../assets/Square.png';
import electronicArts from '../assets/Electronic.png';
import capcom from '../assets/Capcom.png';
import sonyInteractive from '../assets/Sony.png';
import aspyrMedia from '../assets/Aspyr.png';

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [gamesByPublisher, setGamesByPublisher] = useState({});
  const [showAll, setShowAll] = useState(false); // Estado para controlar a exibição dos publishers

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await fetch('https://api.rawg.io/api/developers?key=3ab23716238f4a32b8f746f65f42b448');
        const data = await response.json();
        setPublishers(data.results.slice(0, 9)); // Limitar a 9 publishers
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchPublishers();
  }, []);

  useEffect(() => {
    const fetchGamesForAllPublishers = async () => {
      const gamesData = {};

      for (const publisher of publishers) {
        try {
          const response = await fetch(`https://api.rawg.io/api/games?key=3ab23716238f4a32b8f746f65f42b448&developers=${publisher.id}`);
          const data = await response.json();
          gamesData[publisher.id] = data.results.slice(0, 3).map(game => game.name); // Obtém os 3 primeiros jogos
        } catch (error) {
          console.error(`Erro ao buscar jogos da desenvolvedora ${publisher.name}:`, error);
          gamesData[publisher.id] = [];
        }
      }

      setGamesByPublisher(gamesData);
    };

    if (publishers.length > 0) {
      fetchGamesForAllPublishers();
    }
  }, [publishers]);

  // Mapeamento para as imagens das desenvolvedoras
  const imageMapping = {
    'ubisoft': ubisoft,
    'valve': valveSoftware,
    'feral': feralInteractive,
    'square': squareEnix,
    'electronic': electronicArts,
    'capcom': capcom,
    'sony': sonyInteractive,
    'aspyr': aspyrMedia,
  };

  // Lista de publishers a serem exibidos: 4 inicialmente ou todos caso "showAll" seja true
  const publishersToDisplay = showAll ? publishers : publishers.slice(0, 4);

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8"> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {publishersToDisplay.map((publisher, index) => {
          const nomeDesenvolvedora = publisher.name.split(' ')[0].toLowerCase();
          const jogos = gamesByPublisher[publisher.id] || [];

          return (
            <article key={index} className="flex bg-[#1e1e1e] text-white transition hover:shadow-xl"> 
              <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                <time
                  dateTime={new Date().toISOString().split('T')[0]}
                  className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-white"
                >
                  <span>{new Date().getFullYear()}</span>
                  <span className="w-px flex-1 bg-white"></span>
                  <span>PERDIGAMEZ</span>
                </time>
              </div>

              <div className="hidden sm:block sm:basis-56">
                <img
                  alt={publisher.name}
                  src={imageMapping[nomeDesenvolvedora] || '../assets/default.png'} 
                  className="aspect-square h-full w-full object-cover" 
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                  <h3 className="font-bold uppercase text-white">{publisher.name}</h3>
                  <div className="mt-2 text-sm text-white">
                    {jogos.length > 0 ? (
                      <ul>
                        {jogos.map((game, gameIndex) => (
                          <li key={gameIndex}>• {game}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>Carregando jogos...</p>
                    )}
                  </div>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end">
                  <p
                    href="#"
                    className="block bg-indigo-600 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-indigo-700"
                  >
                    {publisher.games_count} jogos publicados
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Botão para exibir mais publishers */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)} // Alterna o estado
          className="bg-indigo-600 px-6 py-3 text-white font-bold uppercase rounded transition hover:bg-indigo-500"
        >
          {showAll ? 'Mostrar menos' : 'Mais devs'} 
        </button>
      </div>
    </div>
  );
};

export default Publishers;
