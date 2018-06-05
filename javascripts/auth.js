const {showMyMovies, onLoadScreen,} = require('./events.js');

const checkLoginState = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      showMyMovies();
      $('#my-movies, #search, #logout').removeClass('hide');
      $('#authentication').addClass('hide');
    } else {
      onLoadScreen();
      $('#logout, #search, #my-movies').addClass('hide');
      $('#authentication').removeClass('hide');
    }
  });
};

module.exports = {
  checkLoginState,
};
