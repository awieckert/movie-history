const events = require('./events.js');

const initialize = () => {
  events.addLinkEvents();
  events.onLoadScreen();
  events.pressEnter();
  events.saveMovieToWishListEvent();
  events.deleteMovieFromFirebase();
  events.updateMovieToWatchedEvent();
};

module.exports = {
  initialize,
};
