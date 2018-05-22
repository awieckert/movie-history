const events = require('./events.js');

const initialize = () => {
  events.addLinkEvents();
  events.onLoadScreen();
};

module.exports = {
  initialize,
};
