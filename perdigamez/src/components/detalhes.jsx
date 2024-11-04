import React, { useEffect, useState } from 'react';

const Detalhes = ({ jogoId, onClose }) => {
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${jogoId}?key=3ab23716238f4a32b8f746f65f42b448`);
        if (!response.ok) {
          throw new Error('Detalhes do jogo não encontrados.');
        }
        const data = await response.json();
        setDetalhes(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
        setDetalhes(null);
      }
    };

    if (jogoId) {
      fetchDetalhes();
    }
  }, [jogoId]);

  if (!detalhes) return null; // Exibe nada se os detalhes não estiverem disponíveis

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 bg-[#1e1e1e] relative">
        <img
          alt={detalhes.name}
          src={detalhes.background_image || 'https://via.placeholder.com/150'}
          className="h-32 w-full object-cover md:h-full"
        />

        <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
          <h2 className="mt-6 font-black uppercase text-white">
            <span className="text-4xl font-black sm:text-5xl lg:text-6xl">{detalhes.name}</span>
            <span className="mt-2 block text-sm text-gray-400">{detalhes.released}</span>
          </h2>
          <p className="mt-2 text-sm text-white">{detalhes.description_raw}</p>
          <ul className="mt-4 text-left text-white">
            <li><strong>Publisher:</strong> {detalhes.developers[0]?.name}</li>
            <li><strong>Metacritic:</strong> {detalhes.metacritic}</li>
            <li><strong>Genre:</strong> {detalhes.genres.map(genre => genre.name).join(', ')}</li>
            <li><strong>Available on:</strong> {detalhes.platforms.map(platform => platform.platform.name).join(', ')}</li>
          </ul>
        </div>


        <button
          onClick={onClose}
          className="absolute top-16 right-10 bg-indigo-600 text-white p-2 rounded-md focus:outline-none"
          aria-label="Fechar"
        >
          &times; {/* Este é o símbolo de fechar (X) */}
        </button>
      </section>
    </div>
  );
};

export default Detalhes;
