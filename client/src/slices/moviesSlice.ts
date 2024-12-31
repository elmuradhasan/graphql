import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  title: string;
  poster: string;
  rating: string;
  liked: boolean;
}

interface MoviesState {
  movies: Movie[];
  likedMovies: Movie[];
}

const loadLikedMoviesFromLocalStorage = (): Movie[] => {
  const savedLikedMovies = localStorage.getItem('likedMovies');
  return savedLikedMovies ? JSON.parse(savedLikedMovies) : [];
};

const saveLikedMoviesToLocalStorage = (likedMovies: Movie[]) => {
  localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
};

const initialState: MoviesState = {
  movies: [],
  likedMovies: loadLikedMoviesFromLocalStorage(),
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload.map((movie) => ({
        ...movie,
        liked: state.likedMovies.some((likedMovie) => likedMovie.title === movie.title),
      }));
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const movie = state.movies.find((m) => m.title === action.payload);
      if (movie) {
        movie.liked = !movie.liked;

        // Update likedMovies array
        if (movie.liked) {
          state.likedMovies.push(movie);
        } else {
          state.likedMovies = state.likedMovies.filter((m) => m.title !== movie.title);
        }

        // Save updated likedMovies to localStorage
        saveLikedMoviesToLocalStorage(state.likedMovies);
      }
    },
  },
});

export const { setMovies, toggleLike } = moviesSlice.actions;

export default moviesSlice.reducer;
