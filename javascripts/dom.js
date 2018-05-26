
const domString = (movieArray, imageyStuff) => {
  let strang = '';
  movieArray.forEach((movie, i) => {
    if (i % 3 === 0) {
      strang += `<div class='row'>`;
    }
    strang += `<div class="col-sm-6 col-md-4">`;
    strang += `<div class="thumbnail">`;
    strang += `<img src="${imageyStuff.base_url}/w342/${movie.poster_path}" alt="Movie Poster">`;
    strang += `<div class="caption">`;
    strang +=    `<h3>${movie.original_title}</h3>`;
    strang +=    `<p>${movie.overview}</p>`;
    strang +=    `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Wish List</a></p>`;
    strang +=  `</div>`;
    strang += `</div>`;
    strang += `</div>`;
    if (i % 3 === 2) {
      strang += `</div>`;
    }
  });

  printToDom(strang, '#movies');
};

const printToDom = (strang, divID) => {
  $(divID).html(strang);
};

module.exports = {
  domString,
};
