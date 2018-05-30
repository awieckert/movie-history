/* eslint camelcase: 0 */
const tmdb = require('./tmdb.js');
const fireBaseApi = require('./firebaseApi.js');
const dom = require('./dom.js');

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
  getAllMoviesEvent();
  // call the getMoviesEvent
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

const saveMovieToWishListEvent = () => {
  $(document).on('click', '.addMovieToWishList', (e) => {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      title: movieToAddCard.find('.movie-title').text(),
      overview: movieToAddCard.find('.movie-overview').text(),
      poster_path: movieToAddCard.find('img').data('poster'),
      rating: 0,
      isWatched: false,
    };
    fireBaseApi.saveMovieToWishList(movieToAdd).then(() => {
      movieToAddCard.remove();
    }).catch((err) => {
      console.error('OMG ERROR in saving movie: ', err);
    });
  });
};

const getAllMoviesEvent = () => {
  fireBaseApi.getAllMovies().then((moviesArray) => {
    dom.domString(moviesArray, tmdb.getImageConfig(), '#myMovies-list');
  }).catch((err) => {
    console.error('All the movies didnt come back: ', err);
  });
};

module.exports = {
  addLinkEvents,
  onLoadScreen,
  pressEnter,
  saveMovieToWishListEvent,
};
