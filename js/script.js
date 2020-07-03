$(document).ready(function(){
  // API key: 4c34d07e5d578ee7bace09dde277dacb
  // API eg: https://api.themoviedb.org/3/movie/550?api_key=4c34d07e5d578ee7bace09dde277dacb

  // Associo un evento click al bottone invia, salvo il valore della input
  // e la passo ad una funzione che fa chiamata API
  $('#search-submit').click(function(){
    var userSearch = $('#search-movie').val();
    reset();
    getData(userSearch,'Movies');
    getData(userSearch,'TV');
  });

  // FUNZIONI
  // Funzione che fa la chiamata Aajax per i film e le serie TV
  // Accetta: queryUser, stringa del titolo (o una parte) del film o della serie da cercare
  // Accetta: type, tipo di dato da cercare ('Movies', 'TV')
  // Return: stampa a schermo le info dei film e delle serie TV
  function getData(queryUser,type) {
    // Inizio chiamata Ajax
    if (type === 'Movies') {
      var url = 'https://api.themoviedb.org/3/search/movie';
    } else {
      var url = 'https://api.themoviedb.org/3/search/tv';
    }

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
          var arrayData = dataResponse.results;
          if (arrayData.length > 0) {
            printData(arrayData,type);
          } else {
            if (type === 'Movies') {
              var message = 'Mi dispiace: la parola scritta non produce risultati per i film.';
            } else {
               var message = 'Mi dispiace: la parola scritta non produce risultati per le serie tv.';
            }
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

  // Funzione per stampare a schermo le info dei film o serie Tv usando Handelbars
  // Accetta: arrayMovies, un array con le informazioni dei film o delle serie Tv
  // Return: niente stampa a schermo le info di interesse
  function printData(arrayMovies,type) {
    // Preparo template di Handelbars
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < arrayMovies.length; i++) {
      var singleMovie = arrayMovies[i];
      if (type === 'Movies') {
        var title = singleMovie.title;
        var originalTitle = singleMovie.original_title;
      } else {
        var title = singleMovie.name;
        var originalTitle = singleMovie.original_name;
      }
      var coverSize = '/w154';
      var context = {
        title: title,
        cover: '<img src="https://image.tmdb.org/t/p'+ coverSize + singleMovie.poster_path +'" alt="cover movie">',
        originalTitle: originalTitle,
        lenguage: getFlag(singleMovie.original_language),
        vote: convertToStar(singleMovie.vote_average),
        type: type
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
  function convertToStar(vote) {
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
  // se presente nella lista delle bandiere, altrimenti scrive la sigla della lingua
  // Accetta: lenguage, stringa con la sigla della lingua
  // Return: flag, una srtinga con un immagine della bandiera o la sigla della lingua
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
