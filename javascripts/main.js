const startApplication = require('./dataGate.js');
const apiKeys = require('./apiKeys.js');

startApplication.initialize();
apiKeys.retrieveKeys();
