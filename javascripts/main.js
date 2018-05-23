const startApplication = require('./dataGate.js');
const apiKeys = require('./apiKeys.js');
// $('#myMovies').hide();
// $('#search-bar').show();
// $('#authScreen').hide();

startApplication.initialize();
apiKeys.retrieveKeys();
