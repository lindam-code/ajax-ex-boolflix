$(document).ready(function(){
  // API key: 4c34d07e5d578ee7bace09dde277dacb
  // API eg: https://api.themoviedb.org/3/movie/550?api_key=4c34d07e5d578ee7bace09dde277dacb
  // Inizio chiamata Ajax per vedere film
  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
        api_key: '4c34d07e5d578ee7bace09dde277dacb',
        language: 'it-IT',
        query: 'interrotte'
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

});
