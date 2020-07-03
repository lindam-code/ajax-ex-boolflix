$(document).ready(function(){
  // API key: 4c34d07e5d578ee7bace09dde277dacb
  // API eg: https://api.themoviedb.org/3/movie/550?api_key=4c34d07e5d578ee7bace09dde277dacb

  // Associo un evento click al bottone invia, salvo il valore della input
  // e la passo ad una funzione che fa chiamata API
  $('#search-submit').click(function(){
    var userSearch = $('#search-movie').val();
    getMovies(userSearch);
    getTvSeries(userSearch);
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
            var message = 'Mi dispiace: la parola scritta non produce risultati per i film.';
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

  // Funzione che fa la chiamata Aajax per le serie Tv
  // Accetta: queryUser, stringa del titolo (o una parte) della serie da cercare
  // Return: stampa a schermo le info delle serie Tv
  function getTvSeries(queryUser){
    reset();
    // Inizio chiamata Ajax
    var url = 'https://api.themoviedb.org/3/search/tv';
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
          var arrayTvMovies = dataResponse.results;
          if (arrayTvMovies.length > 0) {
            printMovies(arrayTvMovies);
          } else {
            var message = 'Mi dispiace: la parola scritta non produce risultati per le serie tv.';
            printError(message);
          };
        },
        error: function(){
          var message = 'Errore: non hai scritto un titolo da cercare.';
          printError(message);
        }
      }
    );
  };

  // Funzione per stampare a schermo le info dei film o serie Tv usando Handelbars
  // Accetta: array, un array con le informazioni dei film o delle serie Tv
  // Return: niente stampa a schermo le info di interesse
  function printMovies(arrayMovies) {
    // Preparo template di Handelbars
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < arrayMovies.length; i++) {
      var singleMovie = arrayMovies[i];
      var title = singleMovie.title;
      if (title == undefined) {
        title = singleMovie.name;
      };
      var coverSize = '/w154';
      var cover = '<img src="https://image.tmdb.org/t/p'+ coverSize + singleMovie.poster_path +'" alt="cover movie">';
      var originalTitle = singleMovie.original_title;
      if (originalTitle == undefined) {
        originalTitle = singleMovie.original_name;
      };
      var lenguage = singleMovie.original_language;
      var flag = getFlag(lenguage);
      var vote = singleMovie.vote_average;
      var voteStar = getStar(vote);

      var context = {
        title: title,
        cover: cover,
        originalTitle: originalTitle,
        lenguage: flag,
        vote: voteStar
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

  // Funzione che trasforma un voto decimale in un voto a 5 stelline
  // Accetta: vote, un voto decimale
  // Return: voteStar, una stringa con le stelline di font awesome
  function getStar(vote) {
    var voteStandardized = Math.ceil(vote/2);
    var voteStar = '';
    for (var i = 1; i <= 5; i++) {
      if (i <= voteStandardized) {
        voteStar += '<i class="fas fa-star"></i>';
      } else {
        voteStar += '<i class="far fa-star"></i>';
      };
    };
    return voteStar;
  };

  // Funzione che associa la bandiera alla lingua originale
  // Se non presente nella lista delle bandiere scrive la lingua
  // Accetta: lenguage, stringa con la sigla della lingua
  // Return: flag, una srtinga con un immagina della bandiera
  function getFlag(lenguage){
    var arrayFlag = ["de","en","es","fr","it","ja","pt"];
    var flag = '';
    if (arrayFlag.includes(lenguage)) {
      flag = '<img src="img/' + lenguage + '.png" alt="flag" class="flag">'
    } else {
      flag = lenguage;
    }
    return flag;
  };
  // FINE FUNZIONI
});
