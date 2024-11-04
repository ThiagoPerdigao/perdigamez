import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import JogoDestaque from '../components/JogoDestaque';
import JogosPopulares from '../components/JogosPopulares';
import Publishers from '../components/Publishers';
import ResultadosPesquisa from '../components/ResultadosPesquisa';
import Footer from '../components/footer';

const MainPage = () => {
  const [jogo, setJogo] = useState(null); 
  const [jogosPesquisados, setJogosPesquisados] = useState([]); 

  useEffect(() => {
    const fetchJogoDoMes = async () => {
      try {
        const response = await fetch('https://api.rawg.io/api/games?key=3ab23716238f4a32b8f746f65f42b448');
        const data = await response.json();
        const mesAtual = new Date().getMonth();
        const jogoMensal = data.results[mesAtual];

        if (jogoMensal) {
          const jogoDetalhesResponse = await fetch(`https://api.rawg.io/api/games/${jogoMensal.id}?key=3ab23716238f4a32b8f746f65f42b448`);
          const jogoDetalhes = await jogoDetalhesResponse.json();
          setJogo(jogoDetalhes);
        } else {
          console.error('Dados não disponíveis para o mês atual.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchJogoDoMes(); 
  }, []);

  const pesquisarJogos = async (textoPesquisa) => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=3ab23716238f4a32b8f746f65f42b448&search=${textoPesquisa}`);
      const data = await response.json();
      setJogosPesquisados(data.results || []); 
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    }
  };

  return (
    <div>
      <Header onSearch={pesquisarJogos} /> 
      <main className="bg-[#151417] min-h-screen">
        
        {/* Renderizando Resultados da Pesquisa somente se houver jogos pesquisados */}
        {jogosPesquisados.length > 0 && (
          <section className="py-8">
            <ResultadosPesquisa jogos={jogosPesquisados} /> 
          </section>
        )}

        {/* Seção dos Jogos Populares */}
        <section className="py-8">
          <JogosPopulares /> 
        </section>

        {/* Seção do Jogo em Destaque */}
        <section className="pt-8 pb-32">
          <h2 className="text-3xl font-bold text-center text-white mb-6">DESTAQUE DO MÊS!</h2>
          {jogo ? (
            <JogoDestaque jogo={jogo} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#151417]">
              <h1 className="text-4xl font-bold text-white">Carregando Jogo do Mês...</h1>
            </div>
          )}
        </section>

        {/* Seção dos Publishers */}
        <section className="py-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">PRINCIPAIS DESENVOLVEDORAS!</h2>
          <Publishers /> 
        </section>
        
      </main>

      {/* Adicionando o Footer no final da página */}
      <Footer /> 
      
    </div>
  );
};

export default MainPage;
