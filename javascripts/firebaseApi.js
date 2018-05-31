let fireBaseConfig = {};

const setFireBaseConfig = (fbConfig) => {
  fireBaseConfig = fbConfig;
};

const saveMovieToWishList = (newMovie) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${fireBaseConfig.databaseURL}/movies.json`,
      data: JSON.stringify(newMovie),
    }).done((uniqueKey) => {
      resolve(uniqueKey);
    }).fail((err) => {
      reject(err);
    });
  });
};

const getAllMovies = () => {
  return new Promise ((resolve, reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${fireBaseConfig.databaseURL}/movies.json`,
    }).done((allMoviesObject) => {
      if (allMoviesObject !== null) {
        Object.keys(allMoviesObject).forEach((fbKey) => {
          allMoviesObject[fbKey].id = fbKey;
          allMoviesArray.push(allMoviesObject[fbKey]);
        });
      }
      resolve(allMoviesArray);
    }).fail((err) => {
      reject(err);
    });
  });
};

module.exports = {
  saveMovieToWishList,
  setFireBaseConfig,
  getAllMovies,
};
