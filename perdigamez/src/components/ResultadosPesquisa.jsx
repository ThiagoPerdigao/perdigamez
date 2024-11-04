import React, { useState } from 'react';
import Detalhes from './detalhes';

const ResultadosPesquisa = ({ jogos }) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const jogosPorPagina = 4; // Definindo o número de jogos por página
  const totalPaginas = Math.ceil(jogos.length / jogosPorPagina); // Calcula o número total de páginas
  const [jogoId, setJogoId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = (id) => {
    setJogoId(id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setJogoId(null);
  };

  // Determina os jogos que serão exibidos na página atual
  const indexInicio = (paginaAtual - 1) * jogosPorPagina;
  const jogosExibidos = jogos.slice(indexInicio, indexInicio + jogosPorPagina);

  return (
    <section className="bg-[#151417]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-white sm:text-3xl">RESULTADOS DA PESQUISA</h2>
          <p className="mt-4 max-w-md text-white">
            Aqui estão os jogos que correspondem à sua pesquisa.
          </p>
        </header>

        {jogosExibidos.length > 0 ? (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {jogosExibidos.map(jogo => (
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
        ) : (
          <p className="mt-4 text-white">Nenhum jogo encontrado para sua pesquisa.</p>
        )}

        {/* Navegação de Paginação */}
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
                className={`block size-8 rounded border-2 border-gray-100 text-lg px-4 py-2 flex items-center justify-center ${paginaAtual === index + 1 ? 'bg-indigo-600 text-white' : 'text-white'}`}
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

export default ResultadosPesquisa;
