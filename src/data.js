import axios from 'axios';

let movies = [];
const YIFY_URL = 'https://yts.mx/api/v2/';
const client = axios.create({
  baseURL: YIFY_URL,
});

const startDB = async () => {
  try {
    console.log('⏳  Starting Movie DB');
    ({
      data: {
        data: { movies },
      },
    } = await client.get('/list_movies.json', { params: { limit: 50 } }));
    console.log('✅  Movie DB Ready!');
  } catch (e) {
    console.log(e.message);
    console.log("❌ Can't initialize DB, contact Nico");
  }
};
startDB();

// This gives you an array of all the movies
export const getMovies = () => movies;

// This gives you one movie, don't forget to pass the ID
export const getMovieById = (id) => {
  if (!id) {
    throw Error('❌  YOU FORGOT TO PASS THE MOVIE ID TO THE FUNCTION  ❌ ');
  }
  return movies.find((m) => m.id === parseInt(id, 10));
};

// This gives you an array of movies with a release date of minimum X
export const getMovieByMinimumYear = (year) => {
  if (!year) {
    throw Error('❌  YOU FORGOT TO PASS THE MOVIE YEAR TO THE FUNCTION  ❌');
  }
  return movies.filter((m) => m.year >= year);
};

// This gives you an array of movies with a rating of minimum X
export const getMovieByMinimumRating = (rating) => {
  if (!rating) {
    throw Error('❌  YOU FORGOT TO PASS THE MOVIE RATING TO THE FUNCTION  ❌');
  }
  return movies.filter((m) => m.rating >= rating);
};

/*
This adds a movie to the DB.
Only ONE required argument, it should be an object containing
  title: string;
  synopsis: string;
  genres: Array of strings;
*/
export const addMovie = ({ title, synopsis, genres }) => {
  if (typeof title !== 'string' || typeof synopsis !== 'string') {
    throw Error('❌  title and synopsis should be strings  ❌');
  }
  if (!genres instanceof Array) {
    throw Error('❌  genres should be an array  ❌');
  }
  const id = Math.floor(Math.random() * (title.length + Date.now()));
  movies = [{ id, title, synopsis, genres }, ...movies];
};
