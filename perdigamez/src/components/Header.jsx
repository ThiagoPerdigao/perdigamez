import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText); // Chama a função de pesquisa passada como prop
  };

  return (
    <header className="bg-[#151417]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <p className="block text-indigo-600" href="#">
              <span className="sr-only">Home</span>
              <img className="h-8" src={logo} alt="Logo" />
            </p>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-indigo-600 w-80">
                  <label htmlFor="Search" className="sr-only">Search</label>
                  <input
                    type="text"
                    id="Search"
                    placeholder="Pesquise pelos seus jogos!"
                    className="peer h-10 w-full border-none bg-transparent text-white p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} // Atualiza o texto da pesquisa
                  />
                  <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Pesquise pelos seus jogos!
                  </span>

                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button type="button" onClick={handleSearch} className="text-white hover:text-indigo-600">
                      <span className="sr-only">Search</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
