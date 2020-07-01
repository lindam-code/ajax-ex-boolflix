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
          // Salvo l'array risultante dalla chiamata API sul sito TMDB
          var arrayFilm = dataResponse.results;
          printFilmInfo(arrayFilm);
        },
        error: function(){
          alert: ('Si è verificato un errore sulla chiamata API');
        }
      }
    );
      // Fine chiamata Ajax per vedere film
  };

  // Funzione per stampare a schermo le info dei film usando Handelbars
  // Accetta: arrayFilm, un array con le informazioni dei film
  // Return: niente stampa a schermo le info di interesse
  function printFilmInfo(arrayFilm) {
    // Stampo a schermo le info dei film con Handelbars
    var source = document.getElementById("film-template").innerHTML;
    var template = Handlebars.compile(source);
    // Ciclo per vedere le info di ogni singolo film
    for (var i = 0; i < arrayFilm.length; i++) {
      var singleFilm = arrayFilm[i];
      var title = singleFilm.title;
      var originalTitle = singleFilm.original_title;
      var lenguage = singleFilm.original_language;
      var vote = singleFilm.vote_average;
      var context = {
        title: title,
        originalTitle: originalTitle,
        lenguage: lenguage,
        vote: vote
      };
      var html = template(context);
      $('.film-info').append(html);
    }
  };
  // FINE FUNZIONI


});
