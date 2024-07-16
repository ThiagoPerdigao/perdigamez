const apiKey = '3ab23716238f4a32b8f746f65f42b448'
let txtSearch = document.getElementById('txtSearch')
let btnSearch = document.getElementById('btnSearch')
let lancamento = document.getElementById('lancamento')

function doSearch() {
  let textoPesquisa = txtSearch.value
  let url = `https://api.rawg.io/api/games?key=${apiKey}&search=${textoPesquisa}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let saida = ''
      for (let i = 0; i < data.results.length; i++) {
        let game = data.results[i]
        saida += ` 
        
         <div class="col-sm">
           <p class="jogx">${game.name}</p> 
               <img src="${game.short_screenshots[0].image}"  width="230px" style="border-radius: 2rem">
               <p class="maisdet"><a href="detalhes.html?jogoespc=${game.id}">Mais detalhes</a></p>
               </div>
       
         
         
         `
      }
      lancamento.innerHTML = saida


    })

}

document.body.onload = () => {
  btnSearch.addEventListener('click', doSearch)
}



document.addEventListener("keypress", function(e) {

  if (e.key === "Enter") {

    const btn = document.querySelector("#btnSearch");
    btn.click();
  }
})







$(document).ready(function() {
  $.ajax({
    url: "https://api.rawg.io/api/games?key=3ab23716238f4a32b8f746f65f42b448",
    type: "GET",
    success: function(jogos) {
      jogos.results


      for (i = 10; i < 13; i++) {

        let JOGUITOS = jogos.results[i]

        $("#lancamento").append(` 

          
    <div class="col-sm">
      <p class="jogx">${JOGUITOS.name}</p> 
          <img src="${JOGUITOS.short_screenshots[0].image}"  width="230px" style="border-radius: 2rem">
          <p class="maisdet"><a href="detalhes.html?jogoespc=${JOGUITOS.id}">Mais detalhes</a></p>
          </div>
     
        
          
          
          `)



        console.log(jogos);
      }
    }


  })
})

$(document).ready(function() {
  $.ajax({
    url: "https://api.rawg.io/api/platforms?key=3ab23716238f4a32b8f746f65f42b448",
    type: "GET",
    success: function(plataform) {
      plataform.results


      for (i = 1; i < 4; i++) {

        let PLATZ = plataform.results[i]

        $("#plataforma").append(` 

          <div class="row">
    <div class="col-sm">
      <p class="jogx">${PLATZ.name}</p> 
          <img src="${PLATZ.image_background}" width="230px" style="border-radius: 2rem";>
          <ul>
          <li>${PLATZ.games[4].name}</li>
          <li>${PLATZ.games[5].name}</li>
          <li>${PLATZ.games[2].name}</li>
        </ul>
    </div>

          `)



        console.log(plataform);
      }
    }


  })
})





$(document).ready(function() {
  $.ajax({
    url: "https://api.rawg.io/api/developers?key=3ab23716238f4a32b8f746f65f42b448",
    type: "GET",
    success: function(devzeira) {
      devzeira.results


      for (i = 6; i < 9; i++) {

        let DEVZ = devzeira.results[i]

        $("#devs").append(` 
          <div class="row">
    <div class="col-sm">
      <p class="jogx">${DEVZ.name}</p> 
          <img src="${DEVZ.image_background}" width="230px" style="border-radius: 2rem; border: 10px ">
          <ul>
          <li>${DEVZ.games[4].name}</li>
          <li>${DEVZ.games[5].name}</li>
          <li>${DEVZ.games[2].name}</li>
        </ul>
          </div>
          `)



        console.log(devzeira);
      }
    }


  })
})



$(document).ready(function() {

  let urlString = window.location.href;

  let paramString = urlString.split('?')[1];
  let queryString = new URLSearchParams(paramString);

  for (let pair of queryString.entries()) {
    var jogo_id = pair[1];
  }

  $.ajax({
    url: "https://api.rawg.io/api/games/" + jogo_id + "?key=3ab23716238f4a32b8f746f65f42b448",
    type: "GET",
    dataType: "json",
    crossDomain: true,
    success: function(JOGOTO) {

      console.log("É ESSE AQ", JOGOTO);
      JOGOTO.results
      $("#detalhes").append(`
        

                    <div class="row">
                    <div class="col-lg-6 col-sm-12 col-md-6">
                    <img src="${JOGOTO.background_image}" width="300px" style="border-radius: 2rem; margin-bottom: 1rem;">
                    <img src="${JOGOTO.background_image_additional}" width="300px" style="border-radius: 2rem";>
                    </div>
                    
                    <div class="col-lg-6 col-sm-12 col-md-6" id="metade3">
                    <h2 style="font-size:3rem;"> ${JOGOTO.name} </h2>
                    <p style="font-size:15px;">
                    <strong>Desenvolvedora:</strong> ${JOGOTO.developers[0].name} <br>
                    <strong>Metacritic:</strong> ${JOGOTO.metacritic} <br>
                    <strong>Gênero:</strong> ${JOGOTO.genres[0].name} <br>
                    <strong>Plataformas:</strong>${JOGOTO.platforms[0].platform.name}, ${JOGOTO.platforms[1].platform.name}, ${JOGOTO.platforms[2].platform.name} <br>
                    <strong>Avaliação:</strong> ${JOGOTO.rating} / ${JOGOTO.rating_top} <br>
                    <strong>Descrição:</strong> ${JOGOTO.description_raw} <br>
                    </p>
                    
                     
                    
                    </div>
                </div>    
                          </div>
                    `)
    },
  })
})









