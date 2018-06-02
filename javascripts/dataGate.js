const events = require('./events.js');

const initialize = () => {
  events.addLinkEvents();
  events.onLoadScreen();
  events.pressEnter();
  events.saveMovieToWishListEvent();
  events.deleteMovieFromFirebase();
  events.updateMovieToWatchedEvent();
  events.filterEvents();
};

module.exports = {
  initialize,
};
