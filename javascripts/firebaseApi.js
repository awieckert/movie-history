let fireBaseConfig = {};
let uid = '';

const setFireBaseConfig = (fbConfig) => {
  fireBaseConfig = fbConfig;
};

const setUID = (newUID) => {
  uid = newUID;
};

const getUID = () => {
  return uid;
};

const saveMovieToWishList = (newMovie) => {
  newMovie.uid = uid;
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
      url: `${fireBaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
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

const deleteMovieFromDb = (movieID) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${fireBaseConfig.databaseURL}/movies/${movieID}.json`,
    }).done(() => {
      resolve();
    }).fail((err) => {
      reject(err);
    });
  });
};

const updateMovieToWatched = (modifiedMovie, movieId) => {
  modifiedMovie.uid = uid;
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${fireBaseConfig.databaseURL}/movies/${movieId}.json`,
      data: JSON.stringify(modifiedMovie),
    }).done((data) => {
      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });
};

const getWatchedMovies = () => {
  return new Promise ((resolve, reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${fireBaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    }).done((allMoviesObject) => {
      if (allMoviesObject !== null) {
        Object.keys(allMoviesObject).forEach((fbKey) => {
          if (allMoviesObject[fbKey].isWatched) {
            allMoviesObject[fbKey].id = fbKey;
            allMoviesArray.push(allMoviesObject[fbKey]);
          }
        });
      }
      resolve(allMoviesArray);
    }).fail((err) => {
      reject(err);
    });
  });
};

const getWishlistMovies = () => {
  return new Promise ((resolve, reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${fireBaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    }).done((allMoviesObject) => {
      if (allMoviesObject !== null) {
        Object.keys(allMoviesObject).forEach((fbKey) => {
          if (!allMoviesObject[fbKey].isWatched) {
            allMoviesObject[fbKey].id = fbKey;
            allMoviesArray.push(allMoviesObject[fbKey]);
          }
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
  deleteMovieFromDb,
  updateMovieToWatched,
  getWatchedMovies,
  getWishlistMovies,
  setUID,
  getUID,
};
