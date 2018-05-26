/* eslint camelcase: 0 */
const dom = require('./dom.js');

let tmdbKey = '';
let imageConfig = {};

const setKey = (key) => {
  tmdbKey = key;
  getConfig();
};

const getKey = () => {
  return tmdbKey;
};

const getConfig = () => {
  tmdbConfiguration().then((result) => {
    imageConfig = result.images;
  }).catch((err) => {
    console.error('Error with tmdb config: ', err);
  });
};

const tmdbConfiguration = () => {
  return new Promise ((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`).done((data) => {
      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });
};

const searchTMDB = (txt) => {
  return new Promise ((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&page=1&query=${txt}&page=1&include_adult=false`).done((result) => {
      resolve(result);
    }).fail((err) => {
      reject(err);
    });
  });
};

const showResults = (searchText) => {
  searchTMDB(searchText).then((result) => {
    dom.domString(result.results, imageConfig);
  }).catch((err) => {
    console.error('POOP!: ', err);
  });
};

module.exports = {
  showResults,
  setKey,
  getKey,
};
