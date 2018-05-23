const events = require('./events.js');

const initialize = () => {
  events.addLinkEvents();
  events.onLoadScreen();
  events.pressEnter();
};

module.exports = {
  initialize,
};
