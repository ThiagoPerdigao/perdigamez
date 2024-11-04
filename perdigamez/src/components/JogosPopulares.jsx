import React, { useEffect, useState } from 'react';
import Detalhes from './detalhes'; 

const JogosPopulares = () => {
  const [jogos, setJogos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [jogoId, setJogoId] = useState(null); // Estado para armazenar o ID do jogo a ser exibido
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do popup
  const totalPaginas = 10; // Número total de páginas (substitua conforme necessário)

  useEffect(() => {
    // A cada mudança na página atual, busca novos jogos
    fetch(`https://api.rawg.io/api/games?key=3ab23716238f4a32b8f746f65f42b448&page=${paginaAtual}&page_size=4`)
      .then(response => response.json())
      .then(data => setJogos(data.results)) // Armazena os resultados da página
      .catch(error => console.error('Erro ao buscar jogos:', error));
  }, [paginaAtual]);

  const handleOpenPopup = (id) => {
    setJogoId(id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setJogoId(null);
  };

  return (
    <section className="bg-[#151417]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-white sm:text-3xl">JOGOS POPULARES!</h2>
          <p className="mt-4 max-w-md text-white">
            Descubra os jogos mais populares do momento.
          </p>
        </header>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jogos.map(jogo => (
            <li key={jogo.id}>
              <button onClick={() => handleOpenPopup(jogo.id)} className="group block overflow-hidden">
                <img
                  src={jogo.short_screenshots[0]?.image}
                  alt={jogo.name}
                  className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
                <div className="relative bg-transparent pt-3">
                  <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 p-2">
                    <h3 className="text-sm font-bold text-white text-center">
                      {jogo.name}
                    </h3>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
          <li>
            <button
              onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
              className="inline-flex size-8 items-center bg-indigo-600 text-white justify-center rounded border-2 border-gray-100 p-2"
              disabled={paginaAtual === 1}
            >
              <span className="sr-only">Página Anterior</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>

          {/* Paginação numérica */}
          {Array.from({ length: totalPaginas }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => setPaginaAtual(index + 1)}
                className={` size-8 rounded border-2 border-gray-100 text-lg px-4 py-2 flex items-center justify-center ${paginaAtual === index + 1 ? 'bg-indigo-600 text-white' : 'text-white'}`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))}
              className="inline-flex size-8 items-center justify-center bg-indigo-600 rounded border-2 text-white border-gray-100 p-2"
              disabled={paginaAtual === totalPaginas}
            >
              <span className="sr-only">Próxima Página</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ol>
      </div>

      {showPopup && <Detalhes jogoId={jogoId} onClose={handleClosePopup} />}
    </section>
  );
};

export default JogosPopulares;
