$(document).ready(function(){
  // API key: 4c34d07e5d578ee7bace09dde277dacb
  // API eg: https://api.themoviedb.org/3/movie/550?api_key=4c34d07e5d578ee7bace09dde277dacb

  // Associo un evento click al bottone invia
  $('#title-submit').click(function(){
    // Creo la variabile stringa da passare alla chiamata API
    // prendendo il valore della input
    var userSearch = $('#search-film').val();
    getMovies(userSearch);
  });

  // FUNZIONI
  // Funzione che fa la chiamata Aajax per i film
  // Accetta: queryUser, stringa del titolo (o una parte) del film  da cercare
  // Return: stampa a schermo le info dei film
  function getMovies(queryUser) {
    reset();
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
          if (arrayFilm.length > 0) {
            printFilmInfo(arrayFilm);
          } else {
            var message = 'Errore: la parola scritta non produce risultati.';
            printError(message);
          };

        },
        error: function(){
          var message = 'Errore: non hai scritto un titolo da cercare.';
          printError(message);
        }
      }
    );
      // Fine chiamata Ajax per vedere film
  };

  // Funzione per stampare a schermo le info dei film usando Handelbars
  // Accetta: arrayFilm, un array con le informazioni dei film
  // Return: niente stampa a schermo le info di interesse
  function printFilmInfo(arrayFilm) {
    // Preparo template di Handelbars
    var source = $('#film-template').html();
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
      $('#film-container').append(html);
    }
  };

  // Funzione che svuota nella pagina il contenitore dei film
  function reset(){
    $('#film-container').text('');
  };

  // Funzione per stampare un messaggio di errore
  // Accetta: message, messaggio da stampare
  // Return: nulla, stampa il messaggio a schermo
  function printError(message){
    // Preparo template di Handelbars
    var source = $('#error-template').html();
    var template = Handlebars.compile(source);
    var context = { message: message };
    var html = template(context);
    $('#film-container').append(html);
  };
  // FINE FUNZIONI
});
