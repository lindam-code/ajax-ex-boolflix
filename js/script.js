$(document).ready(function(){
  // API key: 4c34d07e5d578ee7bace09dde277dacb
  // API eg: https://api.themoviedb.org/3/movie/550?api_key=4c34d07e5d578ee7bace09dde277dacb

  // Associo un evento click al bottone invia, salvo il valore della input
  // e la passo ad una funzione che fa chiamata API
  $('#search-submit').click(function(){
    var userSearch = $('#search-movie').val();
    getMovies(userSearch);
  });

  // FUNZIONI
  // Funzione che fa la chiamata Aajax per i film
  // Accetta: queryUser, stringa del titolo (o una parte) del film  da cercare
  // Return: stampa a schermo le info dei film
  function getMovies(queryUser) {
    reset();
    // Inizio chiamata Ajax
    var url = 'https://api.themoviedb.org/3/search/movie';
    var apiKey = '4c34d07e5d578ee7bace09dde277dacb';
    $.ajax(
      {
        url: url,
        method: 'GET',
        data: {
          api_key: apiKey,
          language: 'it-IT',
          query: queryUser
        },
        success: function(dataResponse){
          var arrayMovies = dataResponse.results;
          if (arrayMovies.length > 0) {
            printMovies(arrayMovies);
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
  // Accetta: array, un array con le informazioni dei film
  // Return: niente stampa a schermo le info di interesse
  function printMovies(arrayMovies) {
    // Preparo template di Handelbars
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    // Ciclo per vedere le info di ogni singolo film
    for (var i = 0; i < arrayMovies.length; i++) {
      var singleMovie = arrayMovies[i];
      var title = singleMovie.title;
      var originalTitle = singleMovie.original_title;
      var lenguage = singleMovie.original_language;
      var vote = singleMovie.vote_average;
      var context = {
        title: title,
        originalTitle: originalTitle,
        lenguage: lenguage,
        vote: vote
      };
      var html = template(context);
      $('#movie-container').append(html);
    }
  };

  // Funzione che svuota nella pagina il contenitore dei film
  function reset(){
    $('#movie-container').text('');
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
    $('#movie-container').append(html);
  };
  // FINE FUNZIONI
});
