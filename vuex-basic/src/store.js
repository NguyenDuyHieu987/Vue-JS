import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      count: 0,
      listMovie: [],
      detailMovie: null,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setPageMovie(state, dataMovie) {
      state.listMovie = dataMovie;
    },
    setMovieDetail(state, dataMovie) {
      state.detailMovie = dataMovie;
    },
  },
  getters: {
    getMovieByYear: (state) => (inputVal) => {
      return state.listMovie.filter(
        (mov) => mov.release_date.slice(0, 4) == inputVal
      );
    },
  },
  actions: {
    async getMovie({ commit }, { page }) {
      const dataMovie = await axios
        .get(
          `https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=${page}`
        )
        .then((movieResponse) => movieResponse.data.results);

      commit('setPageMovie', dataMovie);
    },

    async getDetailMovie({ commit }, { id }) {
      const dataMovie = await axios
        .get(`https://the-movie-node.onrender.com/movie/${id}?api=hieu987`)
        .then((movieResponse) => movieResponse.data);

      commit('setMovieDetail', dataMovie);
    },
  },
});

export default store;
