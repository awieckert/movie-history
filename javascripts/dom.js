
const domString = (movieArray, imageyStuff, whereToPrint) => {
  let strang = '';
  movieArray.forEach((movie, i) => {
    if (i % 3 === 0) {
      strang += `<div class='row'>`;
    }
    strang += `<div class="col-sm-6 col-md-4">`;
    strang += `<div class="thumbnail movie">`;
    strang += `<img data-poster='${movie.poster_path}' src="${imageyStuff.base_url}/w342/${movie.poster_path}" alt="Movie Poster">`;
    strang += `<div class="caption">`;
    strang +=    `<h3 class='movie-title'>${movie.original_title ? movie.original_title : movie.title}</h3>`;
    strang +=    `<p class='movie-overview'>${movie.overview}</p>`;
    strang +=    `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a class="btn btn-default addMovieToWishList" role="button">Wish List</a></p>`;
    strang +=  `</div>`;
    strang += `</div>`;
    strang += `</div>`;
    if (i % 3 === 2) {
      strang += `</div>`;
    }
  });

  printToDom(strang, whereToPrint);
};

const printToDom = (strang, divID) => {
  $(divID).html(strang);
};

module.exports = {
  domString,
};
