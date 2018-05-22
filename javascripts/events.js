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

module.exports = {
  addLinkEvents,
  onLoadScreen,
};
