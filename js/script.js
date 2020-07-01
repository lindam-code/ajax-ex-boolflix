$(document).ready(function(){
  // API key: 4c34d07e5d578ee7bace09dde277dacb
  // API eg: https://api.themoviedb.org/3/movie/550?api_key=4c34d07e5d578ee7bace09dde277dacb

  // Assoccio un evento click al bottone invia
  $('#title-submit').click(function(){
    // Creo la variabile stringa da passare alla chiamata
    // Prendendo il valore della input
    var titleFilm = $('#search-film').val();
    chiamatAjax(titleFilm);
  });

  // FUNZIONI
  // Funzione che fa la chiamata Aajax per i film
  // Accetta: queryUser, stringa del titolo (o una parte) del film  da cercare
  // Return:
  function chiamatAjax(queryUser) {
    // Inizio chiamata Ajax
    $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
          api_key: '4c34d07e5d578ee7bace09dde277dacb',
          language: 'it-IT',
          query: queryUser
        },
        success: function(dataResponse){
          console.log(dataResponse.results);
        },
        error: function(){
          alert: ('Si è verificato un errore sulla chiamata API');
        }
      }
    );
      // Fine chiamata Ajax per vedere film
  };
});
