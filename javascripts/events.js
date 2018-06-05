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
  $('#search-bar').hide();
  $('#authScreen').show();
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter' && !$('#search-input').val() === '') {
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
    dom.domString(moviesArray, tmdb.getImageConfig(), '#myMovies-list', true);
  }).catch((err) => {
    console.error('All the movies didnt come back: ', err);
  });
};

const getWatchedMoviesEvent = () => {
  fireBaseApi.getWatchedMovies().then((moviesArray) => {
    dom.domString(moviesArray, tmdb.getImageConfig(), '#myMovies-list', true);
  }).catch((err) => {
    console.error('Watched movies didnt come back: ', err);
  });
};

const getWishlistMoviesEvent = () => {
  fireBaseApi.getWishlistMovies().then((moviesArray) => {
    dom.domString(moviesArray, tmdb.getImageConfig(), '#myMovies-list', true);
  }).catch((err) => {
    console.error('Watched movies didnt come back: ', err);
  });
};

const deleteMovieFromFirebase = () => {
  $(document).on('click', '.deleteMovieFromCollectionEvent', (e) => {
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    fireBaseApi.deleteMovieFromDb(movieToDeleteId).then(() => {
      getAllMoviesEvent();
    }).catch((err) => {
      console.error('Delete Function did not work: ', err);
    });
  });
};

const updateMovieToWatchedEvent = () => {
  $(document).on('click', '.updateMovieToWatched', (e) => {
    const targetMovie = $(e.target).closest('.movie');
    const targetMovieID = targetMovie.data('firebaseId');

    const modifiedMovie = {
      title: targetMovie.find('.movie-title').text(),
      overview: targetMovie.find('.movie-overview').text(),
      poster_path: targetMovie.find('img').data('poster'),
      rating: 0,
      isWatched: true,
    };

    fireBaseApi.updateMovieToWatched(modifiedMovie, targetMovieID).then(() => {
      getAllMoviesEvent();
    }).catch((err) => {
      console.error('Updating to watched failed: ', err);
    });
  });
};

const filterEvents = () => {
  $('#filterButtons').on('click', (e) => {
    const classList = e.target.classList;
    if (classList.contains('wishlist')) {
      getWishlistMoviesEvent();
    } else if (classList.contains('watched')) {
      getWatchedMoviesEvent();
    } else {
      getAllMoviesEvent();
    }
  });
};

const authEvents = () => {
  $('#sign-in-button').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const passWord = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, passWord).catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
  });

  $('#register-link').click((e) => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#sign-in').click((e) => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });

  $('#logout').click((e) => {
    firebase.auth().signOut().then(() => {
      onLoadScreen();
    }).catch((error) => {
      console.error(error);
    });

  });
};

module.exports = {
  addLinkEvents,
  onLoadScreen,
  pressEnter,
  saveMovieToWishListEvent,
  deleteMovieFromFirebase,
  updateMovieToWatchedEvent,
  filterEvents,
  authEvents,
  showMyMovies,
};
