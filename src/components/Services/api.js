const getPopularMovies = async () => {
  const URL =
    'https://api.themoviedb.org/3/trending/all/day?api_key=96d3e64b658c1ff1e4d321bedcaf7556';
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getDetailMovie = async id => {
  const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=96d3e64b658c1ff1e4d321bedcaf7556&language=en`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getMoviesCast = async id => {
  const URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=96d3e64b658c1ff1e4d321bedcaf7556`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getMoviesReviews = async id => {
  const URL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=96d3e64b658c1ff1e4d321bedcaf7556&language=en-US&page=1`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const searchMovies = async query => {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=96d3e64b658c1ff1e4d321bedcaf7556&language=en-US&query=${query}&page=1&include_adult=false`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default {
  getPopularMovies,
  getDetailMovie,
  getMoviesCast,
  getMoviesReviews,
  searchMovies,
};
