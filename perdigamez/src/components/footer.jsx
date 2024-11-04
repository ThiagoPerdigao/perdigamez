import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  // Função para rolar suavemente para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-transparent relative">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        {/* Botão de voltar ao topo */}
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <button
            onClick={scrollToTop}
            className="inline-block rounded-full bg-indigo-600 p-2 text-white shadow transition hover:bg-indigo-700 sm:p-3 lg:p-4"
          >
            <span className="sr-only">Back to top</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Logo e descrição */}
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center  text-teal-600 lg:justify-start">
              <img src={logo} alt="Logo" className="h-8 mx-auto" />
            </div>
            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white">
            Olá, sou Thiago Perdigão! Recriei este projeto, feito no primeiro período, usando React e Tailwind CSS para ver minha evolução como desenvolvedor. O repositório contém a versão original para comparação e registro do aprendizado.
            </p>
          </div>

          {/* Links de navegação */}
          <nav className="mt-12 flex justify-center gap-6 lg:justify-start">
            <a
              href="https://github.com/ThiagoPerdigao"
              className="text-white transition hover:text-indigo-600"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/thiago-perdigao/"
              className="text-white transition hover:text-indigo-600"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ThiagoPerdigao/perdigamez"
              className="text-white transition hover:text-indigo-600"
              aria-label="Repositório do Projeto"
            >
              Repositório do projeto
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
