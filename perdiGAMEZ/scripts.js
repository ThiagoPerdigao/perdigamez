const apiKey = '3ab23716238f4a32b8f746f65f42b448';


//função exibir jogo do mês em destaque, desimplementada
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.rawg.io/api/games?key=3ab23716238f4a32b8f746f65f42b448')
      .then(response => response.json())
      .then(data => {
        const mesAtual = new Date().getMonth();
        const jogoMensal = data.results[mesAtual];
  
        if (jogoMensal) {
          // Faz um único fetch para obter os detalhes do jogo mensal
          fetch(`https://api.rawg.io/api/games/${jogoMensal.id}?key=3ab23716238f4a32b8f746f65f42b448`)
            .then(response => response.json())
            .then(jogoDoMes => {
              
              $("#mensal").append(`
                  <div class="col-lg-6 col-sm-12 col-md-6">
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img class="d-block w-100" src="${jogoDoMes.background_image}" alt="${jogoDoMes.name}">
                        </div>
                        <div class="carousel-item">
                          <img class="d-block w-100" src="${jogoDoMes.background_image_additional}" alt="${jogoDoMes.name}">
                        </div>
                      </div>
                      <a class="carousel-control-prev" href="#carouselExampleSlidesOnly" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" href="#carouselExampleSlidesOnly" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-12 col-md-6">
                    
                    <h2 style="font-size:3rem;"> ${jogoDoMes.name} </h2>
                    <p style="font-size: 15px;">
                    ${jogoDoMes.description_raw}
                    </p>

                    <p style="font-size: 20px;">
                    <strong>Publisher:</strong> ${jogoDoMes.developers[0].name} <span style="margin-right: 15px;"></span>
                    <strong>Metacritic:</strong> ${jogoDoMes.metacritic} 
                    </p>
                    <p style="font-size: 20px;">
                    <strong>Publisher:</strong> ${jogoDoMes.genres[0].name} <span style="margin-right: 15px;"></span>
                    <strong>Available:</strong> ${jogoDoMes.platforms[0].platform.name}, ${jogoDoMes.platforms[1].platform.name}, ${jogoDoMes.platforms[2].platform.name} 
                    </p>

                  </div>
              `);
  
              // Inicializa o carrossel após adicionar as imagens dinamicamente
              $("#carouselExampleSlidesOnly").carousel();
            })
            .catch(error => {
              console.error('Erro ao buscar detalhes do jogo mensal:', error);
            });
        } else {
          console.error('Dados não disponíveis para o mês atual.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  });
  
  
  
  
  document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.rawg.io/api/games?key=3ab23716238f4a32b8f746f65f42b448')
      .then(response => response.json())
      .then(data => {
        const resultadoLancamento = data.results;

      
        const numeroAleatorio = gerarNumeroAleatorio();

      
        const numeroFinal = numeroAleatorio + 3;

        
        for (let i = numeroAleatorio; i < numeroFinal; i++) {
          const lancamento = resultadoLancamento[i];
  
          
          const classificacao = lancamento.rating || 0;
  
          const genre1 = lancamento.genres[0] ? lancamento.genres[0].name : 'Gênero não disponível';
          const genre2 = lancamento.genres[1] ? lancamento.genres[1].name : 'Gênero não disponível';
  
          const platform1 = lancamento.parent_platforms[0] ? lancamento.parent_platforms[0].platform.name : '';
          const platform2 = lancamento.parent_platforms[1] ? lancamento.parent_platforms[1].platform.name : '';
          const platform3 = lancamento.parent_platforms[2] ? lancamento.parent_platforms[2].platform.name : '';
  
          // Cria os ícones das estrelas
          const estrelasHtml = criarIconesEstrela(classificacao);
  
          document.getElementById('destaques').innerHTML += `
            <a href="details.html?jogo=${lancamento.id}" class="cardDestaque card bg-dark text-white mx-auto " style="text-decoration: none;">
              <img class="card-img" src="${lancamento.short_screenshots[0].image}" alt="Card image">
              <div class="card-img-overlay">
                <div class="text-overlay">
                  <h5 class="card-title">${lancamento.name}</h5>
                  <p class="card-text">${platform1} / ${platform2} / ${platform3}</p>
                  <p class="card-text">${genre1} / ${genre2}</p>
                  <p class="card-text">${estrelasHtml}</p>
                </div>
              </div>
            </a>
          `;
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
});

function criarIconesEstrela(classificacao) {
    const estrelasCheias = Math.floor(classificacao);
    const resto = classificacao - estrelasCheias;
    const estrelaMeia = resto >= 0.4;
    const estrelasVazias = 5 - estrelasCheias - (estrelaMeia ? 1 : 0);
  
    let htmlEstrelas = '';
  
    for (let i = 0; i < estrelasCheias; i++) {
      htmlEstrelas += '<i class="bi bi-star-fill"></i> ';
    }
  
    if (estrelaMeia) {
      htmlEstrelas += '<i class="bi bi-star-half"></i> ';
    }
  
    for (let i = 0; i < estrelasVazias; i++) {
      htmlEstrelas += '<i class="bi bi-star"></i> ';
    }
  
    return htmlEstrelas;
}

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 18);
}



  
// Função para criar ícones de estrelas com base na classificação
function criarIconesEstrela(classificacao) {
    const estrelasCheias = Math.floor(classificacao);
    const resto = classificacao - estrelasCheias;
    const estrelaMeia = resto >= 0.4;
    const estrelasVazias = 5 - estrelasCheias - (estrelaMeia ? 1 : 0);
  
    let htmlEstrelas = '';
  
    for (let i = 0; i < estrelasCheias; i++) {
      htmlEstrelas += '<i class="bi bi-star-fill"></i> ';
    }
  
    if (estrelaMeia) {
      htmlEstrelas += '<i class="bi bi-star-half"></i> ';
    }
  
    for (let i = 0; i < estrelasVazias; i++) {
      htmlEstrelas += '<i class="bi bi-star"></i> ';
    }
  
    return htmlEstrelas;
  }

  function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 18);
  }
  

  document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.rawg.io/api/platforms?key=3ab23716238f4a32b8f746f65f42b448')
      .then(response => response.json())
      .then(data => {
        const numeroAleatorio = 0;
        const numeroFinal = numeroAleatorio + 3;
  
        
        for (let i = numeroAleatorio; i < numeroFinal; i++) {
          let plataforma = data.results[i];
  
          // Construindo a lista de jogos com abreviação se necessário
          let gamesList = '';
          for (let j = 0; j < 3; j++) {
            if (plataforma.games[j]) {
              let gameName = plataforma.games[j].name.length > 20 ? plataforma.games[j].name.substring(0, 20) + '...' : plataforma.games[j].name;
              gamesList += `<li class="list-group-item">${gameName}</li>`;
            } else {
              gamesList += `<li class="list-group-item">N/A</li>`;
            }
          }
  
          document.getElementById('plataforma').innerHTML += `
            <div class="cardPlataforma card d-flex flex-column flex-md-row mr-4 mt-5 mb-5">
              <div class="card-img-container">
                <img class="card-img-left img-fluid" src="images/platform/${plataforma.name}.png" alt="Card image cap">
              </div>
              <div class="d-flex flex-column flex-grow-1">
                <div class="card-body">
                  <h5 class="card-title">${plataforma.name}</h5>
                  <p class="card-text"> </p>
                  <ul class="list-group list-group-flush">
                    ${gamesList}
                  </ul>
                </div>
              </div>
            </div>
          `;
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
});


  
  

function gerarNumeroAleatorioPlataforma() {
    return Math.floor(Math.random() * 44);
  }


  document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.rawg.io/api/developers?key=3ab23716238f4a32b8f746f65f42b448')
        .then(response => response.json())
        .then(data => {
            let cardsContent = '';

            for (let i = 0; i < 10; i++) {
                let desenvolvedora = data.results[i];

                let nomeDesenvolvedora = desenvolvedora.name.split(' ').slice(0, 2).join(' ');
                let primeiraPalavraNome = nomeDesenvolvedora.split(' ')[0];

                let gamesList = '';
                for (let j = 0; j < 3; j++) {
                    if (desenvolvedora.games[j]) {
                        let gameName = desenvolvedora.games[j].name.length > 20 ? desenvolvedora.games[j].name.substring(0, 20) + '...' : desenvolvedora.games[j].name;
                        gamesList += `<li class="list-group-item">${gameName}</li>`;
                    } else {
                        gamesList += `<li class="list-group-item">N/A</li>`;
                    }
                }

                let cardContent = `
                    <div class="col-md-2 mb-3 cardPublisher-col">
                        <div class="cardPublisher">
                            <img class="card-img-top" src="images/publisher/${primeiraPalavraNome}.png" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${nomeDesenvolvedora}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                ${gamesList}
                            </ul>
                        </div>
                    </div>
                `;

                cardsContent += cardContent;
            }

            document.getElementById('publishers').innerHTML = `
                <div class="row justify-content-center mb-5">
                    ${cardsContent}
                </div>
            `;
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
});
  
  
  document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '3ab23716238f4a32b8f746f65f42b448';
    const destaquesContainer = document.getElementById('resultado');
    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');
    const resultsTitle = document.querySelector('.resultsTitle');
    const hrPesquisa = document.querySelector('.hrPesquisa');
  
    function formatarEstrelas(classificacao) {
        let estrelasHtml = '<i class="fas fa-star"></i>'.repeat(Math.floor(classificacao));
        if (classificacao % 1 !== 0) {
            estrelasHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        return estrelasHtml;
    }
  
    function exibirResultados(jogos) {
        destaquesContainer.innerHTML = '';
  
        for (let i = 0; i < jogos.length; i++) {
            const jogo = jogos[i];
            const classificacao = jogo.rating || 0;
            const genero1 = jogo.genres[0] ? jogo.genres[0].name : 'Gênero não disponível';
            const genero2 = jogo.genres[1] ? jogo.genres[1].name : 'Gênero não disponível';
            const plataforma1 = jogo.parent_platforms[0] ? jogo.parent_platforms[0].platform.name : 'N/A';
            const plataforma2 = jogo.parent_platforms[1] ? jogo.parent_platforms[1].platform.name : 'N/A';
            const plataforma3 = jogo.parent_platforms[2] ? jogo.parent_platforms[2].platform.name : 'N/A';
            const estrelasHtml = formatarEstrelas(classificacao);
  
            destaquesContainer.innerHTML += `
                <div class="swiper-slide">
                    <a href="details.html?jogo=${jogo.id}" class="cardPesquisa card bg-dark text-white mx-auto mt-5 mb-5" style="text-decoration: none;">
                        <img class="card-img" src="${jogo.short_screenshots[0].image}" alt="Card image">
                        <div class="card-img-overlay">
                            <div class="text-overlay">
                                <h5 class="card-title">${jogo.name}</h5>
                                <p class="card-text">${plataforma1} / ${plataforma2} / ${plataforma3}</p>
                                <p class="card-text">${genero1} / ${genero2}</p>
                                <p class="card-text">${estrelasHtml}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }
  
        if (jogos.length > 0) {
            // Remove hidden attribute 
            nextButton.hidden = false;
            prevButton.hidden = false;
            resultsTitle.hidden = false;
            hrPesquisa.hidden = false;
  
            // Initialize Swiper
            new Swiper('.swiper-container', {
                slidesPerView: 3,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    }
  
    function pesquisarJogos() {
        const textoPesquisa = document.getElementById('txtSearch').value;
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${textoPesquisa}`;
  
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const jogos = data.results;
                exibirResultados(jogos);
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    }
  
    document.getElementById('btnSearch').addEventListener('click', pesquisarJogos);
});
  
  


