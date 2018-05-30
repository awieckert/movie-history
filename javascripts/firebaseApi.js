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

module.exports = {
  saveMovieToWishList,
  setFireBaseConfig,
};
