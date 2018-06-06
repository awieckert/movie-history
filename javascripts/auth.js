const {showMyMovies, onLoadScreen,} = require('./events.js');
const {setUID,} = require('./firebaseApi.js');

const checkLoginState = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUID(user.uid);
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
