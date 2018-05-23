const tmdb = require('./tmdb.js');

const addLinkEvents = () => {
  addAuthenticateEvent();
  addSearchEvent();
  addMyMoviesEvent();
};

const addAuthenticateEvent = () => {
  $('#authentication').on('click', showAuthScreen);
};

const showAuthScreen = () => {
  $('#myMovies').hide();
  $('#search-bar').hide();
  $('#authScreen').show();
};

const addSearchEvent = () => {
  $('#search').on('click', showSearchBar);
};

const showSearchBar = () => {
  $('#myMovies').hide();
  $('#search-bar').show();
  $('#authScreen').hide();
};

const addMyMoviesEvent = () => {
  $('#my-movies').on('click', showMyMovies);
};

const showMyMovies = () => {
  $('#myMovies').show();
  $('#search-bar').hide();
  $('#authScreen').hide();
};

const onLoadScreen = () => {
  $('#myMovies').hide();
  $('#search-bar').show();
  $('#authScreen').hide();
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      let movieToSearch = $('input').val();
      movieToSearch = movieToSearch.replace(' ', '%20');
      tmdb.showResults(movieToSearch);
    }
  });
};

module.exports = {
  addLinkEvents,
  onLoadScreen,
  pressEnter,
};
