import React from 'react';

const JogoDestaque = ({ jogo }) => {
  return (
    <section className='bg-[#151417]'>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8"> {/* Reduzindo o padding vertical */}
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative z-10 lg:py-10">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt={jogo.name} 
                src={jogo.background_image} 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-[#1e1e1e]">
            <span
              className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-indigo-600"
            ></span>

            <div className="p-4 sm:p-8 lg:p-16"> 
              <h3 className="text-lg font-semibold text-indigo-400">DESTAQUE DO MÊS</h3> 
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {jogo.name} 
              </h2>

              <p className="mt-2 text-white text-sm">
                {jogo.description_raw}
              </p>

              <p className="mt-4 text-white">
                <strong>Publisher:</strong> {jogo.developers[0]?.name || 'Desconhecido'} 
                <span className="mx-2">|</span>
                <strong>Metacritic:</strong> {jogo.metacritic || 'N/A'} 
              </p>
              
              <p className="mt-4 text-white">
                <strong>Genre:</strong> {jogo.genres[0]?.name || 'Desconhecido'}
                <span className="mx-2">|</span>
                <strong>Available:</strong> {jogo.platforms.map(platform => platform.platform.name).join(', ') || 'N/A'} 
              </p>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JogoDestaque;
